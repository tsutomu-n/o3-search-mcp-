# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server that provides web search capabilities using AI models (OpenAI's o3 or Google's Gemini). The server exposes an `ai-search` tool that accepts text queries and returns AI-powered search results. Works with both Claude Desktop and Claude Code.

## Key Commands

- **Build**: `pnpm build` - Compiles TypeScript to JavaScript in the `build/` directory and makes the output executable
- **Type check**: `npx tsc --noEmit` - Runs TypeScript type checking without emitting files
- **Install dependencies**: `pnpm install` - Uses pnpm as package manager (v10.10.0)
- **Prepare for publish**: `pnpm prepublishOnly` - Runs build before publishing to npm

## Architecture

The project is a single-file TypeScript application (`index.ts`) that:
1. Creates an MCP server using `@modelcontextprotocol/sdk`
2. Initializes AI clients based on environment variables (`AI_PROVIDER`)
3. Exposes an `ai-search` tool that routes requests to either OpenAI o3 or Google Gemini
4. Uses stdio transport for communication with MCP clients

Key dependencies:
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `openai` - OpenAI API client for o3 model
- `@google/genai` - Google Generative AI client for Gemini
- `zod` - Schema validation for tool inputs

## Configuration

The server is configured via environment variables. These can be set in three ways:
1. Using a `.env` file in the project root (automatically loaded via dotenv)
2. Passing them via the `-e` flag when using `claude mcp add`
3. Setting them as system environment variables

Environment variables:
- `AI_PROVIDER`: 'openai' or 'gemini' (default: 'openai')
- `OPENAI_API_KEY`: Required when using OpenAI provider
- `GEMINI_API_KEY`: Required when using Gemini provider
- `SEARCH_CONTEXT_SIZE`: 'low', 'medium', or 'high' (default: 'medium') - OpenAI only
- `REASONING_EFFORT`: 'low', 'medium', or 'high' (default: 'medium') - OpenAI only

## Development Notes

- TypeScript targets ES2022 with NodeNext module resolution
- The build output is an executable Node.js script with shebang (`#!/usr/bin/env node`)
- The project is published to npm as `o3-search-mcp` and can be run via npx
- No test framework or linting is currently configured in the project