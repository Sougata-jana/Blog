import React from 'react'

export default function Button({   
    children,
    type = 'button',
    bgColor = 'gray-600',
    textColor = 'text-white',
    className = '',
    ...props}) {

  return (
    <button className={`px-4 py-2 ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

