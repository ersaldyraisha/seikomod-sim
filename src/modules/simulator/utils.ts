export type CategoryId = 'case' | 'dial' | 'hands' | 'bezel' | 'insert' | 'chapter' | 'strap' 

export const categoryIds : Array<CategoryId> = ['case' , 'dial' , 'bezel' , 'insert' , 'chapter' , 'strap', 'hands']

export function getCategories() {
  return [
    { id: 'case', name: 'Case' },
    { id: 'dial', name: 'Dial' },
    { id: 'hands', name: 'Hands' },
    { id: 'bezel', name: 'Bezel' },
    { id: 'insert', name: 'Bezel Insert' },
    { id: 'chapter', name: 'Chapter Ring' },
    { id: 'strap', name: 'Strap' }
  ] as Array<{
    id: CategoryId,
    name: string
  }>
}

export type Item = {
  id: string
  name: string
  src: string
  description: string
  compatibility: Array<string>
  type: CategoryId
  dialDiameter?: number
}

type Items = {
  case: Array<Item>
  dial: Array<Item>
  hands: Array<Item>
  bezel: Array<Item>
  insert: Array<Item>
  chapter: Array<Item>
  strap: Array<Item>
}

const items : Items = {
  case: [
    {
      id: '4r36-01e0',
      name: '4R36-01E0',
      src: 'https://seikonator.web.app/assets/cases/4r36-01e0.png',
      description: 'Diameter - 39mm',
      compatibility: ['4r36-01e0'],
      type: 'case',
      dialDiameter: 28.5
    },
    {
      id: '4r36-07w4',
      name: '4R36-07W4',
      src: 'https://seikonator.web.app/assets/cases/4r36-07w4.png',
      description: 'Diameter - 39mm',
      compatibility: ['4r36-07w4'],
      type: 'case',
      dialDiameter: 28.5
    }
  ],
  dial: [
    {
      id: 'srpe55',
      name: 'SRPE55',
      src: 'https://seikonator.web.app/assets/dials/srpe55.png',
      description: 'Diameter - 28.5mm',
      compatibility: [],
      type: 'dial',
      dialDiameter: 28.5
    }
  ],
  hands: [
    {
      id: 'srpe55',
      name: 'SRPE55',
      src: 'https://seikonator.web.app/assets/hands/srpe55.png',
      description: 'Suitable dial - 28.5mm',
      compatibility: [],
      type: 'hands',
      dialDiameter: 28.5
    }
  ],
  bezel: [],
  insert: [],
  chapter: [
    {
      id: 'srp269',
      name: 'SRP269',
      src: 'https://seikonator.web.app/assets/chapters/srp269.png',
      description: 'Model - SRP269',
      compatibility: ['4r36-01e0'],
      type: 'chapter'
    },
    {
      id: 'srp301',
      name: 'SRP301',
      src: 'https://seikonator.web.app/assets/chapters/srp301.png',
      description: 'Model - SRP301',
      compatibility: ['4r36-01e0'],
      type: 'chapter'
    },
    {
      id: 'srpe55',
      name: 'SRPE55',
      src: 'https://seikonator.web.app/assets/chapters/srpe55.png',
      description: 'Model - SRPE55',
      compatibility: ['4r36-07w4'],
      type: 'chapter'
    }
  ],
  strap: []
}

export function getItems(categoryId: CategoryId, caseId: string | undefined) {
  if (!categoryId) return []
  return items[categoryId].filter((item) => {
    if(item.type === 'case') return true
    if(!caseId) return false
    if(!item.dialDiameter && item.compatibility.includes(caseId)) return true
    if(item.dialDiameter === items.case.find((item) => item.id === caseId)?.dialDiameter) return true
    return false
  })
}