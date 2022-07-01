function Loading() {
  const dotClass = 'rounded-full w-[10px] h-[10px] bg-blue-500'
  return (
    <div className="flex gap-[10px]">
      <div className={dotClass}/>
      <div className={dotClass}/>
      <div className={dotClass}/>
    </div>
  )
}

export { Loading }