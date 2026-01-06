import React from 'react'

export default function Card() {
  return (
    <div className='relative overflow-hidden h-80 w-60 bg-neutral-200 rounded-lg text-black shadow-xl shadow-neutral-400/50 mask-fade'>
        <div className='absolute inset-0 flex justify-center items-center h-[30%] w-full'>
            Card
        </div>
    </div>
  )
}