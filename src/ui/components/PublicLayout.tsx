'use client'

import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import { Icon } from '@iconify/react'

export const PublicLayout = () => {
  const handleTwitterLogin = async () => {
    try {
      const response = await fetch('/api/twitter/auth', { method: 'GET' })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error initiating Twitter login:', error)
    }
  }

  return (
    <Box className='flex justify-center items-center mt-20'>
      <Box className='flex flex-col items-center'>
        <Image src='/images/pages/amico.svg' alt='logo' width={280} height={250} />
        <Box className='mt-10'>
          <span>1</span>
          <span className='opacity-80'>/5</span>
          <Typography variant='h3' className='text-white'>
            Connect your social media Channel
          </Typography>
          <span className='text-sm font-normal leading-6 text-left text-[#CACACA] opacity-80'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </span>
          <Box className='mt-20 bg-custom-gradient p-5 rounded-lg max-w-[220px]'>
            <Box className='flex flex-col items-center gap-4 mt-5'>
              <Icon icon='prime:twitter' className='text-white text-2xl text-center' />
              <Typography variant='h6' className='text-white text-center mb-6'>
                Twitter
              </Typography>
            </Box>
            <Button
              variant='contained'
              color='primary'
              fullWidth
              className='py-[8px]'
              sx={{
                background:
                  ' radial-gradient(88.57% 88.57% at 50% 50%, rgba(104, 197, 242, 0.3) 0%, rgba(37, 37, 37, 0.3) 100%)',
                '&:hover': {
                  background:
                    'radial-gradient(88.57% 88.57% at 50% 50%, rgba(104, 197, 242, 0.3) 0%, rgba(37, 37, 37, 0.3) 100%)'
                }
              }}
              onClick={handleTwitterLogin}
            >
              Connect
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
