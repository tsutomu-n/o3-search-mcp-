# o3-search-mcp

Claude DesktopとClaude Codeに「インターネット検索機能」を追加するMCPサーバーです。OpenAI o3モデルまたはGoogle Geminiを使用して、最新の情報を検索できるようになります。

## 🎯 このツールでできること

通常、ClaudeやClaude Codeは訓練データの期限（カットオフ）までの情報しか知りません。このツールを使うと：

- 📰 **最新ニュース**: 「今日の円相場は？」「最新のiPhoneの価格は？」
- 🌤️ **天気情報**: 「明日の東京の天気は？」「週末の天気予報を教えて」
- 💻 **技術情報**: 「React 19の新機能は？」「最新のPythonバージョンは？」
- 🔍 **詳しい調査**: 「電気自動車の最新動向をまとめて」

などの質問にClaudeが答えられるようになります！

## ✨ 特徴

- 🔍 **高精度な検索**: OpenAI o3モデルまたはGoogle Geminiが最適な検索結果を提供
- 📍 **信頼できる情報源**: Geminiなら検索結果の出典も表示
- 🚀 **簡単インストール**: 5分で設定完了
- 💬 **自然な会話**: 特別なコマンド不要、普通に話すだけ
- 🔐 **安全**: APIキーはローカルに保存、外部に送信されません

## 📚 初めての方へ

### MCP（Model Context Protocol）とは？
ClaudeやClaude Codeに新しい機能を追加できる仕組みです。プラグインやブラウザ拡張機能のようなものだと考えてください。

