import {Items, CategoryId} from './types'

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

const items : Items = {
  case: [
    {
      id: '7s26-002r',
      name: '7S26-002R',
      src: 'https://seikonator.web.app/assets/cases/7s26-002r.png',
      description: 'Model - SKX',
      compatibility: ['7s26-002r'],
      type: 'case',
      dialDiameter: 28.5
    },
    {
      id: '4r36-07e4',
      name: '4R36-07E4',
      src: 'https://seikonator.web.app/assets/cases/4r36-07e4.png',
      description: 'Model - SRPD',
      compatibility: ['4r36-07e4'],
      type: 'case',
      dialDiameter: 28.5
    },
    {
      id: '4r36-07e4-b',
      name: '4R36-07E4 (B)',
      src: 'https://seikonator.web.app/assets/cases/4r36-07e4-b.png',
      description: 'Model - SRPD',
      compatibility: ['4r36-07e4'],
      type: 'case',
      dialDiameter: 28.5
    },
    {
      id: '4r36-04y0',
      name: '4R36-04Y0',
      src: 'https://seikonator.web.app/assets/cases/4r36-04y0.png',
      description: 'Model - SRP Turtle',
      compatibility: ['4r36-04y0'],
      type: 'case',
      dialDiameter: 28.5
    },
    {
      id: '4r36-07w4',
      name: '4R36-07W4',
      src: 'https://seikonator.web.app/assets/cases/4r36-07w4.png',
      description: 'Model - SRPE5X',
      compatibility: ['4r36-07w4'],
      type: 'case',
      dialDiameter: 28.5
    },
    {
      id: '4r36-07w4-b',
      name: '4R36-07W4 (B)',
      src: 'https://seikonator.web.app/assets/cases/4r36-07w4-b.png',
      description: 'Model - SRPE69',
      compatibility: ['4r36-07w4'],
      type: 'case',
      dialDiameter: 28.5
    },
    {
      id: '7s26-02j0',
      name: '7S26-02J0',
      src: 'https://seikonator.web.app/assets/cases/7s26-02j0.png',
      description: 'Model - SNK78x/80x',
      compatibility: ['7s26-02j0'],
      type: 'case',
      dialDiameter: 28.5
    },
    {
      id: '4r36-01e0',
      name: '4R36-01E0',
      src: 'https://seikonator.web.app/assets/cases/4r36-01e0.png',
      description: 'Model - SRP2xx/30x',
      compatibility: ['4r36-01e0'],
      type: 'case',
      dialDiameter: 28.5
    },
  ],
  dial: [
    {
      id: 'skx007',
      name: 'SKX007',
      src: 'https://seikonator.web.app/assets/dials/skx007.png',
      description: '⌀ 28.5mm',
      compatibility: [],
      type: 'dial',
      dialDiameter: 28.5
    },
    {
      id: 'srpe55',
      name: 'SRPE55',
      src: 'https://seikonator.web.app/assets/dials/srpe55.png',
      description: '⌀ 28.5mm',
      compatibility: [],
      type: 'dial',
      dialDiameter: 28.5
    },
    {
      id: 'srpe69',
      name: 'SRPE69',
      src: 'https://seikonator.web.app/assets/dials/srpe69.png',
      description: '⌀ 28.5mm',
      compatibility: [],
      type: 'dial',
      dialDiameter: 28.5
    },
    {
      id: 'srpd55',
      name: 'SRPD55',
      src: 'https://seikonator.web.app/assets/dials/srpd55.png',
      description: '⌀ 28.5mm',
      compatibility: [],
      type: 'dial',
      dialDiameter: 28.5
    },
    {
      id: 'srpd79',
      name: 'SRPD79',
      src: 'https://seikonator.web.app/assets/dials/srpd79.png',
      description: '⌀ 28.5mm',
      compatibility: [],
      type: 'dial',
      dialDiameter: 28.5
    },
    {
      id: 'srp777',
      name: 'SRP777',
      src: 'https://seikonator.web.app/assets/dials/srp777.png',
      description: '⌀ 28.5mm',
      compatibility: [],
      type: 'dial',
      dialDiameter: 28.5
    },
    {
      id: 'snk809',
      name: 'SNK809',
      src: 'https://seikonator.web.app/assets/dials/snk809.png',
      description: '⌀ 28.5mm',
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
    },
    {
      id: 'srpe69',
      name: 'SRPE69',
      src: 'https://seikonator.web.app/assets/hands/srpe69.png',
      description: 'Suitable dial - 28.5mm',
      compatibility: [],
      type: 'hands',
      dialDiameter: 28.5
    },
    {
      id: 'srpd79',
      name: 'SRPD79',
      src: 'https://seikonator.web.app/assets/hands/srpd79.png',
      description: 'Suitable dial - 28.5mm',
      compatibility: [],
      type: 'hands',
      dialDiameter: 28.5
    },
    {
      id: 'skx007',
      name: 'SKX/SRPD/SRP7xx',
      src: 'https://seikonator.web.app/assets/hands/srp777.png',
      description: 'Suitable dial - 28.5mm',
      compatibility: [],
      type: 'hands',
      dialDiameter: 28.5
    },
    {
      id: 'snk809',
      name: 'SNK809',
      src: 'https://seikonator.web.app/assets/hands/snk809.png',
      description: 'Suitable dial - 28.5mm',
      compatibility: [],
      type: 'hands',
      dialDiameter: 28.5
    },
  ],
  bezel: [],
  insert: [
    {
      id: 'skx007',
      name: 'SKX007',
      src: 'https://seikonator.web.app/assets/inserts/skx007.png',
      description: 'Model - SKX007',
      compatibility: ['7s26-002r', '4r36-07e4'],
      type: 'insert',
    },
    {
      id: 'srpd55',
      name: 'SRPD55',
      src: 'https://seikonator.web.app/assets/inserts/srpd55.png',
      description: 'Model - SRPD55',
      compatibility: ['7s26-002r', '4r36-07e4'],
      type: 'insert',
    },
    {
      id: 'srpd79',
      name: 'SRPD79',
      src: 'https://seikonator.web.app/assets/inserts/srpd79.png',
      description: 'Model - SRPD79',
      compatibility: ['7s26-002r', '4r36-07e4'],
      type: 'insert',
    },
    {
      id: 'srp777',
      name: 'SRP777',
      src: 'https://seikonator.web.app/assets/inserts/srp777.png',
      description: 'Model - SRP777',
      compatibility: ['4r36-04y0'],
      type: 'insert',
    }
  ],
  chapter: [
    {
      id: 'skx007',
      name: 'SKX007',
      src: 'https://seikonator.web.app/assets/chapters/skx007.png',
      description: 'Model - SKX007/SRPD',
      compatibility: ['7s26-002r', '4r36-07e4'],
      type: 'chapter'
    },
    {
      id: 'srpe55',
      name: 'SRPE55',
      src: 'https://seikonator.web.app/assets/chapters/srpe55.png',
      description: 'Model - SRPE55',
      compatibility: ['4r36-07w4'],
      type: 'chapter'
    },
    {
      id: 'srpe69',
      name: 'SRPE69',
      src: 'https://seikonator.web.app/assets/chapters/srpe69.png',
      description: 'Model - SRPE69',
      compatibility: ['4r36-07w4'],
      type: 'chapter'
    },
    {
      id: 'srp777',
      name: 'SRP777',
      src: 'https://seikonator.web.app/assets/chapters/srp777.png',
      description: 'Model - SRP777',
      compatibility: ['4r36-04y0'],
      type: 'chapter'
    },
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