'use client'

// React Imports
import React, { useState, useEffect } from 'react'

import localizedFormat from 'dayjs/plugin/localizedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'
import dayjs from 'dayjs'

// MUI Imports
import { Typography } from '@mui/material'

dayjs.extend(localizedFormat)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
})

const DisplayDate = () => {
  // hooks
  const [date, setDate] = useState('')

  useEffect(() => {
    const now = dayjs().format('dddd, DD MMM')

    setDate(now)
  }, [date])

  return (
    <Typography
      variant={'h5'}
      fontWeight={600}
      color={'#B9B9B9'}
      className='text-[0.75rem] leading-[0.75rem] whitespace-nowrap'
    >
      {date}
    </Typography>
  )
}

export default DisplayDate
