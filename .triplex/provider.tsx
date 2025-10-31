import { Physics } from '@react-three/rapier'
import { XRiftDevProvider } from '../src/utils/XRiftDevProvider'

export function CanvasProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <XRiftDevProvider baseUrl="/public">
      <Physics>{children}</Physics>
    </XRiftDevProvider>
  )
}
