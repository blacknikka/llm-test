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

## MongoDBの動作確認

MongoDBが正しく起動しているか確認するには、以下のコマンドを実行してください。

```bash
docker-compose exec mongo mongosh --eval "db.adminCommand('ping')"
```

`{ ok: 1 }` が返ればMongoDBは正常に動作しています。

また、MongoDBシェルに入り、データベースやコレクションの状態を確認することもできます。

```bash
docker-compose exec mongo mongosh
```

シェル内で以下のコマンドを実行してください。

```javascript
show dbs
use tododb
show collections
db.todos.find().limit(1)
```

### 補足

MongoDBは、最初の書き込み操作が行われた時点で自動的にデータベースやコレクションが作成されます。  
そのため、`tododb` がまだ存在しない状態で `use tododb` や `db.todos.find()` などのクエリを実行してもエラーにはなりません。  
この場合、単に空の結果が返るだけです。  
書き込み操作（例: ドキュメントの挿入）を行うと、その時点で `tododb` データベースや `todos` コレクションが自動的に作成されます。

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