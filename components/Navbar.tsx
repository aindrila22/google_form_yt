import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="block w-full shadow">
      <div className="flex justify-between mx-auto items-center w-full max-w-7xl px-6 h-20">
        <Link
          href="/"
          className="flex justify-center items-center gap-5 text-lg text-[#29A0B1] md:text-2xl font-extrabold tracking-wider"
        >
          createforms
        </Link>
        <div className="flex justify-center items-start gap-5">
          <Link href="/formlist" className='bg-[#29A0B1] uppercase text-white px-6 py-3 rounded'>Forms</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
