
import css from './AppBar.module.css'
import { NavLink } from 'react-router-dom'

const AppBar = () => {
  return (
    <header className={css.header}>
        <div className={css.container}>
            <div className={css.navigationCon}>
                <p className={css.logo}><span className={css.firstLogoWord}>WEB</span>STUDIO</p>
                <NavLink to='/' className={css.links}>Home</NavLink>
                <NavLink to='/portfolio' className={css.links}>Portfolio</NavLink>
                <NavLink to='/summary' className={css.links}>Summary</NavLink>
            </div>
            {/* <div className={css.registrationCon}> */}
                <ul className={css.registrationList}>
                    <NavLink className={css.links}>Register</NavLink>
                    <NavLink className={css.links}>Login</NavLink>
                </ul>
            {/* </div> */}
        </div>
    </header>
  )
}

export default AppBar