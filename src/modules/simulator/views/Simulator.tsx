// TODO: use API for data call?

import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { getItems, getCategories, categoryIds } from '../utils'
import { useSimulator } from '../store'
import { Item } from '../types'
import resetIcon from '../../../assets/images/icon-reset.png'
import infoIcon from '../../../assets/images/icon-info.png'
import checkIcon from '../../../assets/images/icon-check.svg'
import chevronIcon from '../../../assets/images/icon-chevron-down.png'
import resultPlaceholderDark from '../../../assets/images/placeholder-white.png'
import resultPlaceholderLight from '../../../assets/images/placeholder-gray.png'

function Simulator() {
  const isDarkMode = useSimulator(state => state.isDarkMode)
  
  return (
    <div className={classNames(
      'h-[100vh] overflow-hidden',
      {'bg-zinc-800 !text-zinc-200': isDarkMode}
    )}>
      <Navbar/>
      <Result />
      <Parts />
      <Category />
    </div>  
  )
}

function Category() {
  const navItems = getCategories()
  const isDarkMode = useSimulator(state => state.isDarkMode)
  const activeCategoryId = useSimulator(state => state.activeCategoryId)
  const activeItems = useSimulator(state => state.activeItems)
  const setActiveCategory = useSimulator(state => state.setActiveCategory)
  
  const renderedNavItems = navItems.map(nav => (
    <li key={nav.id}>
      <button
        className={
          classNames(
            'relative px-3 py-1 rounded-full md:bg-transparent text-black font-bold cursor-pointer whitespace-nowrap',
            { 'outline:animate-ping': true},
            { '!bg-blue-600 !text-white': activeCategoryId === nav.id },
            { 'bg-zinc-200': !isDarkMode},
            { 'bg-zinc-900 !text-zinc-200': isDarkMode}
          )
        }
        onClick={() => {
          if(activeCategoryId !== nav.id) setActiveCategory(nav.id)
          else setActiveCategory('')
        }}
      >
        {nav.name}
        {nav.id === 'case' && !activeItems.case && activeCategoryId !== 'case' && (
          <div className={classNames(
            'absolute top-0 left-0 w-full h-full rounded-full bg-blue-400 opacity-50 animate-ping',
            {'!bg-white': isDarkMode}
            )}
          />
        )}
        {activeItems[nav.id] && (
          <img className="absolute top-0 right-[-2px] w-[12px] h-[12px]" src={checkIcon} alt="checked" />
        )}
      </button>
    </li>
  ))

  return(
    <nav className="fixed bottom-2 left-1/2 z-10 md:pb-10 mt-7 translate-x-[-50%] max-w-full md:max-w-[90%]">
      <ul className={classNames(
        'flex gap-[5px] md:rounded-full px-5 py-2 md:p-2 mx-auto overflow-x-auto overflow-y-hidden',
        'md:gap-[10px] md:bg-zinc-200 md:justify-center',
        { 'md:bg-zinc-900': isDarkMode }
      )}>
        {renderedNavItems}
      </ul>
      {!!activeItems.case && (
        <ActionButtons/>
      )}
    </nav>
  )
}

function ActionButtons() {
  const [isActive, setActive] = useState(false)
  const activeItems = useSimulator(state => state.activeItems)
  const isDarkMode = useSimulator(state => state.isDarkMode)
  const resetActiveItems = useSimulator(state => state.resetActiveItems)

  const itemsList = categoryIds
    .filter((item) => !!activeItems[item])
    .map((item) => {
      return (
        <li className="mb-2 last:mb-0" key={`info-${item}-${activeItems[item]?.id}`}>
          <p className="text-xs">{`${item[0].toUpperCase()}${item.substring(1)}`}</p>
          <p className="text-sm font-bold">{activeItems[item]?.name}</p>
        </li>
      )
    })

  return (
    <>
      <button 
        className="absolute left-[calc(50%+5px)] bottom-14 md:top-1 md:left-full md:ml-5 w-10 h-10 p-2 rounded-full bg-zinc-700" 
        onClick={() => resetActiveItems()}
      >
        <img src={resetIcon} alt="reset" />
      </button>
      <button
        className="absolute right-[calc(50%+5px)] bottom-14 md:top-1 md:right-full md:mr-5 w-10 h-10 p-2 rounded-full bg-zinc-700"
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
    </>
  )
}

