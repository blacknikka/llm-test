# バックエンドテストガイド

このプロジェクトでは、Jestを使用してTypeScriptのテストを実装しています。

## テスト構造

```
src/tests/
├── setup.js                    # テスト環境のセットアップ
├── unit/                       # ユニットテスト
│   ├── controllers/
│   │   └── todosController.test.ts
│   ├── models/
│   │   └── todo.test.ts
│   ├── routes/
│   │   └── todos.test.ts
│   └── utils/
│       └── db.test.ts
└── integration/                # 統合テスト
    └── todos.test.ts
```

## テストの種類

### 1. ユニットテスト
- **コントローラーテスト**: ビジネスロジックのテスト
- **モデルテスト**: データベーススキーマとバリデーションのテスト
- **ルーターテスト**: ルーティングのテスト
- **ユーティリティテスト**: ヘルパー関数のテスト

### 2. 統合テスト
- **API統合テスト**: エンドツーエンドのAPIテスト
- **データベース統合テスト**: 実際のデータベースとの連携テスト

## テストの実行

### 前提条件
Docker Composeを使用してテストを実行するため、以下の手順で環境を準備してください：

1. **Docker Composeでサービスを起動**
```bash
docker-compose up -d
```

2. **backendコンテナ内でテストを実行**

### 全テストの実行
```bash
docker-compose exec backend npm test
```

### ウォッチモードでテスト実行
```bash
docker-compose exec backend npm run test:watch
```

### カバレッジレポート付きでテスト実行
```bash
docker-compose exec backend npm run test:coverage
```

### ユニットテストのみ実行
```bash
docker-compose exec backend npm run test:unit
```

### 統合テストのみ実行
```bash
docker-compose exec backend npm run test:integration
```

## テスト環境の設定

### Docker Compose環境
- **MongoDB**: `mongo` サービス名で起動
- **Backend**: `backend` サービス名で起動
- **ネットワーク**: コンテナ間で自動的に接続

### 環境変数
テスト実行時は以下の環境変数が設定されます：
- `NODE_ENV=test`
- `MONGO_URL=mongodb://mongo:27017/todo-test`

### データベース接続
- テスト用データベース `todo-test` は自動で作成されます
- 各テスト後にデータベースがクリーンアップされます

## テストの特徴

### モックの使用
- データベース操作のモック
- 外部依存関係のモック
- コンソール出力のモック

### データベースクリーンアップ
- 各テスト後にデータベースがクリーンアップされます
- テスト間の独立性が保たれます

### エラーハンドリング
- 正常系と異常系の両方をテスト
- 適切なHTTPステータスコードの検証
- エラーメッセージの検証

## テストカバレッジ

テストカバレッジレポートは以下の項目をカバーしています：
- ステートメントカバレッジ
- ブランチカバレッジ
- 関数カバレッジ
- 行カバレッジ

カバレッジレポートは `coverage/` ディレクトリに生成されます。

## テストの追加方法

### 新しいユニットテストの追加
1. `src/tests/unit/` ディレクトリ内に適切なサブディレクトリを作成
2. テストファイル名を `*.test.ts` または `*.spec.ts` で作成
3. Jestのテスト構文に従ってテストを記述

### 新しい統合テストの追加
1. `src/tests/integration/` ディレクトリ内にテストファイルを作成
2. supertestを使用してAPIエンドポイントをテスト
3. 実際のデータベースを使用してテストを実行

## トラブルシューティング

### Docker Compose関連
- **コンテナが起動していない場合**
  ```bash
  docker-compose ps
  docker-compose up -d
  ```

- **backendコンテナにアクセスできない場合**
  ```bash
  docker-compose logs backend
  ```

### MongoDB接続エラー
- MongoDBコンテナが起動していることを確認
  ```bash
  docker-compose ps mongo
  ```
- コンテナ間のネットワーク接続を確認
  ```bash
  docker-compose exec backend ping mongo
  ```

### テストタイムアウト
- データベース操作が長時間かかる場合は、`jest.config.js` の `testTimeout` を調整
- 現在の設定: 30秒

### モックエラー
- モックの設定を確認
- `jest.clearAllMocks()` を使用してモックをリセット

### ソースコードの変更が反映されない場合
- ボリュームマウントの設定を確認
- コンテナを再起動
  ```bash
  docker-compose restart backend
  ``` 