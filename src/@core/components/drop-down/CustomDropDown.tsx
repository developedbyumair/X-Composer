'use client'
import * as React from 'react'

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import type { SelectChangeEvent } from '@mui/material/Select'
import Select from '@mui/material/Select'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { postUpdates } from '@/ui/pubsub'

export default function CustomDropDown() {
  const [age, setAge] = React.useState('')
  const [image, setImage] = React.useState('')
  const router = useRouter()

  const handlePostNow = async () => {
    const postData = JSON.parse(localStorage.getItem('currentPost') || '{}')
    const caption = postData.caption
    try {
      const response = await fetch('/api/twitter/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: caption, image }) // Change 'caption' to 'text'
      })

      if (response.ok) {
        console.log('Tweet posted successfully')
        localStorage.removeItem('currentPost')
        router.push('/home')
      } else {
        console.error('Failed to post tweet')
      }
    } catch (error) {
      console.error('Error posting tweet:', error)
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
    handlePostNow()
  }
  React.useEffect(() => {
    const subscription = postUpdates.subscribe('image', async data => {
      console.log('image', data)
      setImage(data.image)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
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
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ pr: 5 }}
        >
          <MenuItem value='Schedule'>
            <em>Schedule</em>
          </MenuItem>
          <MenuItem value=''>
            <em>Schedule Now</em>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
