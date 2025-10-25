export interface Props {
  position?: [number, number, number]
  scale?: number
}

export interface WorldObject {
  position: [number, number, number]
  scale: [number, number, number]
  color: string
  geometry: 'box' | 'cylinder' | 'sphere' | 'plane'
}
