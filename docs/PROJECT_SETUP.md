# プロジェクト単位でのセットアップガイド

## 概要

このガイドでは、o3-search-mcpを特定のプロジェクトでのみ使用する方法を説明します。

## なぜプロジェクト単位で使うのか？

- **プロジェクト固有の設定**: プロジェクトごとに異なるAIプロバイダーやAPIキーを使用
- **チーム共有**: チームメンバー全員が同じ設定を使用
- **バージョン管理**: プロジェクトごとに異なるバージョンのMCPサーバーを固定
- **環境の分離**: 他のプロジェクトに影響を与えない

## セットアップ手順

### 1. プロジェクトディレクトリの準備

```bash
# プロジェクトのルートに移動
cd /path/to/your/project

# MCPサーバー用のディレクトリを作成（任意）
mkdir -p .mcp-servers
```

### 2. プロジェクトスコープでMCPサーバーを追加

#### 方法A: コマンドで追加

```bash
# Claude Codeで実行
claude mcp add o3-search -s project \
  -e AI_PROVIDER=openai \
  -e OPENAI_API_KEY='${OPENAI_API_KEY}' \
  -- npx o3-search-mcp
```

#### 方法B: .mcp.jsonを手動作成

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "npx",
      "args": ["o3-search-mcp@latest"],
      "env": {
        "AI_PROVIDER": "${AI_PROVIDER}",
        "OPENAI_API_KEY": "${OPENAI_API_KEY}",
        "GEMINI_API_KEY": "${GEMINI_API_KEY}"
      }
    }
  }
}
```

### 3. 環境変数の設定

#### .envファイルの作成

```bash
# プロジェクトルートに.envを作成
cat > .env << EOF
AI_PROVIDER=openai
OPENAI_API_KEY=sk-xxxxxxxx
GEMINI_API_KEY=your-gemini-key
EOF
```

#### .env.exampleの作成（チーム共有用）

```bash
cat > .env.example << EOF
# AI Provider configuration
AI_PROVIDER=openai  # or gemini

# API Keys
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key

# Optional settings (OpenAI only)
SEARCH_CONTEXT_SIZE=medium
REASONING_EFFORT=medium
EOF
```

### 4. .gitignoreの更新

```bash
# .gitignoreに追加
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

## チームでの使い方

### 新しいメンバーがプロジェクトに参加する場合

1. リポジトリをクローン
2. `.env.example`を`.env`にコピー
3. 自分のAPIキーを設定
4. Claude Codeを開いてプロジェクトを読み込む

```bash
# 新メンバーの手順
git clone <repository-url>
cd <project-name>
cp .env.example .env
# .envを編集してAPIキーを設定
```

## 特定バージョンの固定

プロジェクトで特定のバージョンを使いたい場合：

### 方法1: package.jsonに追加

```json
{
  "devDependencies": {
    "o3-search-mcp": "^0.1.0"
  }
}
```

### 方法2: .mcp.jsonでバージョン指定

```json
{
  "mcpServers": {
    "o3-search": {
      "command": "npx",
      "args": ["o3-search-mcp@0.1.0"],
      "env": {
        "AI_PROVIDER": "${AI_PROVIDER}",
        "OPENAI_API_KEY": "${OPENAI_API_KEY}"
      }
    }
  }
}
```

## プロジェクトごとの設定例

### Webアプリケーションプロジェクト

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

### データ分析プロジェクト

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

## トラブルシューティング

### 環境変数が読み込まれない

1. `.env`ファイルがプロジェクトルートにあるか確認
2. Claude Codeを再起動
3. `echo $OPENAI_API_KEY`で環境変数を確認

### チームメンバーで動作しない

1. `.mcp.json`が正しくコミットされているか確認
2. 環境変数名が一致しているか確認
3. APIキーが正しく設定されているか確認