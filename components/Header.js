import React from 'react'

const Header = () => {
  return (
    <div className=' w-full h-[70px] bg-black' > 
        <header className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">Price for House</h1>
        <svg className="ml-2 w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 3l10 9h-5v8H7v-8H2l10-9z"/>
        </svg>
      </div>
    </header>
    </div>
  )
}

export default Header