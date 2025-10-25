import { Physics } from '@react-three/rapier'

export function CanvasProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <Physics>{children}</Physics>
}
