# TODOアプリケーション バックエンド

## 概要
このプロジェクトはシンプルなTODOアプリケーションのバックエンドです。ユーザー認証なしで、タスク（Todo）の作成・取得・更新・削除ができるRESTful APIを提供します。

## 使用技術
- Node.js
- Express
- Mongoose（MongoDB用ODM）
- TypeScript

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
   `src/utils/db.ts` 内のMongoDB接続設定を自身の環境に合わせて編集してください。

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

## テストの実行方法

本プロジェクトでは、JestとSupertestを用いた自動テストを用意しています。

### テストの実行手順

1. **MongoDBが起動していることを確認してください。**  
   Docker環境の場合は、以下のコマンドでMongoDBを含む全サービスを起動できます。

   ```bash
   docker-compose up -d
   ```

2. **テストを実行します。**  
   以下のコマンドでテストを実行できます。

   ```bash
   npm test
   ```

   または、Dockerコンテナ上で実行する場合は

   ```bash
   docker-compose run backend npm test
   ```

### 注意点

- テスト実行時にはMongoDBが必要です。MongoDBが起動していない場合、テストは失敗します。
- テストはデータベースに対して読み書きを行います。**本番データベースではなく、テスト用のデータベースを使用してください。**
- テスト実行後、テスト用データベースにテストデータが残る場合があります。必要に応じてクリーンアップしてください。

## APIエンドポイント

### Todos
- **GET /api/todos**: Todo一覧を取得
- **POST /api/todos**: 新規Todoを作成
- **PUT /api/todos/:id**: 指定IDのTodoを更新
- **DELETE /api/todos/:id**: 指定IDのTodoを削除

## ファイル構成
- `src/app.ts`: アプリケーションのエントリーポイント
- `src/controllers/todosController.ts`: Todo操作のロジック
- `src/models/todo.ts`: Todoスキーマ定義
- `src/routes/todos.ts`: Todo APIのルーティング
- `src/utils/db.ts`: データベース接続ユーティリティ

## ライセンス