'use client'

import React, { useRef, useState } from 'react'

import { Box, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

export const ImageUploader = ({ onImageUpload }: { onImageUpload: (image: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      const base64 = reader.result as string

      onImageUpload(base64)
    }
  }

  // Handle the drag and drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  return (
    <Box
      aria-label='image uploader section'
      className={`border rounded-[6px] m-2 cursor-pointer ${dragging ? 'bg-gray-600' : ''}`}
      onClick={() => {
        fileInputRef.current?.click()
      }}
      onDragOver={e => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(true)
      }}
      onDragLeave={e => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
      }}
      onDrop={handleDrop}
    >
      <Box component={'section'} className='flex flex-col justify-center items-center p-6'>
        <Icon icon='material-symbols-light:gallery-thumbnail-outline' className='text-white text-2xl text-center' />{' '}
        <Typography variant={'h5'}>Select Image</Typography>
        <input
          ref={fileInputRef}
          accept='image/*'
          hidden
          type='file'
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0])
            }
          }}
        />
        <Typography component={'span'}>Upload now or choose from previously uploaded images</Typography>
      </Box>
    </Box>
  )
}
