import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center text-center mb-6'>
      <p className='text-blue-100 text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight'>
        {text1} <span className='text-blue-100 font-extralight'>{text2}</span>
      </p>
    </div>
  )
}

export default Title
