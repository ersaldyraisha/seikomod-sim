import classNames from 'classnames'
import resetIcon from '../../../assets/images/icon-reset.png'
import infoIcon from '../../../assets/images/icon-info.png'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getItems, getCategories, categoryIds, Item } from '../utils'
import { useSimulator } from '../store'

function Simulator() {
  const isDarkMode = useSimulator(state => state.isDarkMode)
  
  return (
    <div className={classNames(
      'h-[100vh] overflow-hidden',
      {'bg-zinc-800 !text-zinc-200': isDarkMode}
    )}>
      <Navbar/>
      <Result />
      <Items />
      <Category />
    </div>  
  )
}

function Category() {
  const navItems = getCategories()
  const isDarkMode = useSimulator(state => state.isDarkMode)
  const activeNavId = useSimulator(state => state.activeCategoryId)
  const activeItems = useSimulator(state => state.activeItems)
  const setActiveNav = useSimulator(state => state.setActiveCategory)
  const resetActiveItems = useSimulator(state => state.resetActiveItems)
  
  const renderedNavItems = navItems.map(nav => (
    <li key={nav.id}>
      <button
        className={
          classNames(
            'relative px-3 py-1 rounded-full text-black font-bold cursor-pointer whitespace-nowrap',
            { 'outline:animate-ping': true},
            { 'bg-blue-600 !text-white': activeNavId === nav.id },
            { '!text-zinc-200': isDarkMode}
          )
        }
        onClick={() => {
          if(activeNavId !== nav.id) setActiveNav(nav.id)
          else setActiveNav('')
        }}
      >
        {nav.name}
        {nav.id === 'case' && !activeItems.case && activeNavId !== 'case' && (
          <div className={classNames(
            'absolute top-0 left-0 w-full h-full rounded-full bg-blue-400 opacity-50 animate-ping',
            {'!bg-white': isDarkMode}
            )}
          />
        )}
        {activeItems[nav.id] && (
          <AnimatePresence>
            <motion.div 
              className="absolute top-0 right-[-2px] w-[8px] h-[8px] rounded-full bg-red-600"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            />
          </AnimatePresence>
        )}
      </button>
    </li>
  ))
  
  return(
    <nav className="fixed bottom-0 left-1/2 z-10 pb-10 pt-7 translate-x-[-50%]">
      <ul className={classNames(
        'flex justify-center bg-zinc-200 gap-[20px] rounded-full p-2 mx-auto',
        { '!bg-zinc-900': isDarkMode }
      )}>
        {renderedNavItems}
      </ul>
      {!!activeItems.case && (
        <>
          <button className="absolute top-8 left-full ml-5 w-10 h-10 p-2 rounded-full bg-zinc-700" onClick={() => resetActiveItems()}>
            <img src={resetIcon} alt="reset" />
          </button>
          <Tooltip/>
        </>
      )}
    </nav>
  )
}

function Tooltip() {
  const [isActive, setActive] = useState(false)
  const activeItems = useSimulator(state => state.activeItems)
  const isDarkMode = useSimulator(state => state.isDarkMode)

  const itemsList = categoryIds
    .filter((item) => !!activeItems[item])
    .map((item) => {
      return (
        <li className="mb-2 last:mb-0">
          <p className="text-xs">{`${item[0].toUpperCase()}${item.substring(1)}`}</p>
          <p className="text-sm font-bold">{activeItems[item]?.name}</p>
        </li>
      )
    })

  return (
    <button 
      className="absolute top-8 right-full mr-5 w-10 h-10 p-2 rounded-full bg-zinc-700"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <AnimatePresence>
        {isActive && (
          <motion.ul
            className={classNames(
              'absolute bottom-[calc(100%+10px)] left-1/2 min-w-[120px] p-3 text-left bg-zinc-200 text-red rounded-lg cursor-default pointer-events-none',
              { '!bg-zinc-700' : isDarkMode }
            )}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {itemsList}
          </motion.ul>
        )}
      </AnimatePresence>
      <img src={infoIcon} alt="reset" />
    </button>
  )
}

