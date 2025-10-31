import { WorldBaseUrlContext } from './useXRift'

/**
 * 開発環境用のXRift Context Provider
 *
 * ローカル開発時にフロントエンド側のContextをシミュレートするためのProvider。
 * 本番環境ではフロントエンド側からこのContextが注入されるため、このProviderは不要です。
 *
 * @example
 * ```tsx
 * // src/index.tsx での使用例
 * import { XRiftDevProvider } from './utils/XRiftDevProvider'
 * import { World } from './World'
 *
 * function App() {
 *   return (
 *     <XRiftDevProvider baseUrl="/public">
 *       <World />
 *     </XRiftDevProvider>
 *   )
 * }
 * ```
 */

export interface XRiftDevProviderProps {
  /**
   * アセットのベースパス
   * ローカル開発時は通常 "/public" や "http://localhost:3000/assets" などを指定
   */
  baseUrl: string
  children: React.ReactNode
}

/**
 * 開発環境用のXRift Context Provider コンポーネント
 */
export const XRiftDevProvider: React.FC<XRiftDevProviderProps> = ({
  baseUrl,
  children,
}) => {
  return (
    <WorldBaseUrlContext.Provider value={{ baseUrl }}>
      {children}
    </WorldBaseUrlContext.Provider>
  )
}
