'use client'
import * as React from 'react'

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import type { SelectChangeEvent } from '@mui/material/Select'
import Select from '@mui/material/Select'
import { Box } from '@mui/material'

export default function CustomDropDown() {
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  return (
    <Box>
      <FormControl
        className='rounded-[6px]'
        sx={{
          background: 'linear-gradient(90deg, #8755D8 0%, #F69D7B 100%)',
          '&:hover': {
            background: 'linear-gradient(90deg, #8755D8 0%, #F69D7B 100%)'
          }
        }}
      >
        <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value=''>
            <em>Schedule</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
