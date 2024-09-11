'use client'
import React, { useState, useEffect } from 'react'

import { Box, Button } from '@mui/material'
import { Icon } from '@iconify/react'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'

import CustomDropDown from '@/@core/components/drop-down/CustomDropDown'

export const PostFooter = () => {
  // State to hold the formatted date
  const [formattedDate, setFormattedDate] = useState('')

  // useEffect to update the date when the component mounts
  useEffect(() => {
    const now = dayjs().format('YYYY-MM-DD hh:mm A')

    setFormattedDate(now)
  }, [])

  return (
    <Box className='bg-[#181818] border-t border-gray-800 p-4'>
      <Box className='flex flex-col justify-between md:flex-row items-center max-w-screen-xl  md:mr-60'>
        <Box component={'section'} className='flex'>
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
        <Box component={'section'} className='flex justify-end gap-5'>
          <Box
            className='p-2 gap-2 text-gray-400 hover:text-white w-full md:w-auto flex rounded-[6px] justify-start items-center'
            sx={{
              border: '1px solid #FFFFFF26'
            }}
          >
            <Box className='bg-[#323232] p-3'>
              <Icon icon='material-symbols-light:date-range-rounded' className='' />{' '}
            </Box>
            <Box className=''>
              {/* Display the state-managed formatted date */}
              <Typography component={'h4'}>{formattedDate}</Typography>
            </Box>
          </Box>

          <CustomDropDown />
        </Box>
      </Box>
    </Box>
  )
}
