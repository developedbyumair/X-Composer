'use client'
import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Icon } from '@iconify/react'

import { Divider } from '@mui/material'

import dayjs from 'dayjs'

import CustomAvatar from './Avatar'

export default function CustomCard() {
  //* hooks
  // hooks
  const [time, setTime] = useState('')

  useEffect(() => {
    const currentTime = dayjs().format('h:mm A')

    setTime(currentTime)
  }, [time])

  return (
    <Box sx={{ minWidth: 275 }} className='rounded-[6px] bg-[#484848] border border-[#ACACAC]' aria-label='post card'>
      <Box component={'section'} className='plb-[0.625rem] pli-[1rem] flex justify-start items-center gap-[.8rem]'>
        <Box aria-label='icon with label'>
          <CustomAvatar size={40} sx={{ bgcolor: '#ACACAC' }}>
            <Icon
              icon='material-symbols-light:gallery-thumbnail-outline-rounded'
              className='text-white text-2xl text-center'
            />
          </CustomAvatar>
        </Box>
        <Box>
          <Typography
            gutterBottom
            variant='h5'
            aria-label='post title'
            className='text-[.875rem] leading-[1.3rem]'
            fontWeight={400}
            color={'white'}
          >
            Untitled
          </Typography>
          <Box component={'section'} className='flex gap-[.8rem]'>
            <Typography component={'span'}> NA </Typography>
            <Divider orientation='vertical' variant='middle' flexItem />
            <Typography component={'span'}> {time} </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
