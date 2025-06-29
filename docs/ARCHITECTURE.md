# アーキテクチャドキュメント

## 概要

o3-search-mcpは、MCP（Model Context Protocol）を使用してClaude DesktopとClaude Codeに検索機能を追加するサーバーです。

## システム構成

```
Claude Desktop/Code
        ↓
   MCP Protocol
        ↓
  o3-search-mcp
        ↓
   AI Provider
   /         \
OpenAI o3   Google Gemini
```

## コンポーネント

### 1. MCPサーバー（index.ts）

- **McpServer**: MCPプロトコルの実装
- **StdioServerTransport**: 標準入出力を使用した通信
- **ai-search tool**: 検索機能を提供するツール

### 2. AI Provider抽象化

```typescript
// 環境変数で切り替え
const AI_PROVIDER = process.env.AI_PROVIDER || 'openai';

// プロバイダー固有の処理
if (AI_PROVIDER === 'openai') {
  // OpenAI o3の処理
} else if (AI_PROVIDER === 'gemini') {
  // Google Geminiの処理
}
```

### 3. 環境変数管理

dotenvを使用して3つの方法で環境変数を管理：

1. **.envファイル**: プロジェクトルートの.envから自動読み込み
2. **コマンドライン**: `-e`オプションで直接指定
3. **システム環境変数**: OS環境変数から読み込み

### 4. 検索フロー

1. ユーザーがClaudeに質問
2. Claudeが検索が必要と判断
3. `ai-search`ツールを呼び出し
4. 選択されたAIプロバイダーが検索を実行
5. 結果をClaudeに返却
6. Claudeが結果を整形してユーザーに回答

## セキュリティ考慮事項

- APIキーは環境変数で管理
- .envファイルは.gitignoreに含める
- プロジェクトスコープではAPIキーを直接書かない
- MCPサーバーは信頼できるものだけを使用

## 拡張性

新しいAIプロバイダーを追加する場合：

1. 環境変数を追加（例：`ANTHROPIC_API_KEY`）
2. プロバイダー初期化関数を追加
3. ハンドラー関数を実装
4. `AI_PROVIDER`の条件分岐に追加