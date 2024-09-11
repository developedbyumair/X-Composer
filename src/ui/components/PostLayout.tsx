import { Box, Typography } from '@mui/material'

import { Icon } from '@iconify/react'

import CustomAvatar from '@core/components/mui/Avatar'
import CustomCard from '@/@core/components/mui/Card'
import CustomBadge from '@/@core/components/mui/Badge'
import DisplayDate from '@/@core/components/mui/DisplayDate'

export const PostLayout = () => {
  return (
    <Box className='flex justify-start items-start gap-[1.4rem] mt-0 w-full  bg-[#242526]' aria-label='compose post'>
      <Box
        component={'section'}
        aria-label='avatar with label'
        className='flex flex-col items-center gap-[.625rem] p-[1.5rem] border-r-1 border-r-[#3D3D3D] bg-[#181818]'
      >
        <CustomAvatar
          size={60}
          sx={{
            background: 'linear-gradient(90deg, #8755D8 0%, #F69D7B 100%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #8755D8 0%, #F69D7B 100%)'
            }
          }}
        >
          <Icon icon='mdi-light:plus' className='text-white text-2xl text-center' />
        </CustomAvatar>
        <Typography
          variant={'h5'}
          fontWeight={400}
          color={'#fff'}
          className='opacity-80 text-[0.625rem] leading-[0.625rem] whitespace-nowrap'
        >
          Compose Post
        </Typography>
      </Box>
      <Box component={'section'} aria-label='post creation with date and time'>
        <Box component={'article'} className='plb-[0.875rem] gap-[.9rem] flex flex-col'>
          <Box component={'section'} className='flex gap-6'>
            <DisplayDate />
            <Box component={'span'} className='-mt-0 flex justify-start items-center'>
              <CustomBadge badgeContent={2} color='secondary' tonal={'true'}></CustomBadge>
            </Box>
          </Box>
          <CustomCard />
        </Box>
      </Box>
    </Box>
  )
}
