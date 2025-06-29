# o3-search-mcp

An MCP (Model Context Protocol) server that provides web search capabilities using AI models. Supports both OpenAI's o3 model and Google's Gemini with grounding. The `ai-search` tool accepts text queries and returns AI-powered search results.

## Installation

### Using npx (Recommended)

Claude Code (OpenAI o3):

```
$ claude mcp add o3 -s user \
	-e AI_PROVIDER=openai \
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=medium \
	-e REASONING_EFFORT=medium \
	-- npx o3-search-mcp
```

Claude Code (Google Gemini):

```
$ claude mcp add gemini-search -s user \
	-e AI_PROVIDER=gemini \
	-e GEMINI_API_KEY=your-api-key \
	-- npx o3-search-mcp
```

json (OpenAI o3):

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "AI_PROVIDER": "openai",
        "OPENAI_API_KEY": "your-api-key",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

json (Google Gemini):

```json
{
  "mcpServers": {
    "gemini-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "AI_PROVIDER": "gemini",
        "GEMINI_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Local Development Setup

If you want to download and run the code locally:

   ```bash
   # setup
   git clone git@github.com:yoshiko-pg/o3-search-mcp.git
   cd o3-search-mcp
   pnpm install
   pnpm build
   ```

Claude Code (OpenAI o3):

```
$ claude mcp add o3 -s user \
	-e AI_PROVIDER=openai \
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=medium \
	-e REASONING_EFFORT=medium \
	-- node /path/to/o3-search-mcp/build/index.js
```

Claude Code (Google Gemini):

```
$ claude mcp add gemini-search -s user \
	-e AI_PROVIDER=gemini \
	-e GEMINI_API_KEY=your-api-key \
	-- node /path/to/o3-search-mcp/build/index.js
```

json (OpenAI o3):

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "node",
      "args": ["/path/to/o3-search-mcp/build/index.js"],
      "env": {
        "AI_PROVIDER": "openai",
        "OPENAI_API_KEY": "your-api-key",
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

json (Google Gemini):

```json
{
  "mcpServers": {
    "gemini-search": {
      "command": "node",
      "args": ["/path/to/o3-search-mcp/build/index.js"],
      "env": {
        "AI_PROVIDER": "gemini",
        "GEMINI_API_KEY": "your-api-key"
      }
    }
  }
}
```