### 前提条件
1. **Claudeアプリケーションのどちらか**
   - **Claude Desktop** - [公式サイト](https://claude.ai/download)からダウンロード（デスクトップアプリ）
   - **Claude Code** - [claude.ai/code](https://claude.ai/code)（ブラウザ版開発環境）
2. **Node.js** - JavaScriptを実行するためのソフト
   - 🌟 **推奨**: [Volta](https://volta.sh/)を使ってインストール（Node.jsのバージョンを自動管理してくれる便利ツール）
   - または: [Node.js公式サイト](https://nodejs.org/)から「LTS版」を直接ダウンロード
3. **APIキー** - 検索エンジンを使うための「鍵」
   - OpenAIの場合: [OpenAI](https://platform.openai.com/api-keys)でアカウントを作成
   - Googleの場合: [Google AI Studio](https://aistudio.google.com/apikey)でアカウントを作成

#### Voltaとは？
Node.jsのバージョン管理ツールです。プロジェクトごとに適切なNode.jsバージョンを自動的に使い分けてくれるため、バージョンの不一致によるエラーを防げます。

## 🏃 クイックスタート（最速30秒）

### 実行方法を選択

<details>
<summary>🖥️ Claude Codeの場合</summary>

```bash
# 一行で実行（推奨）
claude mcp add o3-search -s user -e AI_PROVIDER=openai -e OPENAI_API_KEY=sk-xxxxxxxx -- npx o3-search-mcp

# ブラウザタブをリロード（F5）して完了！
```
</details>

<details>
<summary>💻 Claude Desktopの場合</summary>

```bash
# 一行で実行（推奨）
claude mcp add o3-search -s user -e AI_PROVIDER=openai -e OPENAI_API_KEY=sk-xxxxxxxx -- npx o3-search-mcp

# Claude Desktopを再起動して完了！
```
</details>

<details>
<summary>📄 複数行で実行したい場合</summary>

```bash
claude mcp add o3-search -s user \
  -e AI_PROVIDER=openai \
  -e OPENAI_API_KEY=sk-xxxxxxxx \
  -- npx o3-search-mcp
```
</details>

💡 **ヒント**: 
- `sk-xxxxxxxx`を実際のAPIキーに置き換えてください
- APIキーを.envファイルで管理したい場合は、下記の「.envファイルを使った環境変数管理」を参照してください

## 📝 詳細セットアップ

### ステップ1: 必要なソフトをインストール

#### 方法A: Voltaを使う場合（推奨 ✨）

1. **Voltaをインストール**
   ```bash
   # Mac/Linuxの場合
   curl https://get.volta.sh | bash
   
   # Windowsの場合は公式サイトからインストーラーをダウンロード
   # https://volta.sh/
   ```

2. **Node.jsをインストール**
   ```bash
   volta install node@22  # Node.js 22（LTS）をインストール
   ```

3. **pnpmをインストール**
   ```bash
   volta install pnpm
   ```

#### 方法B: 直接インストールする場合

1. **Node.jsのインストール確認**
   ```bash
   # ターミナル（Mac）またはコマンドプロンプト（Windows）で実行
   node --version
   ```
   バージョンが表示されればOK！表示されない場合は[Node.js](https://nodejs.org/)をインストール

2. **pnpmのインストール**（Node.jsの高速パッケージマネージャー）
   ```bash
   npm install -g pnpm
   ```

### ステップ2: APIキーを取得

#### 方法A: OpenAIを使う場合（おすすめ）
1. [OpenAI](https://platform.openai.com/api-keys)にアクセス
2. アカウントを作成（無料）
3. 「Create new secret key」をクリック
4. 表示された`sk-`で始まるキーをコピー（後で使います）

#### 方法B: Google Geminiを使う場合
1. [Google AI Studio](https://aistudio.google.com/apikey)にアクセス
2. Googleアカウントでログイン
3. 「Create API Key」をクリック
4. 表示されたキーをコピー（後で使います）

### ステップ3: MCPサーバーを追加

#### 実行方法を選んでください

<details>
<summary>📝 方法1: 複数行コマンド（推奨・見やすい）</summary>

```bash
# OpenAIを使う場合
claude mcp add o3-search -s user \
  -e AI_PROVIDER=openai \
  -e OPENAI_API_KEY=あなたのAPIキー \
  -- npx o3-search-mcp

# Google Geminiを使う場合
claude mcp add gemini-search -s user \
  -e AI_PROVIDER=gemini \
  -e GEMINI_API_KEY=あなたのAPIキー \
  -- npx o3-search-mcp
```
</details>

<details>
<summary>➡️ 方法2: 一行コマンド（コピペしやすい）</summary>

```bash
# OpenAIを使う場合
claude mcp add o3-search -s user -e AI_PROVIDER=openai -e OPENAI_API_KEY=あなたのAPIキー -- npx o3-search-mcp

# Google Geminiを使う場合
claude mcp add gemini-search -s user -e AI_PROVIDER=gemini -e GEMINI_API_KEY=あなたのAPIキー -- npx o3-search-mcp
```
</details>

<details>
<summary>🔧 方法3: 環境変数を先に設定</summary>

**Mac/Linuxの場合：**
```bash
# OpenAIの場合
export AI_PROVIDER=openai
export OPENAI_API_KEY=あなたのAPIキー
claude mcp add o3-search -s user -- npx o3-search-mcp

# Geminiの場合
export AI_PROVIDER=gemini
export GEMINI_API_KEY=あなたのAPIキー
claude mcp add gemini-search -s user -- npx o3-search-mcp
```

**Windowsコマンドプロンプトの場合：**
```cmd
REM OpenAIの場合
set AI_PROVIDER=openai
set OPENAI_API_KEY=あなたのAPIキー
claude mcp add o3-search -s user -- npx o3-search-mcp

REM Geminiの場合
set AI_PROVIDER=gemini
set GEMINI_API_KEY=あなたのAPIキー
claude mcp add gemini-search -s user -- npx o3-search-mcp
```

**Windows PowerShellの場合：**
```powershell
# OpenAIの場合
$env:AI_PROVIDER="openai"
$env:OPENAI_API_KEY="あなたのAPIキー"
claude mcp add o3-search -s user -- npx o3-search-mcp

# Geminiの場合
$env:AI_PROVIDER="gemini"
$env:GEMINI_API_KEY="あなたのAPIキー"
claude mcp add gemini-search -s user -- npx o3-search-mcp
```
</details>

<details>
<summary>🐛 方法4: デバッグ用（段階的実行）</summary>

問題が発生した場合は、一つずつ確認しながら実行：

```bash
# 1. claudeコマンドの確認
claude --version

# 2. npxの確認
npx --version

# 3. 環境変数の確認（設定した場合）
echo $AI_PROVIDER
echo $OPENAI_API_KEY

# 4. 最後にMCPサーバーを追加
claude mcp add o3-search -s user -e AI_PROVIDER=openai -e OPENAI_API_KEY=あなたのAPIキー -- npx o3-search-mcp
```
</details>

💡 **ポイント**: 
- 「あなたのAPIキー」の部分を実際のキーに置き換えてください
- `-s user`はすべてのプロジェクトで使えるようにするオプションです
- Windowsユーザーは自分の使用しているシェルに合わせて選択してください

### ステップ4: 動作確認

#### Claude Desktopの場合：
1. Claude Desktopを完全に終了（メニューから「終了」を選択）
2. Claude Desktopを再度起動

#### Claude Codeの場合：
1. ブラウザのタブをリロード（F5キー or Cmd+R）

#### どちらの場合も：
以下のように聞いてみてください：

```
「今日の東京の天気を教えて」
「最新のiPhone 16の価格は？」
「Node.js の最新バージョンは？」
```

Claudeが最新の情報を検索して答えてくれれば成功です！🎉

## 💻 Claude Code特有の機能

### スコープについて

Claude Codeでは、MCPサーバーを3つのスコープで管理できます：

1. **User scope** (`-s user`)：すべてのプロジェクトで利用可能
2. **Project scope** (`-s project`)：現在のプロジェクトでのみ利用、`.mcp.json`で共有
3. **Local scope** (`-s local`)：自分だけの設定、共有されない

#### プロジェクトで共有する場合

```bash
# プロジェクトスコープで追加
claude mcp add o3-search -s project \
  -e AI_PROVIDER=openai \
  -e OPENAI_API_KEY='${OPENAI_API_KEY}' \
  -- npx o3-search-mcp
```

これで`.mcp.json`ファイルが作成され、チームメンバーと設定を共有できます。

**注意**: プロジェクトスコープでは、APIキーを直接書かず環境変数参照（`${OPENAI_API_KEY}`）を使いましょう。

## ❓ よくあるトラブルと解決方法

### 「検索できません」と言われる場合

1. **APIキーの確認**
   - キーが正しくコピーされているか確認
   - キーの前後に余計なスペースがないか確認

2. **Claude Desktopの再起動**
   - 必ず完全に終了してから再起動してください
   - Macの場合: Command+Q で完全終了
   - Windowsの場合: タスクトレイから終了

3. **コマンドの確認**
   - `claude`コマンドが使えない場合は、Claude Desktopの設定から手動で追加（下記参照）

### 手動で設定する場合

#### Claude Desktopの場合：
1. Claude Desktopの設定を開く（左下の⚙️アイコン）
2. 「Developer」タブを選択
3. 「Edit Config」をクリック
4. 以下のJSON設定を追加：

```json
{
  "mcpServers": {
    "ai-search": {
      "command": "npx",
      "args": ["o3-search-mcp"],
      "env": {
        "AI_PROVIDER": "openai",
        "OPENAI_API_KEY": "あなたのAPIキー"
      }
    }
  }
}
```

#### Claude Codeの場合：
ターミナルで`claude mcp add`コマンドを使用するか、プロジェクトの`.mcp.json`ファイルを直接編集します。

## 🔧 .envファイルを使った環境変数管理

APIキーを.envファイルで安全に管理したい場合の手順です：

### 1. プロジェクトのセットアップ

```bash
# リポジトリをクローン
git clone git@github.com:yoshiko-pg/o3-search-mcp.git
cd o3-search-mcp

# 依存関係をインストール
pnpm install

# .envファイルを作成（.env.exampleをコピー）
cp .env.example .env

# .envファイルを編集してAPIキーを設定
# AI_PROVIDER=openai
# OPENAI_API_KEY=your-actual-api-key-here

# ビルド
pnpm build
```

### 2. .envファイルの設定

`.env`ファイルを編集して、あなたのAPIキーを設定します：

```bash
# AI Provider configuration
AI_PROVIDER=openai          # または gemini

# OpenAI configuration (AI_PROVIDER=openai の場合)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
SEARCH_CONTEXT_SIZE=medium
REASONING_EFFORT=medium

# Google Gemini configuration (AI_PROVIDER=gemini の場合)
GEMINI_API_KEY=your-gemini-api-key
```

### 3. MCPサーバーを追加

.envファイルを使う場合は、環境変数を指定せずにコマンドを実行：

```bash
# .envファイルから環境変数を自動読み込み
claude mcp add o3-search -s user \
  -- node /path/to/o3-search-mcp/build/index.js
```

✅ これで.envファイルの設定が自動的に読み込まれます！

### 4. 開発用コマンド

```bash
# TypeScriptファイルの変更を監視して自動ビルド
pnpm dev

# 型チェック
pnpm typecheck

# ビルドクリーン
pnpm clean
```

## 📋 環境変数の管理方法

### 方法1: .envファイルを使う（最も安全 🔐）

プロジェクトのルートに`.env`ファイルを作成：

**OpenAIの場合：**
```bash
# .env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-xxxxxxxx
```

**Google Geminiの場合：**
```bash
# .env
AI_PROVIDER=gemini
GEMINI_API_KEY=your-gemini-key
```

詳細は「.envファイルを使った環境変数管理」セクションを参照。

### 方法2: コマンドで直接指定（最も簡単 ⚡）

<details>
<summary>一行コマンド</summary>

**OpenAI:**
```bash
claude mcp add o3-search -s user -e AI_PROVIDER=openai -e OPENAI_API_KEY=sk-xxxxxxxx -- npx o3-search-mcp
```

**Google Gemini:**
```bash
claude mcp add gemini-search -s user -e AI_PROVIDER=gemini -e GEMINI_API_KEY=your-key -- npx o3-search-mcp
```
</details>

<details>
<summary>複数行コマンド</summary>

**OpenAI:**
```bash
claude mcp add o3-search -s user \
  -e AI_PROVIDER=openai \
  -e OPENAI_API_KEY=sk-xxxxxxxx \
  -- npx o3-search-mcp
```

**Google Gemini:**
```bash
claude mcp add gemini-search -s user \
  -e AI_PROVIDER=gemini \
  -e GEMINI_API_KEY=your-key \
  -- npx o3-search-mcp
```
</details>

### 方法3: システム環境変数（全アプリで共有）

<details>
<summary>Mac/Linux</summary>

**OpenAI:**
```bash
export AI_PROVIDER=openai
export OPENAI_API_KEY=sk-xxxxxxxx
```

**Google Gemini:**
```bash
export AI_PROVIDER=gemini
export GEMINI_API_KEY=your-key
```
</details>

<details>
<summary>Windows (コマンドプロンプト)</summary>

**OpenAI:**
```cmd
set AI_PROVIDER=openai
set OPENAI_API_KEY=sk-xxxxxxxx
```

**Google Gemini:**
```cmd
set AI_PROVIDER=gemini
set GEMINI_API_KEY=your-key
```
</details>

<details>
<summary>Windows (PowerShell)</summary>

**OpenAI:**
```powershell
$env:AI_PROVIDER="openai"
$env:OPENAI_API_KEY="sk-xxxxxxxx"
```

**Google Gemini:**
```powershell
$env:AI_PROVIDER="gemini"
$env:GEMINI_API_KEY="your-key"
```
</details>

## ⚙️ 詳細設定（任意）

### 環境変数の説明

| 変数名 | 説明 | 必須 | デフォルト値 |
|--------|------|------|--------------|
| `AI_PROVIDER` | 使用するAIプロバイダー | ✅ | `openai` |
| | `openai`: OpenAIのo3モデル | | |
| | `gemini`: GoogleのGeminiモデル | | |
| `OPENAI_API_KEY` | OpenAI APIキー | OpenAI使用時のみ | - |
| `GEMINI_API_KEY` | Google Gemini APIキー | Gemini使用時のみ | - |
| `SEARCH_CONTEXT_SIZE` | 検索範囲の広さ（OpenAIのみ） | ❌ | `medium` |
| | `low`: 基本的な検索 | | |
| | `medium`: 標準的な検索 | | |
| | `high`: 詳細な検索 | | |
| `REASONING_EFFORT` | AIの思考の深さ（OpenAIのみ） | ❌ | `medium` |
| | `low`: 高速だが簡潔 | | |
| | `medium`: バランス重視 | | |
| | `high`: 時間をかけて詳細に | | |

## 開発

### 利用可能なスクリプト

```bash
# TypeScriptをビルド
pnpm build

# 型チェックを実行
pnpm typecheck

# 開発モード（ファイル監視付き）
pnpm dev

# ビルド成果物をクリーン
pnpm clean
```

### プロジェクト構造

```
o3-search-mcp/
├── index.ts          # メインのサーバー実装
├── build/           # コンパイル済みJavaScript
├── package.json     # プロジェクト設定
├── tsconfig.json    # TypeScript設定
├── .env.example     # 環境変数のサンプル
└── README.md        # このファイル
```

## 💭 使い方

### 基本的な使い方

インストール後は、普通にClaudeと会話するだけです。特別なコマンドは不要！

```
あなた: 「今日の東京の天気は？」
Claude: 検索して最新の情報をお答えします...
        [検索中...]
        東京の今日の天気は晴れで、最高気温は25度...
```

### 検索が自動的に実行される例

#### 📰 最新ニュース
```
「今日の日経平均株価を教えて」
「最新のiPhone 16の価格は？」
「今週のIT業界のニュースをまとめて」
```

#### 🌤️ 天気・気象情報
```
「週末の天気予報を教えて」
「台風の最新情報は？」
「明日は傘が必要？」
```

#### 💻 技術情報
```
「React 19の新機能について教えて」
「最新のTypeScriptバージョンは？」
「Next.js 15のリリース日はいつ？」
```

#### 🔍 詳細な調査
```
「電気自動車の最新トレンドを調査して」
「AIの最新研究動向をまとめて」
「2024年のプログラミング言語ランキングは？」
```

### 💡 効果的な使い方のコツ

1. **具体的に質問する**: 「最新の」「今日の」「2024年の」など時期を明確に
2. **検索を促す言葉を使う**: 「調べて」「検索して」「最新情報を教えて」
3. **複数の情報を組み合わせる**: 「比較して」「まとめて」「違いを教えて」

## 🔍 コマンドの説明

### コマンドの構成要素

```
claude mcp add [名前] -s [スコープ] -e [環境変数] -- [実行コマンド]
```

- **`claude mcp add`**: MCPサーバーを追加するコマンド
- **`[名前]`**: サーバーの識別名（例: `o3-search`）
- **`-s [スコープ]`**: 
  - `user`: すべてのプロジェクトで利用可能
  - `project`: 現在のプロジェクトのみ
  - `local`: 自分だけ（共有されない）
- **`-e [環境変数]`**: 環境変数の設定（複数可）
- **`--`**: オプションとコマンドの区切り
- **`[実行コマンド]`**: サーバーの実行方法

### バックスラッシュ（\）について

複数行にまたがるコマンドを書く時に使用：
- Unix/Mac/Linux: そのまま使用可能
- Windows: 
  - コマンドプロンプト: `^` を使用
  - PowerShell: `` ` `` (バッククォート)を使用

## 🆘 困ったときは

### Q: 「claude」コマンドが見つからない

A: 
- **Claude Desktop**: 最新版をインストールしてください。古いバージョンでは`claude`コマンドが使えません。
- **Claude Code**: ブラウザで[claude.ai/code](https://claude.ai/code)にアクセスし、ターミナルパネルで実行してください。

### Q: Claude DesktopとClaude Codeのどちらを使うべき？

A: 
- **Claude Desktop**: 一般的な用途、個人利用に最適
- **Claude Code**: 開発プロジェクト、チーム共有、ブラウザで完結したい場合に最適

### Q: Node.jsのバージョンエラーが出る

A: Voltaを使うことで解決できます：
```bash
# Voltaをインストール後
volta install node@22
volta install pnpm
```
これで適切なバージョンが自動的に使われるようになります。

### Q: APIキーはどこで確認できる？

A: 
- **OpenAI**: [ダッシュボード](https://platform.openai.com/api-keys)の「API keys」セクション
- **Google**: [AI Studio](https://aistudio.google.com/apikey)の「Get API key」セクション

### Q: 無料で使える？

A: 
- Claude Desktop自体は無料です
- APIキーは各サービスの無料枠内で使用可能です（使用量に応じて課金される場合があります）

### Q: エラーメッセージが出る

よくあるエラーと解決方法：

1. **「API key not found」**
   - APIキーが正しく設定されているか確認
   - キーの前後のスペースを削除

2. **「Cannot find module」**
   - `npm install -g npm@latest`でnpmを更新
   - 再度インストールを実行

3. **「Permission denied」**
   - Macの場合: コマンドの前に`sudo`を付ける
   - Windowsの場合: 管理者権限でコマンドプロンプトを実行

## 🔒 セキュリティについて

- **MCPサーバーは信頼できるものだけを使用してください**
- APIキーは環境変数や安全な方法で管理してください
- プロジェクトスコープで共有する場合は、APIキーを直接書かないでください
- `.env`ファイルは`.gitignore`に含まれているため、誤ってコミットされることはありません
- 本番環境では、環境変数は安全な方法（シークレット管理ツールなど）で管理してください

## ライセンス

MIT

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容について議論してください。

## 作者

[@yoshiko-pg](https://github.com/yoshiko-pg)