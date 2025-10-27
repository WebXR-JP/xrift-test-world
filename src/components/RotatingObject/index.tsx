import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, Mesh } from 'three'

interface RotatingObjectProps {
  radius?: number
  speed?: number
  height?: number
  scale?: number
}

export const RotatingObject: React.FC<RotatingObjectProps> = ({
  radius = 4,
  speed = 1,
  height = 2,
  scale = 1,
}) => {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      // 円軌道で回転
      groupRef.current.rotation.y += delta * speed * 0.5
    }
    if (meshRef.current) {
      // オブジェクト自体も回転
      meshRef.current.rotation.x += delta * speed * 2
      meshRef.current.rotation.y += delta * speed * 3
    }
  })

  return (
    <group ref={groupRef}>
      <group position={[radius * scale, height * scale, 0]}>
        {/* 光る球体 */}
        <mesh ref={meshRef} castShadow>
          <octahedronGeometry args={[0.5 * scale, 0]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* ポイントライト */}
        <pointLight
          color="#00ffff"
          intensity={2}
          distance={10 * scale}
          decay={2}
        />
      </group>
    </group>
  )
}
