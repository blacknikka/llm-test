# TODOアプリケーション

このプロジェクトは、Reactで構築されたフロントエンドとExpressを利用したバックエンドから成るシンプルなWebベースのTODOアプリケーションです。ユーザー登録なしでタスク管理が可能です。

## プロジェクト構成

本プロジェクトは「frontend」と「backend」の2つのディレクトリに分かれています。

```
todo-app
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── todosController.js
│   │   ├── models
│   │   │   └── todo.js
│   │   ├── routes
│   │   │   └── todos.js
│   │   └── utils
│   │       └── db.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── TodoList.js
│   │   │   ├── TodoItem.js
│   │   │   └── AddTodo.js
│   │   └── utils
│   │       └── api.js
│   ├── package.json
│   └── README.md
└── README.md
```

## 機能

- **Todo追加**: 新しいタスクを追加できます。
- **Todo一覧表示**: すべてのタスクをリスト形式で表示します。
- **Todo更新**: タスクの完了状態やタイトルを編集できます。
- **Todo削除**: タスクをリストから削除できます。

## はじめに

### 必要要件

- Node.js（バージョン14以上）
- npm（Node Package Manager）

### インストール手順

1. リポジトリをクローンします:
   ```
   git clone <repository-url>
   cd todo-app
   ```

2. バックエンドの依存パッケージをインストールします:
   ```
   cd backend
   npm install
   ```

3. フロントエンドの依存パッケージをインストールします:
   ```
   cd frontend
   npm install
   ```

### アプリケーションの起動

1. バックエンドサーバーを起動します:
   ```
   cd backend
   npm start
   ```

2. フロントエンドアプリケーションを起動します:
   ```
   cd frontend
   npm start
   ```

フロントエンドは `http://localhost:3000`、バックエンドは `http://localhost:5000` で利用できます。

## APIエンドポイント

- `GET /todos`: Todo一覧の取得
- `POST /todos`: 新規Todoの作成
- `PUT /todos/:id`: 既存Todoの更新
- `DELETE /todos/:id`: Todoの削除

## ライセンス

このプロジェクトはMITライセンスで提供されています。