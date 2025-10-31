/**
 * 開発環境用エントリーポイント
 *
 * ローカル開発時（npm run dev）に使用されます。
 * 本番ビルド（npm run build）では使用されません。
 */

import { XRiftProvider } from '@xrift/world-components'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { OrbitControls } from '@react-three/drei'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { World } from './World'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    {/* 開発環境用のProvider - ベースパスを指定 */}
    <XRiftProvider baseUrl="/">
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas
          shadows
          camera={{ position: [0, 5, 10], fov: 75 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <OrbitControls />
          <Physics>
            <World />
          </Physics>
        </Canvas>
      </div>
    </XRiftProvider>
  </StrictMode>
)
