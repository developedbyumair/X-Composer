// MUI Imports
import Button from '@mui/material/Button'

// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import HorizontalLayout from '@layouts/HorizontalLayout'
import LayoutWrapper from '@layouts/LayoutWrapper'

// Component Imports
import Providers from '@components/Providers'
import Header from '@components/layout/horizontal/Header'
import ScrollToTop from '@core/components/scroll-to-top'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'
import { cookies } from 'next/headers'
import { PostFooter } from '@/ui/components/PostFooter'
import { Footer } from '@/ui'

const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()
  const isAuthenticated = !!cookies().get('x_access_token')

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        systemMode={systemMode}
        horizontalLayout={
          <HorizontalLayout header={<Header />} footer={isAuthenticated ? <PostFooter /> : <Footer />}>
            {children}
          </HorizontalLayout>
        }
      />
      <ScrollToTop className='mui-fixed'>
        <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
          <i className='ri-arrow-up-line' />
        </Button>
      </ScrollToTop>
    </Providers>
  )
}

export default Layout
