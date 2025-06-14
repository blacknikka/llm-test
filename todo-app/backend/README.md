# TODOアプリケーション バックエンド

## 概要
このプロジェクトはシンプルなTODOアプリケーションのバックエンドです。ユーザー認証なしで、タスク（Todo）の作成・取得・更新・削除ができるRESTful APIを提供します。

## 使用技術
- Node.js
- Express
- Mongoose（MongoDB用ODM）

## セットアップ手順

1. **リポジトリをクローン**
   ```bash
   git clone <repository-url>
   cd todo-app/backend
   ```

2. **依存パッケージのインストール**
   ```bash
   npm install
   ```

3. **データベース設定**
   `src/utils/db.js` 内のMongoDB接続設定を自身の環境に合わせて編集してください。

4. **サーバーの起動**
   ```bash
   npm start
   ```

   サーバーはデフォルトで `http://localhost:5000` で起動します。

## APIエンドポイント

### Todos
- **GET /api/todos**: Todo一覧を取得
- **POST /api/todos**: 新規Todoを作成
- **PUT /api/todos/:id**: 指定IDのTodoを更新
- **DELETE /api/todos/:id**: 指定IDのTodoを削除

## ファイル構成
- `src/app.js`: アプリケーションのエントリーポイント
- `src/controllers/todosController.js`: Todo操作のロジック
- `src/models/todo.js`: Todoスキーマ定義
- `src/routes/todos.js`: Todo APIのルーティング
- `src/utils/db.js`: データベース接続ユーティリティ

## ライセンス
このプロジェクトはMITライセンスで提供