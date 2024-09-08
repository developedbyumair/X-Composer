import React from 'react'
import { Box, Button } from '@mui/material'
import { Icon } from '@iconify/react'

export const Footer = () => {
  return (
    <Box className='bg-[#181818] border-t border-gray-800 p-4'>
      <Box className='flex flex-col md:flex-row items-center max-w-screen-xl justify-end gap-5 md:mr-60'>
        <Button
          startIcon={<Icon icon='bx:bx-chevron-left' />}
          variant='text'
          className='text-gray-400 hover:text-white py-[8px] w-full md:w-auto'
          sx={{
            border: '1px solid #FFFFFF26'
          }}
        >
          Previous
        </Button>
        <Button
          endIcon={<Icon icon='bx:bx-chevron-right' />}
          variant='contained'
          color='primary'
          className='py-[8px] w-full md:w-auto'
          sx={{
            background: 'linear-gradient(90deg, #8755D8 0%, #F69D7B 100%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #8755D8 0%, #F69D7B 100%)'
            }
          }}
        >
          Connect
        </Button>
      </Box>
    </Box>
  )
}
