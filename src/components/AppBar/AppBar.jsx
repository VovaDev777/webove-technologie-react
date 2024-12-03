import React from 'react'
import css from './AppBar.module.css'
import { Link } from 'react-router-dom'
import HomePage from '../../pages/HomePage/HomePage'

const AppBar = () => {
  return (
    <header className={css.headerCon}>
        <Link to={<HomePage />}>
            
        </Link>
    </header>
  )
}

export default AppBar