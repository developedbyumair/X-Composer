'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import NavToggle from './NavToggle'

// Hook Imports
import useHorizontalNav from '@menu/hooks/useHorizontalNav'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'
import Navigation from './Navigation'

const NavbarContent = () => {
  // Hooks
  const { isBreakpointReached } = useHorizontalNav()
  const router = useRouter()
  const [user, setUser] = useState<{
    data: {
      profile_image_url: string
      name: string
    }
  } | null>(null)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/twitter/user')
      const data = await response.json()
      if (data.isAuthenticated) {
        setUser(data.user)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/twitter/logout', { method: 'POST' })
      setUser(null)
      router.refresh()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div
      className={classnames(horizontalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}
    >
      <div className='flex items-center gap-4'>
        <NavToggle />
        {/* Hide Logo on Smaller screens */}
        {!isBreakpointReached && <Logo />}
        <Navigation />
      </div>
      <div className='flex items-center gap-4'>
        {user && (
          <>
            <Avatar src={user?.data?.profile_image_url} alt={user?.data?.name} />
            <Typography variant='body1' className='text-white'>
              {user?.data?.name}
            </Typography>
            <Button variant='contained' color='secondary' onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default NavbarContent
