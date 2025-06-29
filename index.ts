#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// --- Configuration ---
const AI_PROVIDER = process.env.AI_PROVIDER || 'openai';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SEARCH_CONTEXT_SIZE = (process.env.SEARCH_CONTEXT_SIZE || 'medium') as 'low' | 'medium' | 'high';
const REASONING_EFFORT = (process.env.REASONING_EFFORT || 'medium') as 'low' | 'medium' | 'high';

// --- Server Initialization ---
const server = new McpServer({
  name: `search-mcp-using-${AI_PROVIDER}`,
  version: "0.2.0",
});

// --- AI Client Factory ---
function initializeAiClient() {
  if (AI_PROVIDER === 'openai') {
    if (!OPENAI_API_KEY) {
      throw new Error("AI_PROVIDER is 'openai', but OPENAI_API_KEY is not set.");
    }
    return { openai: new OpenAI({ apiKey: OPENAI_API_KEY }), gemini: undefined };
  }
  if (AI_PROVIDER === 'gemini') {
    if (!GEMINI_API_KEY) {
      throw new Error("AI_PROVIDER is 'gemini', but GEMINI_API_KEY is not set.");
    }
    return { openai: undefined, gemini: new GoogleGenAI({ apiKey: GEMINI_API_KEY }) };
  }
  throw new Error(`Unsupported AI_PROVIDER: ${AI_PROVIDER}. Use 'openai' or 'gemini'.`);
}

const { openai, gemini: genAI } = initializeAiClient();

// --- Tool Handlers ---
const handleOpenAISearch = async (input: string) => {
  if (!openai) throw new Error("OpenAI client is not initialized.");
  const response = await openai.responses.create({
    model: 'o3',
    input,
    tools: [{ type: 'web_search_preview', search_context_size: SEARCH_CONTEXT_SIZE }],
    tool_choice: 'auto',
    parallel_tool_calls: true,
    reasoning: { effort: REASONING_EFFORT },
  });
  return response.output_text || "No response text available.";
};

const handleGeminiSearch = async (input: string) => {
  if (!genAI) throw new Error("Gemini client is not initialized.");
  
  const result = await genAI.models.generateContent({
    model: "gemini-1.5-pro-latest",
    contents: input,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  
  const candidate = result.candidates?.[0];
  if (!candidate) return "No search results found.";

  let text = result.text || "No response text available.";
  const metadata = candidate.citationMetadata;

  if (metadata && 'sources' in metadata) {
    const sources = (metadata as any).sources
      ?.map((source: any, index: number) => source.uri ? `[${index + 1}] ${source.uri}` : null)
      .filter((s: string | null): s is string => s !== null)
      .join('\n');
    
    if (sources) {
      text += `\n\nSources:\n${sources}`;
    }
  }
  return text;
};

// --- MCP Tool Definition ---
const toolDescription = AI_PROVIDER === 'openai'
  ? `An AI agent with advanced web search capabilities (using OpenAI o3).`
  : `An AI agent that uses Google Search via Gemini's grounding feature to provide synthesized answers with citations (using Gemini 1.5 Pro).`;

server.tool(
  "ai-search",
  toolDescription,
  { input: z.string().describe('Ask questions, search for information, or consult about complex problems.') },
  // ★★★ 型定義を修正 ★★★
  async ({ input }: { input: string }) => {
    try {
      const responseText = AI_PROVIDER === 'openai'
        ? await handleOpenAISearch(input)
        : await handleGeminiSearch(input);

      return { content: [{ type: "text" as const, text: responseText }] };
    } catch (error) {
      console.error(`Error calling ${AI_PROVIDER} API:`, error);
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      return { content: [{ type: "text", text: `Error: ${message}` }] };
    }
  }
);

// --- Server Start ---
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log(`MCP Server for ${AI_PROVIDER} running on stdio`);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});