# @xrift/test-world

XRiftのUGCワールド機能検証用テストワールドパッケージ

## 概要

このパッケージは、NPM経由でのワールド配信機能の実現可能性を検証するために作成されたテストワールドです。React Three FiberとRapier物理エンジンを使用した3Dワールドを提供します。

## 特徴

- 20m × 20mの閉じた空間
- 物理演算対応（壁、地面との衝突判定）
- 段差テスト用オブジェクト（0.1m, 0.2m, 0.3m, 0.5m）
- 階段構造
- 狭い隙間テスト
- 鏡（Reflector使用）

## インストール

```bash
npm install @xrift/test-world
```

## 使用方法

```tsx
import { World } from '@xrift/test-world'

function App() {
  return (
    <Canvas>
      <Physics>
        <World position={[0, 0, 0]} scale={1} />
      </Physics>
    </Canvas>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | [number, number, number] | [0, 0, 0] | ワールドの配置位置 |
| scale | number | 1 | ワールドのスケール |

## 必要な依存関係

- React 19+
- Three.js 0.176+
- @react-three/fiber 9.3+
- @react-three/rapier 2.1+
- @react-three/drei 10.7+

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run typecheck
```

## ライセンス

MIT
