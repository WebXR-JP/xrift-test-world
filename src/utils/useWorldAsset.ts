import { useGLTF, useTexture } from '@react-three/drei'
import { createContext, useContext } from 'react'
import type { GLTF } from 'three-stdlib'
import type { WorldBaseUrlContextValue } from '../types/world'

/**
 * ワールドのベースURLを提供するReact Context
 *
 * このContextはフロントエンド側（xrift-frontend）で作成・注入されます。
 * Module Federationにより同じReactインスタンスを共有するため、
 * Contextも自動的に共有されます。
 *
 * @internal
 */
const WorldBaseUrlContext = createContext<WorldBaseUrlContextValue | null>(null)

/**
 * ワールドのベースURLを取得するフック
 *
 * @returns WorldBaseUrlContextValue - ベースURLを含むコンテキスト値
 * @throws {Error} WorldBaseUrlProviderの外で使用された場合
 *
 * @example
 * ```typescript
 * const { baseUrl } = useWorldBaseUrl()
 * console.log(baseUrl) // 'https://cdn.example.com/worlds/my-world/'
 * ```
 */
export const useWorldBaseUrl = (): WorldBaseUrlContextValue => {
  const context = useContext(WorldBaseUrlContext)

  if (!context) {
    throw new Error('useWorldBaseUrl must be used within WorldBaseUrlProvider')
  }

  return context
}

/**
 * 相対パスを絶対パスに変換するヘルパー関数
 *
 * @param baseUrl - ベースURL
 * @param relativePath - 相対パス（'./'で始まる場合は削除される）
 * @returns 絶対パス
 *
 * @internal
 */
const resolveAssetPath = (baseUrl: string, relativePath: string): string => {
  // 先頭の './' を削除してベースURLと結合
  const cleanPath = relativePath.replace(/^\.\//, '')
  return baseUrl + cleanPath
}

/**
 * ワールドのGLTFモデルを読み込むフック
 *
 * 相対パスを指定すると、フロントエンドから注入されたベースURLを使って
 * 自動的に絶対パスに変換してGLTFを読み込みます。
 *
 * @param relativePath - GLTFファイルの相対パス（例: './models/scene.gltf'）
 * @returns useGLTFの戻り値（GLTFオブジェクト）
 *
 * @example
 * ```typescript
 * function MyModel() {
 *   const gltf = useWorldGLTF('./models/robot.gltf')
 *
 *   return <primitive object={gltf.scene} />
 * }
 * ```
 *
 * @example
 * ```typescript
 * // TypeScriptで型を指定する場合
 * interface MyGLTF extends GLTF {
 *   nodes: {
 *     Robot: THREE.Mesh
 *   }
 *   materials: {
 *     Material: THREE.MeshStandardMaterial
 *   }
 * }
 *
 * function MyModel() {
 *   const { nodes, materials } = useWorldGLTF<MyGLTF>('./models/robot.gltf')
 *
 *   return (
 *     <mesh geometry={nodes.Robot.geometry} material={materials.Material} />
 *   )
 * }
 * ```
 */
export const useWorldGLTF = <T extends GLTF = GLTF>(relativePath: string): T => {
  const { baseUrl } = useWorldBaseUrl()
  const absolutePath = resolveAssetPath(baseUrl, relativePath)

  return useGLTF(absolutePath) as unknown as T
}

/**
 * ワールドのテクスチャを読み込むフック
 *
 * 相対パスを指定すると、フロントエンドから注入されたベースURLを使って
 * 自動的に絶対パスに変換してテクスチャを読み込みます。
 *
 * @param relativePath - テクスチャファイルの相対パス、または相対パスの配列
 * @returns useTextureの戻り値（THREE.Texture または THREE.Texture[]）
 *
 * @example
 * ```typescript
 * // 単一のテクスチャを読み込む
 * function MyMaterial() {
 *   const texture = useWorldTexture('./textures/albedo.png')
 *
 *   return <meshStandardMaterial map={texture} />
 * }
 * ```
 *
 * @example
 * ```typescript
 * // 複数のテクスチャを読み込む
 * function MyMaterial() {
 *   const [albedo, normal, roughness] = useWorldTexture([
 *     './textures/albedo.png',
 *     './textures/normal.png',
 *     './textures/roughness.png',
 *   ])
 *
 *   return (
 *     <meshStandardMaterial
 *       map={albedo}
 *       normalMap={normal}
 *       roughnessMap={roughness}
 *     />
 *   )
 * }
 * ```
 */
export const useWorldTexture = <T extends string | string[]>(
  relativePath: T
): ReturnType<typeof useTexture<T>> => {
  const { baseUrl } = useWorldBaseUrl()

  // 配列の場合は各要素を変換、文字列の場合はそのまま変換
  const absolutePath = Array.isArray(relativePath)
    ? relativePath.map((path) => resolveAssetPath(baseUrl, path))
    : resolveAssetPath(baseUrl, relativePath)

  return useTexture(absolutePath as T)
}

/**
 * プリロード用: GLTFをプリロードする
 *
 * コンポーネントがレンダリングされる前にアセットをプリロードしたい場合に使用します。
 *
 * @param baseUrl - ベースURL
 * @param relativePath - GLTFファイルの相対パス
 *
 * @example
 * ```typescript
 * // ワールドの初期化時にプリロード
 * preloadWorldGLTF('https://cdn.example.com/worlds/my-world/', './models/scene.gltf')
 * ```
 */
export const preloadWorldGLTF = (baseUrl: string, relativePath: string): void => {
  const absolutePath = resolveAssetPath(baseUrl, relativePath)
  useGLTF.preload(absolutePath)
}

/**
 * プリロード用: テクスチャをプリロードする
 *
 * コンポーネントがレンダリングされる前にアセットをプリロードしたい場合に使用します。
 *
 * @param baseUrl - ベースURL
 * @param relativePath - テクスチャファイルの相対パス、または相対パスの配列
 *
 * @example
 * ```typescript
 * // ワールドの初期化時にプリロード
 * preloadWorldTexture('https://cdn.example.com/worlds/my-world/', './textures/albedo.png')
 * ```
 */
export const preloadWorldTexture = (
  baseUrl: string,
  relativePath: string | string[]
): void => {
  const absolutePath = Array.isArray(relativePath)
    ? relativePath.map((path) => resolveAssetPath(baseUrl, path))
    : resolveAssetPath(baseUrl, relativePath)

  useTexture.preload(absolutePath)
}
