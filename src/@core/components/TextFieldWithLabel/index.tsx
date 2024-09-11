import * as React from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { Icon } from '@iconify/react'
import { Typography } from '@mui/material'

import TextField from '@mui/material/TextField'

export default function TextFieldWithLabel() {
  return (
    <Box className='flex flex-col gap-[.5rem]'>
      <Typography
        mt={2}
        fontWeight={400}
        gutterBottom
        className='uppercase text-[1rem] font-normal tracking-[5%] leading-[.75rem]'
      >
        Idea
      </Typography>
      <Box className='flex justify-start items-center max-w-[35%]'>
        <FormControl>
          <TextField
            inputProps={{
              style: { fontSize: 22, fontWeight: 600, lineHeight: 33, color: 'white' }
            }}
            variant='standard'
            defaultValue={'Untitled'}
          />
        </FormControl>
        <Icon icon='ic:outline-edit' className='text-white text-2xl text-center' />{' '}
      </Box>
    </Box>
  )
}
