'use client'
import React from 'react'

import { Box, TextField, Typography } from '@mui/material'

import { Icon } from '@iconify/react'

import CustomAvatar from '@core/components/mui/Avatar'
import TextFieldWithLabel from '@core/components/TextFieldWithLabel'
import CustomAccordion from '@/@core/components/accordion/Accordion'
import { ImageUploader } from '@/@core/components/image-uploader/ImageUploader'
import { ImagePreview } from '@/@core/components/image-preview/ImagePreview'
import { postUpdates } from '../pubsub'

export const PostBodyLayout = () => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null)
  return (
    <Box className='justify-start items-start mt-0 w-full grid grid-cols-12' aria-label='Post Body'>
      <Box aria-label={'Create Post Section'} className='flex-col col-span-7 p-2  border border-t-[#3D3D3D] h-[48rem]'>
        <Box aria-label='create-idea' className='w-full'>
          <Box className='p-3'>
            <Box component={'article'} className='flex justify-end items-end'>
              <CustomAvatar size={40}>
                <Icon icon='mdi:delete-outline' className='text-2xl text-center' />
              </CustomAvatar>
            </Box>
            <Box className='flex flex-col gap-[2.5rem]'>
              <Box component={'article'}>
                <TextFieldWithLabel />
              </Box>
              <Box component={'article'} className='flex flex-col gap-[1rem]'>
                <Typography
                  variant='h5'
                  className='w-full text-[1rem] leading-[.75rem] tracking-[5%] uppercase opacity-80'
                  fontWeight={400}
                >
                  Channel
                </Typography>
                <Box className='flex gap-[1.5rem]'>
                  <CustomAvatar size={35} className='p-2 bg-[#3A3A3A]'>
                    <Icon icon='prime:twitter' className='text-white text-2xl text-center' />{' '}
                  </CustomAvatar>
                  <CustomAvatar size={35} className='p-2 bg-[#EC9EA5]'>
                    <Icon icon='prime:twitter' className='text-white text-2xl text-center' />{' '}
                  </CustomAvatar>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box aria-label='Add-Caption' className='p-[1.3rem] flex flex-col gap-[1.5rem]'>
          <Box component={'section'} aria-label='section for writing caption'>
            <CustomAccordion
              title={'Caption'}
              summary={'Type the caption yourself.'}
              children={
                <>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    variant='outlined'
                    multiline
                    rows={3}
                    fullWidth
                    onBlur={e => {
                      localStorage.setItem('currentPost', JSON.stringify({ caption: e.target.value }))
                    }}
                  />
                </>
              }
            />
          </Box>
          <Box component={'section'} aria-label='section for uploading image'>
            <CustomAccordion
              title={'Creative'}
              summary={
                'Upload custom image or let AI create one for you. The selection of creatives have a limit of 10 at max.'
              }
              children={
                <ImageUploader
                  onImageUpload={(image: any) => {
                    setImageSrc(image)
                    postUpdates.publish('image', { image: image })
                  }}
                />
              }
            />
          </Box>
        </Box>
      </Box>
      <Box aria-label={'Image preview section'} className='col-span-5  bg-[#474747] opacity-[74%] h-[48rem]'>
        <Box component={'article'} className='flex justify-end items-end'>
          <Box className='p-3'>
            <CustomAvatar size={30} sx={{ bgcolor: '#474747' }}>
              <Icon icon='mdi:info-circle' className='text-white text-2xl text-center' />
            </CustomAvatar>
          </Box>
        </Box>
        <Box>
          <ImagePreview imageSrc={imageSrc && imageSrc} />
        </Box>
      </Box>
    </Box>
  )
}