function Parts() {
  const pageSize = 6
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Array<Item>>([])
  
  const isDarkMode = useSimulator(state => state.isDarkMode)
  const activeCategoryId = useSimulator(state => state.activeCategoryId)
  const activeItems = useSimulator(state => state.activeItems)
  const setActiveItem = useSimulator(state => state.setActiveItem)
  const setActiveCategory = useSimulator(state => state.setActiveCategory)
  const removeActiveItem = useSimulator(state => state.removeActiveItem)
  const filterUncompatibleItems = useSimulator(state => state.filterUncompatibleItems)

  useEffect(() => {
    if(activeCategoryId) {
      const newItems = getItems(activeCategoryId, activeItems.case?.compatibility[0])
      setItems(newItems)
    } else {
      setItems([])
    }
    setPage(1)
  }, [activeCategoryId])

  function handleItemSelect(item: Item) {
    setActiveItem(item)
    if(item.type === 'case') {
      filterUncompatibleItems()
    }
  }

  const renderedItems = items.slice((page - 1) * pageSize, page * pageSize)
    .map((item) => {
      const isSelected = item.id === activeItems[activeCategoryId || 'case']?.id
      return (
        <motion.li
          key={`${item.type}-${item.id}`}
          className={classNames(
            'flex flex-col shrink-0 relative py-2 rounded-lg text-center cursor-pointer w-[110px] md:w-[165px] transition-colors select-none',
            { 'bg-blue-600 text-white': isSelected }
          )}
          onClick={() => handleItemSelect(item)}
          initial={{ y: 25, opacity: 0, scale: 0.9}}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 25, opacity: 0}}
          >
          <img className="pointer-events-none w-full aspect-square" src={item?.src} alt={item?.name} />
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
  const isNextActive = page < (items?.length ?? 0) / pageSize  
  
  function prevPage() {
    if(isPrevActive) setPage(page - 1)
  }
  function nextPage() {
    if(isNextActive) setPage(page + 1)
  }

  const swipeHandler = useSwipeable({
    onSwipedLeft: nextPage,
    onSwipedRight: prevPage,
    onSwipedDown: () => setActiveCategory(''),
    trackMouse: true
  });  

  return ( 
    <AnimatePresence>
      { activeCategoryId && (
        <motion.div
          className={classNames(
            'flex justify-center items-center gap-3 fixed bottom-[110px] pt-4 w-full min-h-[242px] border-t border-t-zinc-200 bg-white',
            { '!border-t-zinc-700 !bg-zinc-800': isDarkMode }
          )}
          initial={{ y: 250, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 250, opacity: 0 }}
          { ...swipeHandler }
        >

          <button
            className="flex items-center justify-center absolute bottom-[calc(100%+10px)] right-1/2 w-8 h-8 p-2 bg-red-500 text-2xl rounded-full text-white translate-x-1/2 md:hidden"
            onClick={() => setActiveCategory('')}
          >
            <img src={chevronIcon} alt="close" />
          </button>

          <button
            className="absolute left-0 top-[calc(100%-3px)] z-10 px-[20px] text-5xl text-zinc-400 font-light disabled:invisible
              md:relative md:text-7xl"
            disabled={!isPrevActive}
            onClick={() => prevPage()}
          >
            &lsaquo;
          </button>
          
          <ul className="flex gap-2 grow justify-center flex-wrap md:flex-nowrap w-5/6 max-w-[1200px]">
            {renderedItems.length > 0 ? renderedItems : activeItems.case 
            ? (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-center select-none"
              >
                No items.
              </motion.li>
            ) : (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-center select-none"
              >
                Select case first.
              </motion.li>
            )}
          </ul>

          <button
            className="absolute right-0 top-[calc(100%-3px)] px-[20px] text-5xl text-zinc-400 font-light disabled:invisible
              md:relative md:text-7xl"
            disabled={!isNextActive}
            onClick={() => nextPage()}
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
  const isDarkMode = useSimulator(state => state.isDarkMode)

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
      className="flex items-center justify-center fixed left-1/2 top-[50vh]"
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
      <div className="relative w-[375px] h-[375px] md:w-[450px] md:h-[450px]">
        {activeItems.case && (
          <div className="absolute top-[calc(50%-125px)] left-[calc(50%-125px)] w-[250px] h-[250px] bg-gray-500 rounded-full
            md:top-[calc(50%-150px)] md:left-[calc(50%-150px)] md:w-[300px] md:h-[300px]" />
        )}
        {!activeItems.case && (
          <>
            <img 
              className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full"
              src={isDarkMode ? resultPlaceholderDark : resultPlaceholderLight } alt="start-customizing" />
            <p className={classNames(
              'absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center font-bold text-gray-400',
              {'!text-white': isDarkMode}
            )}>
              Select a case<br/>and start customizing.
            </p>
          </>
        )}
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
    <div className={classNames(
      'fixed w-full z-10 md:bg-transparent',
      { 'bg-zinc-800': isDarkMode },
      { 'bg-white': !isDarkMode }
    )}>
      <div className="flex justify-between pt-8 pb-2 mx-auto w-5/6 max-w-[1200px]">
        <h1 className={classNames(
          'self-start font-title text-blue-600',
          { '!text-zinc-200': isDarkMode }
        )}>
          <span className='block md:text-xl leading-none'>
            The
          </span> 
          <span className='block text-3xl md:text-5xl font-black leading-none tracking-tight'>
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