# XRift World Template

XRiftで動作するWebXRワールドを作成するための公式テンプレートです。

## 概要

このテンプレートは、XRift CLI (`npx @xrift/cli create`) で新しいワールドプロジェクトを作成する際に使用されます。React Three Fiber、Rapier物理エンジン、Three.jsを使用した3Dワールドの基本構成がセットアップ済みで、すぐに開発を始められます。

## このテンプレートに含まれる機能

- **React Three Fiber**: Reactコンポーネントとして3Dシーンを構築
- **Rapier物理エンジン**: リアルな物理演算（衝突判定、重力など）
- **Three.js**: WebGLベースの3Dグラフィックス
- **Module Federation**: XRiftプラットフォームでの動的読み込み対応
- **TypeScript**: 型安全な開発環境
- **サンプルワールド**: 物理演算やオブジェクト配置の実装例

### サンプルワールドの内容

- 20m × 20mの閉じた空間
- 物理演算対応（壁、地面との衝突判定）
- 段差テスト用オブジェクト（0.1m, 0.2m, 0.3m, 0.5m）
- 階段構造
- 狭い隙間テスト
- 鏡（Reflector使用）
- アニメーション実装例（回転するオブジェクト）

## 使い方

### 1. 新しいワールドプロジェクトを作成

```bash
npx @xrift/cli create my-world
```

このコマンドで、このテンプレートを基にした新しいプロジェクトが作成されます。

### 2. 開発サーバーを起動

```bash
cd my-world
npm install
npm run dev
```

### 3. カスタマイズ

- `src/World.tsx`: メインのワールドコンポーネント
- `src/components/`: 各種3Dオブジェクトのコンポーネント
- `vite.config.ts`: ビルド設定
- `package.json`: プロジェクト情報

詳細なカスタマイズ方法は [TEMPLATE.md](./TEMPLATE.md) を参照してください。

#### アセット（GLTFモデル、テクスチャ）の読み込み

XRiftでは、ワールドのアセットは自動的にCDNにアップロードされ、適切なベースURLが注入されます。アセットを読み込む際は、専用のヘルパー関数を使用してください。

```typescript
import { useWorldGLTF, useWorldTexture } from './utils/useWorldAsset'

function MyModel() {
  // GLTFモデルを読み込む（相対パスで指定）
  const gltf = useWorldGLTF('./models/robot.gltf')

  return <primitive object={gltf.scene} />
}

function MyMaterial() {
  // テクスチャを読み込む
  const texture = useWorldTexture('./textures/albedo.png')

  return <meshStandardMaterial map={texture} />
}

function MyPBRMaterial() {
  // 複数のテクスチャを同時に読み込む
  const [albedo, normal, roughness] = useWorldTexture([
    './textures/albedo.png',
    './textures/normal.png',
    './textures/roughness.png',
  ])

  return (
    <meshStandardMaterial
      map={albedo}
      normalMap={normal}
      roughnessMap={roughness}
    />
  )
}
```

**重要**: `@react-three/drei`の`useGLTF`や`useTexture`を直接使用せず、必ず`useWorldGLTF`と`useWorldTexture`を使用してください。これにより、XRiftプラットフォーム上で正しくアセットが読み込まれます。

### 4. ビルド

```bash
npm run build
```

Module Federation形式でビルドされ、XRiftプラットフォームで読み込み可能な形式で `dist/` に出力されます。

## 開発コマンド

```bash
# 開発サーバー起動（ホットリロード有効）
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# TypeScript型チェック
npm run typecheck
```

## 技術スタック

- **React**: 19.x
- **Three.js**: 0.176.x
- **@react-three/fiber**: 9.3.x
- **@react-three/rapier**: 2.1.x（物理エンジン）
- **@react-three/drei**: 10.7.x（Three.js用ヘルパー）
- **TypeScript**: 5.x
- **Vite**: 6.x（ビルドツール）

## ワールドの公開

XRiftプラットフォームでワールドを公開する方法については、[XRift公式ドキュメント](https://github.com/WebXR-JP/xrift-cli)を参照してください。

## サポート

- Issues: [GitHub Issues](https://github.com/WebXR-JP/xrift-world-template/issues)
- XRift CLI: [xrift-cli repository](https://github.com/WebXR-JP/xrift-cli)

## ライセンス

MIT
