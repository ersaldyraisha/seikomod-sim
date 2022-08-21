export type CategoryId = 'case' | 'dial' | 'hands' | 'bezel' | 'insert' | 'chapter' | 'strap' 

export type Item = {
  id: string
  name: string
  src: string
  description: string
  compatibility: Array<string>
  type: CategoryId
  dialDiameter?: number
  crownPosition?: 3 | 4
}

export type Items = {
  case: Array<Item>
  dial: Array<Item>
  hands: Array<Item>
  bezel: Array<Item>
  insert: Array<Item>
  chapter: Array<Item>
  strap: Array<Item>
}