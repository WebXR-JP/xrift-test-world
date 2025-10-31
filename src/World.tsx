import { RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { Mesh } from 'three'
import { Duck } from './components/Duck'
import { Mirror } from './components/Mirror'
import { RotatingObject } from './components/RotatingObject'
import { Skybox } from './components/Skybox'
import { COLORS, WORLD_CONFIG } from './constants'

export interface WorldProps {
  position?: [number, number, number]
  scale?: number
}

export const World: React.FC<WorldProps> = ({ position = [0, 0, 0], scale = 1 }) => {
  const groundRef = useRef<Mesh>(null)
  const worldSize = WORLD_CONFIG.size * scale
  const wallHeight = WORLD_CONFIG.wallHeight * scale
  const wallThickness = WORLD_CONFIG.wallThickness * scale

  return (
    <group position={position} scale={scale}>
      {/* Skybox - 360度パノラマ背景 */}
      <Skybox radius={500} />

      {/* 照明設定 */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
      />

      {/* 地面 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[worldSize, worldSize]} />
          <meshLambertMaterial color={COLORS.ground} />
        </mesh>
      </RigidBody>

      {/* 壁1 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[worldSize / 2, wallHeight / 2, 0]} castShadow>
          <boxGeometry args={[wallThickness, wallHeight, worldSize]} />
          <meshLambertMaterial color={COLORS.wall} />
        </mesh>
      </RigidBody>

      {/* 壁2 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[-worldSize / 2, wallHeight / 2, 0]} castShadow>
          <boxGeometry args={[wallThickness, wallHeight, worldSize]} />
          <meshLambertMaterial color={COLORS.wall} />
        </mesh>
      </RigidBody>

      {/* 壁3 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[0, wallHeight / 2, worldSize / 2]} castShadow>
          <boxGeometry args={[worldSize, wallHeight, wallThickness]} />
          <meshLambertMaterial color={COLORS.wall} />
        </mesh>
      </RigidBody>

      {/* 壁4 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[0, wallHeight / 2, -worldSize / 2]} castShadow>
          <boxGeometry args={[worldSize, wallHeight, wallThickness]} />
          <meshLambertMaterial color={COLORS.wall} />
        </mesh>
      </RigidBody>

      {/* いくつかの装飾オブジェクト */}
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[3 * scale, 1 * scale, 3 * scale]} castShadow>
          <boxGeometry args={[2 * scale, 2 * scale, 2 * scale]} />
          <meshLambertMaterial color={COLORS.decorations.box} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[-3 * scale, 0.5 * scale, -3 * scale]} castShadow>
          <cylinderGeometry args={[1 * scale, 1 * scale, 1 * scale]} />
          <meshLambertMaterial color={COLORS.decorations.cylinder} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="ball" restitution={0} friction={0}>
        <mesh position={[5 * scale, 1.5 * scale, -5 * scale]} castShadow>
          <sphereGeometry args={[1.5 * scale]} />
          <meshLambertMaterial color={COLORS.decorations.sphere} />
        </mesh>
      </RigidBody>

      {/* 照明用のポール */}
      <RigidBody type="fixed" colliders="hull" restitution={0} friction={0}>
        <mesh position={[0, 4 * scale, 0]} castShadow>
          <cylinderGeometry args={[0.1 * scale, 0.1 * scale, 8 * scale]} />
          <meshLambertMaterial color={COLORS.lightPost} />
        </mesh>
      </RigidBody>

      {/* デバッグ用段差テストオブジェクト */}

      {/* 0.1mの低い段差 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[-6 * scale, 0.05 * scale, 2 * scale]} castShadow>
          <boxGeometry args={[2 * scale, 0.1 * scale, 1 * scale]} />
          <meshLambertMaterial color="#00FF00" />
        </mesh>
      </RigidBody>

      {/* 0.2mの段差（設定上限） */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[-6 * scale, 0.1 * scale, 0 * scale]} castShadow>
          <boxGeometry args={[2 * scale, 0.2 * scale, 1 * scale]} />
          <meshLambertMaterial color="#FFFF00" />
        </mesh>
      </RigidBody>

      {/* 0.3mの少し高い段差 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[-6 * scale, 0.15 * scale, -2 * scale]} castShadow>
          <boxGeometry args={[2 * scale, 0.3 * scale, 1 * scale]} />
          <meshLambertMaterial color="#FF8800" />
        </mesh>
      </RigidBody>

      {/* 0.5mの高い段差 */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[-6 * scale, 0.25 * scale, -4 * scale]} castShadow>
          <boxGeometry args={[2 * scale, 0.5 * scale, 1 * scale]} />
          <meshLambertMaterial color="#FF0000" />
        </mesh>
      </RigidBody>

      {/* 階段状のオブジェクト */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[6 * scale, 0.05 * scale, 3 * scale]} castShadow>
          <boxGeometry args={[1 * scale, 0.1 * scale, 1 * scale]} />
          <meshLambertMaterial color="#00FFFF" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[6 * scale, 0.15 * scale, 2 * scale]} castShadow>
          <boxGeometry args={[1 * scale, 0.3 * scale, 1 * scale]} />
          <meshLambertMaterial color="#00FFFF" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[6 * scale, 0.25 * scale, 1 * scale]} castShadow>
          <boxGeometry args={[1 * scale, 0.5 * scale, 1 * scale]} />
          <meshLambertMaterial color="#00FFFF" />
        </mesh>
      </RigidBody>

      {/* 狭い隙間テスト */}
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[2 * scale, 1 * scale, -6 * scale]} castShadow>
          <boxGeometry args={[0.3 * scale, 2 * scale, 2 * scale]} />
          <meshLambertMaterial color="#FF00FF" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0} friction={0}>
        <mesh position={[3.2 * scale, 1 * scale, -6 * scale]} castShadow>
          <boxGeometry args={[0.3 * scale, 2 * scale, 2 * scale]} />
          <meshLambertMaterial color="#FF00FF" />
        </mesh>
      </RigidBody>

      {/* 鏡 - ワールドの中央に配置 */}
      <Mirror
        position={[0, 1.2 * scale, -9.5]}
        size={[2 * scale, 2 * scale]}
      />

      {/* アニメーション: ぐるぐる回るオブジェクト */}
      <RotatingObject
        radius={4}
        speed={1}
        height={2}
        scale={scale}
      />

      {/* Duck 3Dモデル - useXRiftの使用例 */}
      <RigidBody type="dynamic" colliders="cuboid" restitution={0} friction={0}>
        <Duck position={[-2, 0.5, 0]} scale={1} />
      </RigidBody>
    </group>
  )
}
