import { XRiftProvider } from '@xrift/world-components'
import { Physics } from '@react-three/rapier'

export function CanvasProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <XRiftProvider baseUrl="/">
      <Physics>{children}</Physics>
    </XRiftProvider>
  )
}
