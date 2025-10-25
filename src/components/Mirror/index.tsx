import { useThree } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { Group, PlaneGeometry } from 'three'
import { Reflector } from 'three/addons/objects/Reflector.js'
import { Props } from './types'

export function Mirror({
  position = [0, 2.5, -9],
  rotation = [0, 0, 0],
  size = [8, 5],
}: Props) {
  const groupRef = useRef<Group>(null)
  const reflectorRef = useRef<Reflector | null>(null)
  const { gl } = useThree()

  useEffect(() => {
    const currentGroup = groupRef.current
    if (!currentGroup) return

    const geometry = new PlaneGeometry(size[0], size[1])

    const reflector = new Reflector(geometry, {
      clipBias: 0.003,
      textureWidth: 512,
      textureHeight: 512,
      color: 0xcccccc,
      multisample: 0, // Meta Quest (Android Chrome) でのレンダリング不具合回避のため無効化
    })

    reflector.position.set(0, 0, 0)
    currentGroup.add(reflector)
    reflectorRef.current = reflector

    return () => {
      if (currentGroup && reflector) {
        currentGroup.remove(reflector)
        reflector.dispose?.()
      }
      reflectorRef.current = null
    }
  }, [size, gl])

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* 鏡の物理コライダー（薄い箱として扱う） */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, 0, -0.05]} visible={false}>
          <boxGeometry args={[size[0], size[1], 0.1]} />
        </mesh>
      </RigidBody>

      {/* 鏡のフレーム */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[size[0] + 0.2, size[1] + 0.2, 0.15]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}
