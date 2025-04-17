import React, {useId} from 'react'

const Input = React.forwardRef(function  Input({
    label,
    type="text",
    className,
    ...props
},ref){
    const id = useId()
    return ( 
    <div className='w-full'>
        {label && <label className='inline-block md-1 pl-1'
        htmlFor={id}>
            {label}
            </label>}
            <input 
            type={type}
            className= {`file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
    </div>)
    })
    

export default Input
