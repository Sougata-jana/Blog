import React,{useId} from 'react'

function Select(
   { options,
    lable,
    className,
    ...Props},ref
) {
    const id = useId()
  return (
  <div w-full>
    {lable && <label htmlFor='id' className=''>
        </label>}
        <select 
        {...Props}
        ref={ref}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
        >
            {options?.map((option)=>(
                <option key={option} value={option}>
                    {option}
                </option>
            ))  }
        </select>

  </div>
  )
}

export default React.forwardRef(Select)