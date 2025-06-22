# フロントエンドテスト

このディレクトリには、ReactアプリケーションのJestテストが含まれています。テストはDocker Compose環境で実行することを想定しています。

## テストの構成

### テストファイル
- `src/__tests__/App.test.js` - メインAppコンポーネントのテスト
- `src/components/__tests__/TodoItem.test.js` - TodoItemコンポーネントのテスト
- `src/components/__tests__/TodoList.test.js` - TodoListコンポーネントのテスト
- `src/components/__tests__/AddTodo.test.js` - AddTodoコンポーネントのテスト
- `src/utils/__tests__/api.test.js` - APIユーティリティ関数のテスト

### セットアップファイル
- `src/setupTests.js` - Jestのセットアップとグローバルモックの設定

## Docker Compose環境でのテスト実行

### 前提条件
- Docker Composeが起動していること
- フロントエンドコンテナが実行中であること

### テストの実行方法

#### 1. 開発モードでテストを実行（ウォッチモード）
```bash
# コンテナが起動している場合
docker-compose exec frontend npm test

# コンテナが起動していない場合
docker-compose run --rm frontend npm test
```

#### 2. カバレッジ付きでテストを実行
```bash
# コンテナが起動している場合
docker-compose exec frontend npm run test:coverage

# コンテナが起動していない場合
docker-compose run --rm frontend npm run test:coverage
```

#### 3. 一度だけテストを実行（CI/CD用）
```bash
# コンテナが起動している場合
docker-compose exec frontend npm test -- --watchAll=false

# コンテナが起動していない場合
docker-compose run --rm frontend npm test -- --watchAll=false
```

#### 4. 特定のテストファイルを実行
```bash
# コンテナが起動している場合
docker-compose exec frontend npm test -- --testPathPattern=App.test.js

# コンテナが起動していない場合
docker-compose run --rm frontend npm test -- --testPathPattern=App.test.js
```

#### 5. 依存関係のインストール
```bash
# コンテナが起動している場合
docker-compose exec frontend npm install

# コンテナが起動していない場合
docker-compose run --rm frontend npm install
```

## テストの内容

### APIユーティリティテスト (`api.test.js`)
- `fetchTodos` - TODOリストの取得
- `addTodo` - 新しいTODOの追加
- `updateTodo` - TODOの更新
- `deleteTodo` - TODOの削除
- 成功時とエラー時の両方のケースをテスト

### コンポーネントテスト

#### TodoItem (`TodoItem.test.js`)
- コンポーネントの正しいレンダリング
- 完了/未完了状態の表示
- チェックボックスの切り替え機能
- 削除ボタンの機能

#### AddTodo (`AddTodo.test.js`)
- フォームの正しいレンダリング
- 入力値の更新
- 新しいTODOの追加機能
- 空の入力での送信防止

#### TodoList (`TodoList.test.js`)
- TODOリストの正しい表示
- 空のリストの表示
- 各TODOアイテムの表示

#### App (`App.test.js`)
- アプリケーションの初期状態
- TODOの追加機能
- TODOの削除機能
- APIとの連携

## テストカバレッジ

テストを実行すると、以下のカバレッジ情報が表示されます：
- Statements: コードの実行文のカバレッジ
- Branches: 条件分岐のカバレッジ
- Functions: 関数のカバレッジ
- Lines: 行のカバレッジ

## トラブルシューティング

### コンテナが起動していない場合
```bash
# プロジェクトルートでDocker Composeを起動
cd ../../  # todo-appディレクトリに移動
docker-compose up -d
```

### テストが失敗する場合
1. 依存関係が正しくインストールされているか確認
2. コンテナ内で`npm install`を実行
3. テストファイルの構文エラーがないか確認

### ウォッチモードでテストが実行されない場合
- コンテナ内でインタラクティブモードが有効になっているか確認
- `docker-compose exec -it frontend npm test`を使用

## CI/CDでの利用

CI/CDパイプラインでは、以下のコマンドを使用することを推奨します：
```bash
docker-compose run --rm frontend npm test -- --watchAll=false --coverage
```

これにより、テストが一度だけ実行され、カバレッジレポートが生成されます。

## テストのベストプラクティス

1. **ユーザー中心のテスト**: ユーザーが実際に行う操作に基づいてテストを書く
2. **アクセシビリティの考慮**: `getByRole`や`getByLabelText`を使用
3. **非同期処理の適切な処理**: `waitFor`を使用して非同期処理を待機
4. **エラーケースのテスト**: 成功時だけでなく、エラー時の動作もテスト
5. **モックの適切な使用**: 外部依存関係をモックしてテストを独立させる 