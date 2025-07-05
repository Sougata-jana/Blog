import React from 'react'

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4 bg-white border border-gray-200 rounded-2xl shadow-sm font-sans'>{children}</div>;
}

export default Container