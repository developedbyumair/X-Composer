'use client'
import * as React from 'react'

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { Icon } from '@iconify/react'
import { Box } from '@mui/material'

//* Accordion props
interface AccordionProps {
  title: string
  summary: string
  children: React.ReactNode
}

export default function CustomAccordion({ title, summary, children }: AccordionProps) {
  return (
    <div>
      <Accordion className='p-1 bg-inherit' defaultExpanded>
        <AccordionSummary
          className='bg-[#181818]'
          expandIcon={<Icon icon='ic:round-expand-more' />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          {title}
        </AccordionSummary>
        <AccordionDetails className='bg-[#131313] pt-2'>{summary}</AccordionDetails>
        <Box className=''>{children}</Box>
      </Accordion>
    </div>
  )
}
