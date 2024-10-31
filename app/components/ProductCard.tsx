'use client'
import React, { useState } from 'react'
const ProductCard = () => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <>
      <section>
        <button
          className='btn btn-secondary'
          onClick={() => {
            setShow(prevShow => (prevShow ? false : true))
            console.log(show)
          }}
        >
          click me
        </button>
        {show && <div> I am a client side</div>}
      </section>
    </>
  )
}

export default ProductCard
