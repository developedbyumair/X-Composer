import React from 'react'

import { Box, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

export const ImagePreview = ({ imageSrc }: { imageSrc: string | null }) => {
  return (
    <Box>
      {Boolean(imageSrc) ? (
        <Box
          component='img'
          src={String(imageSrc)}
          sx={{
            width: '23rem',
            height: '30rem',
            objectFit: 'cover',
            overflow: 'hidden',
            borderRadius: '20px',
            marginInline: '5rem',
            marginBlock: '2.5rem'
          }}
        />
      ) : (
        <Box component={'section'} className='p-48 gap-[1rem] flex flex-col justify-center items-center'>
          <Icon
            icon='material-symbols:eye-tracking-outline'
            className='text-white text-2xl text-center w-[50%] h-[50%]'
          />
          <Typography variant={'h5'} className='text-center whitespace-nowrap'>
            Select a Channel to View Preview
          </Typography>
          <Typography component={'span'} className='text-center whitespace-nowrap'>
            The preview will only be available once you select an image
          </Typography>
        </Box>
      )}
    </Box>
  )
}
