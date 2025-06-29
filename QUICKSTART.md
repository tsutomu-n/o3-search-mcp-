# クイックスタートガイド

## 5分でClaude Desktop/Claude Codeに検索機能を追加する

### 前提条件
- Claude DesktopまたはClaude Codeのアカウント
- OpenAI APIキーまたはGoogle Gemini APIキーを持っている
- Node.js 20以降がインストール済み（Claude Codeの場合は不要）

## Claude Codeの場合（最速！）

### ステップ1: コマンド実行（30秒）

<details>
<summary>📝 方法A: 一行で実行（推奨）</summary>

```bash
claude mcp add o3-search -s user -e AI_PROVIDER=openai -e OPENAI_API_KEY=sk-xxxxxxxxxxxxx -- npx o3-search-mcp
```
</details>

<details>
<summary>📄 方法B: 複数行で実行</summary>

```bash
claude mcp add o3-search -s user \
  -e AI_PROVIDER=openai \
  -e OPENAI_API_KEY=sk-xxxxxxxxxxxxx \
  -- npx o3-search-mcp
```
</details>

### ステップ2: 完了！

タブをリロード（F5）して、検索機能が使えるようになります。

## Claude Desktopの場合

### ステップ1: プロジェクトのセットアップ（2分）

```bash
# リポジトリをクローン
git clone https://github.com/yoshiko-pg/o3-search-mcp.git
cd o3-search-mcp

# 依存関係をインストールしてビルド
pnpm install
pnpm build

# ビルドが成功したか確認
ls build/index.js  # このファイルが存在すればOK
```

### ステップ2: Claude Desktopの設定（2分）

方法1: コマンドで追加

<details>
<summary>📝 一行で実行</summary>

```bash
claude mcp add o3-search -s user -e AI_PROVIDER=openai -e OPENAI_API_KEY=sk-xxxxxxxxxxxxx -- node /path/to/o3-search-mcp/build/index.js
```
</details>

<details>
<summary>📄 複数行で実行</summary>

```bash
claude mcp add o3-search -s user \
  -e AI_PROVIDER=openai \
  -e OPENAI_API_KEY=sk-xxxxxxxxxxxxx \
  -- node /path/to/o3-search-mcp/build/index.js
```
</details>

方法2: 手動で設定
1. Claude Desktopを開く
2. 左下の設定アイコン（⚙️）をクリック
3. 「Developer」タブを選択
4. 「MCP Servers」の「Edit Config」をクリック
5. 以下の設定を追加：

```json
{
  "mcpServers": {
    "ai-search": {
      "command": "node",
      "args": ["/Users/あなたのユーザー名/o3-search-mcp/build/index.js"],
      "env": {
        "AI_PROVIDER": "openai",
        "OPENAI_API_KEY": "sk-xxxxxxxxxxxxx"
      }
    }
  }
}
```

### ステップ3: Claude Desktopを再起動（30秒）

設定を保存してClaude Desktopを完全に終了し、再度起動します。

### ステップ4: 動作確認（30秒）

Claudeに以下のように聞いてみてください：

```
「今日の東京の天気を検索して教えて」
```

Claudeが検索結果を返せば成功です！

## よくある質問

### Q: 検索が動作しない

A: 以下を確認してください：
- APIキーが正しく設定されているか
- Claude Desktopの場合：パスが正しいか（絶対パスで指定）、完全に再起動したか
- Claude Codeの場合：タブをリロードしたか

### Q: どちらのAIプロバイダーを使うべき？

A: 
- **OpenAI o3**: より高度な推論が必要な検索に適している
- **Google Gemini**: 引用付きの検索結果が欲しい場合に適している

### Q: Claude DesktopとClaude Codeのどちらがいい？

A:
- **Claude Code**: 最も簡単！ブラウザだけで完結、チーム共有も可能
- **Claude Desktop**: オフライン作業が多い、デスクトップアプリが好みの場合

### Q: エラーログはどこで見れる？

A: 
- **Claude Desktop**: 
  - macOS: `~/Library/Logs/Claude/`
  - Windows: `%APPDATA%\Claude\logs\`
  - Linux: `~/.config/Claude/logs/`
- **Claude Code**: ブラウザの開発者ツール（F12）のコンソール