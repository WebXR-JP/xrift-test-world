# XRift World Template - AI向けガイド

このドキュメントは、AI（Claude、ChatGPTなど）がこのプロジェクトを理解し、適切にコードを生成・修正するためのガイドです。

## プロジェクト概要

このプロジェクトは、XRiftプラットフォームで動作するWebXRワールドを作成するためのテンプレートです。Module Federationを使用して、フロントエンド側から動的にロードされます。

## 重要な制約事項

### 1. アセット読み込みは必ず `@xrift/world-components` の `useXRift` を使用

**理由**: ワールドはCDNにアップロードされ、フロントエンド側から動的にロードされるため、アセットのベースURLが実行時に決まります。

**正しい実装**:
```typescript
import { useXRift } from '@xrift/world-components'
import { useGLTF } from '@react-three/drei'

function MyModel() {
  const { baseUrl } = useXRift()
  const { scene } = useGLTF(`${baseUrl}models/robot.glb`)
  return <primitive object={scene} />
}
```

**間違った実装**:
```typescript
// ❌ 絶対パスや相対パスを直接指定してはいけない
import { useGLTF } from '@react-three/drei'

function MyModel() {
  const { scene } = useGLTF('/models/robot.glb')  // ❌
  const { scene } = useGLTF('./models/robot.glb') // ❌
  return <primitive object={scene} />
}
```

### 2. アセットファイルは `public/` ディレクトリに配置

- GLBモデル、テクスチャ画像などは`public/`に配置
- `public/`内のファイルはビルド時にCDNにアップロードされる
- `baseUrl`は末尾に`/`を含むため、パス結合時に`/`を重複させない

**例**:
```typescript
// ✅ 正しい（baseUrlは "https://cdn.example.com/worlds/xxx/" のように末尾に/を含む）
const model = useGLTF(`${baseUrl}models/robot.glb`)

// ❌ 間違い（//models/robot.glb となってしまう）
const model = useGLTF(`${baseUrl}/models/robot.glb`)
```

### 3. ローカル開発環境では `XRiftProvider` でラップ

開発時（`npm run dev`）は、`XRiftProvider`でワールドをラップしてベースURLを提供する必要があります。

**src/dev.tsx の例**:
```typescript
import { XRiftProvider } from '@xrift/world-components'
import { World } from './World'

createRoot(rootElement).render(
  <XRiftProvider baseUrl="/public/">
    <Canvas>
      <Physics>
        <World />
      </Physics>
    </Canvas>
  </XRiftProvider>
)
```

### 4. 本番環境では `XRiftProvider` は不要

本番環境（XRiftプラットフォーム上）では、フロントエンド側が自動的に`XRiftProvider`でワールドコンポーネントをラップします。

## よくある実装パターン

### GLBモデルの読み込み

```typescript
import { useXRift } from '@xrift/world-components'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export const MyModel = () => {
  const { baseUrl } = useXRift()
  const { scene } = useGLTF(`${baseUrl}models/robot.glb`)

  return (
    <RigidBody type="fixed">
      <primitive object={scene} />
    </RigidBody>
  )
}
```

### テクスチャの読み込み

```typescript
import { useXRift } from '@xrift/world-components'
import { useTexture } from '@react-three/drei'

export const MyMaterial = () => {
  const { baseUrl } = useXRift()
  const texture = useTexture(`${baseUrl}textures/albedo.png`)

  return <meshStandardMaterial map={texture} />
}
```

### 複数テクスチャの読み込み

```typescript
import { useXRift } from '@xrift/world-components'
import { useTexture } from '@react-three/drei'

export const MyPBRMaterial = () => {
  const { baseUrl } = useXRift()
  const [albedo, normal, roughness] = useTexture([
    `${baseUrl}textures/albedo.png`,
    `${baseUrl}textures/normal.png`,
    `${baseUrl}textures/roughness.png`,
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

### Skybox（360度パノラマ背景）

```typescript
import { useXRift } from '@xrift/world-components'
import { useTexture } from '@react-three/drei'
import { BackSide } from 'three'

export const Skybox = ({ radius = 500 }) => {
  const { baseUrl } = useXRift()
  const texture = useTexture(`${baseUrl}skybox.jpg`)

  return (
    <mesh>
      <sphereGeometry args={[radius, 60, 40]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  )
}
```

## プロジェクト構造

```
xrift-world-template/
├── public/              # アセットファイル（GLB, テクスチャなど）
│   ├── models/
│   ├── textures/
│   └── *.jpg, *.png
├── src/
│   ├── components/      # 3Dコンポーネント
│   ├── World.tsx        # メインワールドコンポーネント
│   ├── dev.tsx          # 開発用エントリーポイント
│   └── index.tsx        # 本番用エクスポート
├── .triplex/            # Triplex（3Dエディタ）設定
│   ├── config.json
│   └── provider.tsx
├── vite.config.ts       # Module Federation設定
└── package.json
```

## 依存パッケージ

### 必須パッケージ
- `@xrift/world-components`: XRift固有の機能（useXRift等）を提供
- `@react-three/fiber`: React Three Fiber
- `@react-three/drei`: Three.js用ヘルパー
- `@react-three/rapier`: 物理エンジン
- `three`: Three.js本体

### 開発用パッケージ
- `@originjs/vite-plugin-federation`: Module Federation
- `vite`: ビルドツール
- `typescript`: TypeScript

## ビルドとデプロイ

1. **開発**: `npm run dev` → http://localhost:5173
2. **ビルド**: `npm run build` → `dist/`にModule Federation形式で出力
3. **型チェック**: `npm run typecheck`

## AI向けの注意事項

1. **必ず `useXRift` を使用**: アセット読み込みで絶対パスや相対パスを直接使わない
2. **`public/` にアセット配置**: アセットは`public/`ディレクトリに配置
3. **パス結合時の `/` に注意**: `baseUrl`は末尾に`/`を含むため、`${baseUrl}path`と結合
4. **ローカル開発環境の設定**: `src/dev.tsx`で`XRiftProvider`を使用
5. **Module Federation**: このプロジェクトはライブラリとしてビルドされ、フロントエンドから動的ロードされる

## トラブルシューティング

### エラー: "useXRift must be used within XRiftProvider"

**原因**: `XRiftProvider`でラップされていない

**解決方法**:
- ローカル開発環境: `src/dev.tsx`で`XRiftProvider`を使用しているか確認
- Triplex: `.triplex/provider.tsx`で`XRiftProvider`を使用しているか確認

### アセットが読み込めない

**原因**: `baseUrl`を使用していない、またはパスの結合が間違っている

**解決方法**:
```typescript
// ✅ 正しい
const { baseUrl } = useXRift()
const model = useGLTF(`${baseUrl}models/robot.glb`)

// ❌ 間違い
const model = useGLTF('/models/robot.glb')
const model = useGLTF(`${baseUrl}/models/robot.glb`) // 余分な/
```

## 実装例の参照先

- Duck（GLBモデル）: `src/components/Duck/index.tsx`
- Skybox（360度背景）: `src/components/Skybox/index.tsx`
- メインワールド: `src/World.tsx`
- 開発環境設定: `src/dev.tsx`
