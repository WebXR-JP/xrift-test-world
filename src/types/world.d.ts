/**
 * XRiftフロントエンドから注入されるReact Contextの型定義
 *
 * Module Federationにより、フロントエンドとワールドで同じReactインスタンスを共有するため、
 * Contextも自動的に共有されます。
 */

/**
 * ワールドのベースURLを提供するContextの値の型
 *
 * @property baseUrl - ワールドアセットのベースURL（CDNのURL等）
 *
 * @example
 * ```typescript
 * // フロントエンド側で設定される値の例
 * const contextValue: WorldBaseUrlContextValue = {
 *   baseUrl: 'https://cdn.example.com/worlds/my-world/'
 * }
 * ```
 */
export interface WorldBaseUrlContextValue {
  /**
   * ワールドアセットのベースURL
   * 相対パスをこのベースURLと結合して絶対パスに変換します
   */
  baseUrl: string
}
