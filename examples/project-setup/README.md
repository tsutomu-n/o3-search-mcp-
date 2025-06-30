# プロジェクト単位のセットアップ例

このディレクトリは、プロジェクト単位でo3-search-mcpを使用する際の設定例です。

## ファイル構成

- `.mcp.json` - MCPサーバーの設定ファイル
- `.env.example` - 環境変数のサンプルファイル
- `README.md` - このファイル

## 使い方

### 1. 設定ファイルをプロジェクトにコピー

```bash
# あなたのプロジェクトディレクトリで実行
cp /path/to/o3-search-mcp/examples/project-setup/.mcp.json .
cp /path/to/o3-search-mcp/examples/project-setup/.env.example .env
```

### 2. .envファイルを編集

```bash
# .envファイルを開いて、APIキーを設定
vim .env
# または
code .env
```

### 3. Claude Codeで使用

プロジェクトをClaude Codeで開くと、自動的に`.mcp.json`の設定が読み込まれます。

## カスタマイズ例

### OpenAI専用の設定

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "AI_PROVIDER": "openai",
        "OPENAI_API_KEY": "${OPENAI_API_KEY}",
        "SEARCH_CONTEXT_SIZE": "high",
        "REASONING_EFFORT": "high"
      }
    }
  }
}
```

### Gemini専用の設定

```json
{
  "mcpServers": {
    "gemini-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "AI_PROVIDER": "gemini",
        "GEMINI_API_KEY": "${GEMINI_API_KEY}"
      }
    }
  }
}
```

### 複数のMCPサーバーを使用

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "AI_PROVIDER": "openai",
        "OPENAI_API_KEY": "${OPENAI_API_KEY}"
      }
    },
    "gemini-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "AI_PROVIDER": "gemini",
        "GEMINI_API_KEY": "${GEMINI_API_KEY}"
      }
    }
  }
}
```