// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ChildrenType } from '@core/types'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const Navbar = ({ children }: ChildrenType) => {
  return (
    <div className={classnames(horizontalLayoutClasses.navbar, 'flex items-center justify-between is-full h-[56px]')}>
      {children}
    </div>
  )
}

export default Navbar