function Items() {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Array<Item>>([])
  
  const isDarkMode = useSimulator(state => state.isDarkMode)
  const activeCategoryId = useSimulator(state => state.activeCategoryId)
  const activeItems = useSimulator(state => state.activeItems)
  const setActiveItem = useSimulator(state => state.setActiveItem)
  const removeActiveItem = useSimulator(state => state.removeActiveItem)
  const filterUncompatibleItems = useSimulator(state => state.filterUncompatibleItems)

  useEffect(() => {
    if(activeCategoryId) {
      const newItems = getItems(activeCategoryId, activeItems.case?.id)
      setItems(newItems)
    } else {
      setItems([])
    }
  }, [activeCategoryId, activeItems])

  function handleItemSelect(item: Item) {
    setActiveItem(item)
    if(item.type === 'case') {
      filterUncompatibleItems()
    }
  }
  
  const renderedItems = items.slice((page - 1) * 7, page * 7)
    .map((item) => {
      const isSelected = item.id === activeItems[activeCategoryId || 'case']?.id
      return (
        <motion.li
          key={`${item.type}-${item.id}`}
          className={classNames(
            'flex flex-col shrink-0 relative py-2 rounded-lg text-center cursor-pointer w-[165px] transition-colors',
            { 'bg-blue-600 text-white': isSelected }
          )}
          onClick={() => handleItemSelect(item)}
          initial={{ y: 25, opacity: 0, scale: 0.9}}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 25, opacity: 0}}
          >
          <img className="pointer-events-none" src={item?.src} alt={item?.name} />
          <p className="font-bold">{item?.name}</p>
          <p className="text-sm">{item?.description}</p>
          { isSelected && (
            <button
              className="absolute top-0 right-2 text-2xl"
              onClick={(e) => {
                e.stopPropagation()
                removeActiveItem(item.type)
                if(item.type === 'case') filterUncompatibleItems()
              }}
            >
              &times;
            </button>
          )}
        </motion.li>
      )
    })

  const isPrevActive = page > 1
  const isNextActive = page < (items?.length ?? 0) / 7

  return ( 
    <AnimatePresence>
      { activeCategoryId && (
        <motion.div 
          className={classNames(
            'flex justify-center items-center gap-3 fixed bottom-[105px] pt-4 w-full min-h-[242px] border-t border-t-zinc-200 bg-white',
            { '!border-t-zinc-700 !bg-zinc-800': isDarkMode }
          )}
          initial={{ y: 250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 250, opacity: 0 }}
          >
          <button
            className="px-[20px] text-7xl text-zinc-400 font-light disabled:opacity-20"
            disabled={!isPrevActive}
            onClick={() => { if(isPrevActive) setPage(page - 1)}}
          >
            &lsaquo;
          </button>
          
          <ul className="flex gap-2 justify-center w-[1200px]">
            {renderedItems.length > 0 ? renderedItems : activeItems.case 
            ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-center"
              >
                No items.
              </motion.p>
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-center"
              >
                Select case first.
              </motion.p>
            )}
          </ul>

          <button
            className="px-[20px] text-7xl text-zinc-400 font-light disabled:opacity-20"
            disabled={!isNextActive}
            onClick={() => { if(isNextActive) setPage(page + 1) }}
          >
            &rsaquo;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Result() {
  const activeItems = useSimulator(state => state.activeItems)
  const activeCategoryId = useSimulator(state => state.activeCategoryId)

  const renderedResult = categoryIds.map(id => activeItems[id] ? (
    <motion.img
      key={`result-${id}`} className='absolute inset w-full' src={activeItems[id]?.src} alt="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  ) : null)
  
  return (
    <motion.div
      className="flex items-center justify-center fixed left-1/2 top-1/2"
      initial={{
        translateY: '-50%',
        translateX: '-50%'
      }}
      animate={!!activeCategoryId ? 'open' : 'closed'}
      variants={{
        open: { opacity: 1, y: -150 },
        closed: { opacity: 1, y: 0 },
      }}
    >
      <div className="relative w-[450px] h-[450px]">
        {activeItems.case
          && <div className="absolute inset w-[300px] h-[300px] top-[calc(50%-150px)] left-[calc(50%-150px)] bg-gray-500 rounded-full" />}
        <AnimatePresence>
          {renderedResult}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function Navbar() {
  const isDarkMode = useSimulator(state => state.isDarkMode)
  const toggleDarkMode = useSimulator(state => state.toggleDarkMode)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleDarkMode(true)
    }
  }, [])

  return (
    <div className="fixed w-full">
      <div className="flex justify-between pt-8 mx-auto w-[1200px]">
        <h1 className={classNames(
          'self-start font-title text-blue-600',
          { '!text-zinc-200': isDarkMode }
        )}>
          <span className='block text-xl leading-none'>
            The
          </span> 
          <span className='block text-5xl font-black leading-none tracking-tight'>
            Seikonator
          </span> 
        </h1>
        <button onClick={() => toggleDarkMode()}>
          <div className={classNames(
            'flex bg-zinc-200 p-1 rounded-full w-[45px]',
            {'!bg-blue-600': !isDarkMode},
          )}>
            <motion.div
              animate={isDarkMode ? 'off' : 'on'}
              variants={{
                on: { x: 20 },
                off: { x: 0 }
              }}
              className={classNames(
                'w-4 h-4 bg-white rounded-full',
                {'!bg-black': isDarkMode}
              )}
            />
          </div>
        </button>
      </div>
    </div>
  )
}

export { Simulator }