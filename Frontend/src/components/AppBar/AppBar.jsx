import React, { useState, useEffect } from 'react';
import css from './AppBar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

const AppBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Локальное состояние
  const navigate = useNavigate();

  // Проверяем авторизацию при загрузке компонента
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };

    checkAuthStatus();

    // Добавляем слушатель изменения localStorage
    window.addEventListener('storage', checkAuthStatus);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  // Функция для выхода
  const logout = () => {
    localStorage.removeItem('isAuthenticated'); // Удаляем флаг
    setIsAuthenticated(false); // Обновляем состояние
    navigate('/login'); // Перенаправляем на страницу логина
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <div className={css.navigationCon}>
          <NavLink to='/' className={css.logoLink}>
            <p className={css.logo}>
              <span className={css.firstLogoWord}>WEB</span>STUDIO
            </p>
          </NavLink>
          <NavLink to='/' className={css.links}>Home</NavLink>
          <NavLink to='/portfolio' className={css.links}>Portfolio</NavLink>
          </div>
          {/* <NavLink to='/summary' className={css.links}>Summary</NavLink> */}
          {isAuthenticated ? (
            <div className={css.authBtn}> 
              <NavLink to='/allUsers' className={css.links}>All users</NavLink>
              <button onClick={logout} className={css.logoutBtn}>Logout</button>
            </div>
          ) : (
            <div className={css.authBtn}>
              <NavLink to='/register' className={css.links}>Register</NavLink>
              <NavLink to='/login' className={css.links}>Login</NavLink>
            </div>
          )}
        
      </div>
    </header>
  );
};

export default AppBar;
