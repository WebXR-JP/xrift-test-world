import { createContext, useContext } from 'react'
import type { WorldBaseUrlContextValue } from '../types/world'

/**
 * ワールドのベースURLを提供するReact Context
 *
 * このContextはフロントエンド側（xrift-frontend）で作成・注入されます。
 * Module Federationにより同じReactインスタンスを共有するため、
 * Contextも自動的に共有されます。
 *
 * ローカル開発時は XRiftDevProvider を使用してこのContextを提供します。
 */
export const WorldBaseUrlContext = createContext<WorldBaseUrlContextValue | null>(null)

/**
 * XRift固有の情報を取得するフック
 *
 * @returns XRiftコンテキスト値
 * @property assetBasePath - ワールドアセットのベースパス（CDNのURL等）
 *
 * @throws {Error} WorldBaseUrlProviderの外で使用された場合
 *
 * @example
 * ```typescript
 * import { useXRift } from './utils/useXRift'
 * import { useGLTF } from '@react-three/drei'
 *
 * function MyModel() {
 *   const { assetBasePath } = useXRift()
 *   const modelPath = `${assetBasePath}/models/robot.gltf`
 *   const gltf = useGLTF(modelPath)
 *
 *   return <primitive object={gltf.scene} />
 * }
 * ```
 *
 * @example
 * ```typescript
 * import { useXRift } from './utils/useXRift'
 * import { useTexture } from '@react-three/drei'
 *
 * function MyMaterial() {
 *   const { assetBasePath } = useXRift()
 *   const texture = useTexture(`${assetBasePath}/textures/albedo.png`)
 *
 *   return <meshStandardMaterial map={texture} />
 * }
 * ```
 */
export const useXRift = () => {
  const context = useContext(WorldBaseUrlContext)

  if (!context) {
    throw new Error('useXRift must be used within WorldBaseUrlProvider')
  }

  return {
    /**
     * ワールドアセットのベースパス
     * 相対パスの前にこのパスを付けて絶対パスを構築します
     *
     * @example
     * ```typescript
     * const { assetBasePath } = useXRift()
     * // assetBasePath = 'https://cdn.example.com/worlds/my-world'
     * const fullPath = `${assetBasePath}/models/scene.gltf`
     * ```
     */
    assetBasePath: context.baseUrl,
  }
}
