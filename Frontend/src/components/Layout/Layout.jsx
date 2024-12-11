import React, { Children } from 'react'
import AppBar from '../AppBar/AppBar'

const Layout = ({children}) => {
  return (
    <div>
        <AppBar />
        {children}
    </div>
  )
}

export default Layout