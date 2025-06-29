# API リファレンス

## MCPツール

### ai-search

Web検索を実行するMCPツールです。

#### パラメータ

| 名前 | 型 | 必須 | 説明 |
|------|-----|------|------|
| input | string | ✅ | 検索クエリまたは質問 |

#### 使用例

```json
{
  "tool": "ai-search",
  "arguments": {
    "input": "最新のTypeScriptバージョンとその新機能"
  }
}
```

#### レスポンス

```json
{
  "content": [{
    "type": "text",
    "text": "TypeScript 5.4が最新バージョンです。主な新機能には..."
  }]
}
```

## 環境変数

### 必須設定

#### AI_PROVIDER
- **型**: `string`
- **値**: `openai` | `gemini`
- **デフォルト**: `openai`
- **説明**: 使用するAIプロバイダー

#### OPENAI_API_KEY
- **型**: `string`
- **必須条件**: `AI_PROVIDER=openai`の場合
- **説明**: OpenAI APIキー

#### GEMINI_API_KEY
- **型**: `string`
- **必須条件**: `AI_PROVIDER=gemini`の場合
- **説明**: Google Gemini APIキー

### オプション設定（OpenAIのみ）

#### SEARCH_CONTEXT_SIZE
- **型**: `string`
- **値**: `low` | `medium` | `high`
- **デフォルト**: `medium`
- **説明**: 検索コンテキストのサイズ
  - `low`: 基本的な検索
  - `medium`: 標準的な検索
  - `high`: 詳細な検索

#### REASONING_EFFORT
- **型**: `string`
- **値**: `low` | `medium` | `high`
- **デフォルト**: `medium`
- **説明**: AIの推論の深さ
  - `low`: 高速だが簡潔
  - `medium`: バランス重視
  - `high`: 時間をかけて詳細に

## エラーハンドリング

### エラーレスポンス

```json
{
  "content": [{
    "type": "text",
    "text": "Error: エラーメッセージ"
  }]
}
```

### 一般的なエラー

1. **API key not found**
   - 原因: 必要なAPIキーが設定されていない
   - 解決: 環境変数を確認

2. **AI client is not initialized**
   - 原因: AIプロバイダーの初期化に失敗
   - 解決: AI_PROVIDERとAPIキーの組み合わせを確認

3. **No response text available**
   - 原因: AIからの応答が空
   - 解決: クエリを変更して再試行