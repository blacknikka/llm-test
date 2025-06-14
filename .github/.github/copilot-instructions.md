# 技術スタック
- フロントエンド
    - React
    - TypeScript
    - Next.js
- バックエンド
    - Node.js
    - TypeScript
    - Express
    - MongoDB

# ディレクトリ構成
- フロントエンド
    - `/front/src/`
        - `components/` - コンポーネント
        - `pages/` - ページ
        - `styles/` - スタイル
        - `utils/` - ユーティリティ関数
        - `hooks/` - カスタムフック
        - `context/` - コンテキストAPI
        - `assets/` - 画像やフォントなどのアセット
    - `/front/tests/`
        - `unit/` - ユニットテスト
        - `integration/` - 統合テスト
        - `e2e/` - エンドツーエンドテスト
- バックエンド
    - `/backend/src/`
        - `controllers/` - コントローラー
        - `models/` - モデル
        - `routes/` - ルーティング
        - `middlewares/` - ミドルウェア
        - `config/` - 設定ファイル
        - `utils/` - ユーティリティ関数
        - `services/` - サービス層
    - `/backend/tests/`
        - `unit/` - ユニットテスト
        - `integration/` - 統合テスト
        - `e2e/` - エンドツーエンドテスト

# コーディング規則
- コメントは必要に応じて記述し、記述する場合は日本語で記述する
- 関数の引数・戻り値には型を明記する
- 定数はUPPER_SNAKE_CASEで記述する
- メソッド名は動詞から始める
- 数値を扱う変数名には単位がわかるような接尾辞をつける
- 必ずテストは記載する

