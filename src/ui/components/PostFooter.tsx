'use client'

import { Icon } from '@iconify/react'
import { Box, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'

import CustomDropDown from '@/@core/components/drop-down/CustomDropDown'

export const PostFooter = () => {
  const now = dayjs().format('YYYY-MM-DD hh:mm A')

  return (
    <Box className='bg-[#181818] border-t border-gray-800 p-4'>
      <Box className='flex flex-col justify-between md:flex-row items-center max-w-screen-xl '>
        <Box component={'section'} className='flex w-full md:w-auto'>
          <Button
            variant='text'
            className='text-gray-400 hover:text-white py-[8px] w-full md:w-auto'
            sx={{
              border: '1px solid #FFFFFF26'
            }}
          >
            Cancel
          </Button>
        </Box>
        <Box component={'section'} className='flex justify-end gap-5 w-full md:w-auto'>
          <Box
            className='p-2 gap-2 text-gray-400 hover:text-white w-full md:w-auto flex rounded-[6px] justify-start items-center'
            sx={{
              border: '1px solid #FFFFFF26'
            }}
          >
            <Box className='bg-[#323232] p-3'>
              <Icon icon='material-symbols-light:date-range-rounded' className='' />{' '}
            </Box>
            <Box className='flex flex-col'>
              <Typography component={'h4'}>{now}</Typography>
            </Box>
          </Box>

          <CustomDropDown />
        </Box>
      </Box>
    </Box>
  )
}
