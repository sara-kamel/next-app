'use client'
import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary'

interface CloudinaryResult {
  public_id: string
}
const UploadPage = () => {
  const [puplicId, setPublicId] = useState('')
  return (
    <>
      {puplicId && (
        <CldImage src={puplicId} width={270} height={270} alt='person image' />
      )}
      <CldUploadWidget
        uploadPreset='hrnas69n'
        // options={{ sources: ['local'], multiple: false, maxFiles: 5 }}
        onSuccess={result => {
          if (result.event !== 'success') return
          const info = result.info as CloudinaryResult
          setPublicId(info.public_id)
        }}
      >
        {({ open }) => {
          return (
            <button className='btn btn-primary' onClick={() => open()}>
              Upload an Image
            </button>
          )
        }}
      </CldUploadWidget>
    </>
  )
}

export default UploadPage
