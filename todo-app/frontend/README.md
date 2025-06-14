# TODOアプリケーション フロントエンド

このプロジェクトはReactで構築されたTODOアプリケーションのフロントエンド部分です。ユーザー登録なしでタスク管理が可能です。

## プロジェクト構成

- **public/index.html**: アプリケーションのエントリーポイントとなるHTMLファイル
- **src/App.js**: アプリ全体の構造と状態を管理するメインコンポーネント
- **src/components/**: Reactコンポーネント群
  - **TodoList.js**: Todoリストを表示するコンポーネント
  - **TodoItem.js**: 単一のTodoアイテムを表すコンポーネント
  - **AddTodo.js**: 新しいTodoを追加するフォームコンポーネント
- **src/utils/api.js**: バックエンドAPIとの通信を行うユーティリティ関数

## セットアップ手順

1. **リポジトリをクローン**
   ```bash
   git clone <repository-url>
   cd todo-app/frontend
   ```

2. **依存パッケージのインストール**
   ```bash
   npm install
   ```

3. **アプリケーションの起動**
   ```bash
   npm start
   ```

   アプリケーションは `http://localhost:3000` で利用できます。

## 使い方

- フォームから新しいTodoを追加できます。
- 追加したTodoはリストで表示されます。
- Todoの完了状態の切り替えや削除が可能です。

## 使用技術

- React: UI構築用JavaScriptライブラリ
- fetch API: バックエンドAPIとのHTTP通信

## コントリビュート

バグ報告や機能追加の提案など、IssueやPull Requestを歓迎します。