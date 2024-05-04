import React from 'react'

const Paragraph = () => {
  return (
    <div className="w-full px-6 py-1 mb-6">
      <textarea
        rows={3}
        placeholder="Paragraph"
        className="text-base outline-none font-medium capitalize border-b 
      focus:border-b-2 border-gray-200 focus:border-[#29A0B1] py-1 w-full"
      />
    </div>
  )
}

export default Paragraph
