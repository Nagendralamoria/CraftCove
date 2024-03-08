import React from 'react'
import { FaGithub, FaInstagram } from 'react-icons/fa'
import { GrAppleAppStore } from 'react-icons/gr'

function Footer() {
  return (
    <div className='flex flex-col md:flex-row gap-4 justify-between items-center p-10 border-t mt-12'>
    <div className='flex items-center '>
    <GrAppleAppStore className='text-4xl text-[#5B20B6]'/>
        <h1 className=' text-xl font-bold'>CraftCove</h1>
    </div>
    <div className='flex items-center text-3xl text-[#5B20B6] gap-4 hover:cursor-pointer'>
    <FaInstagram />
    <FaGithub />
    </div>
    </div>
  )
}

export default Footer