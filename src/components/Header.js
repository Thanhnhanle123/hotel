// src/components/Header.js
import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import bell from '../assests/icons/bell.png'
import us from '../assests/icons/us.png'
import vn from '../assests/icons/vn.png'
import logo from '../assests/logos/logo.png'

const Header = ({ changeLanguage }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') != null
      ? localStorage.getItem('language')
      : 'vi-VN'
  )
  const [flagSrc, setFlagSrc] = useState(
    localStorage.getItem('language') == null ||
      localStorage.getItem('language') == 'vi-VN'
      ? vn
      : us
  ) // default flag
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const hanldeLogout = () => {
    localStorage.clear()
    navigate('/')
  }
  const handleChange = event => {
    const selectedLanguage = event.target.value
    localStorage.setItem('language', selectedLanguage)
    setLanguage(selectedLanguage)
    changeLanguage(selectedLanguage)

    // Update the flag image based on the selected language
    switch (selectedLanguage) {
      case 'vi-VN':
        setFlagSrc(vn)
        break
      default:
        setFlagSrc(us)
    }
  }
  return (
    <header>
      <div className='header-logos'>
        <Link to='/'>
          <img className='header-logo' src={logo} alt='Logo' />
        </Link>
        <ul className='header-icons'>
          <li className='header-icon icon-text'>
            <b>VND</b>
          </li>
          <div className='header-icon language-select-form'>
            {/* Flag image */}
            <img src={flagSrc} alt='Country flag' className='country-flag' />

            {/* Language dropdown */}
            <select
              value={language}
              onChange={handleChange}
              className='language-dropdown'
            >
              <option value='en-US'>English</option>
              <option value='vi-VN'>Tiếng việt</option>
            </select>
          </div>
          <li className='header-icon'>
            <img className='header-icon' src={bell} alt='Logo' />
          </li>
        </ul>
      </div>
      <nav className='header-items'>
        <ul className='header-links'>
          <li>
            <NavLink
              className='header-link'
              to='/'
              activeClassName='active-link'
              exact
            >
              <FormattedMessage id='home' defaultMessage='home' />
            </NavLink>
          </li>
          <li>
            <NavLink
              className='header-link'
              to='/hotels'
              activeClassName='active-link'
            >
              <FormattedMessage id='hotels' defaultMessage='hotels' />
            </NavLink>
          </li>
          <li>
            <NavLink
              className='header-link'
              to='/about'
              activeClassName='active-link'
            >
              <FormattedMessage id='about' defaultMessage='about' />
            </NavLink>
          </li>
          {localStorage.getItem('role') !== '2' ? (
            <li>
              <NavLink
                className='header-link'
                to='/register_hotel'
                activeClassName='active-link'
              >
                <FormattedMessage
                  id='register_hotel'
                  defaultMessage='register_hotel'
                />
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                className='header-link'
                to='/manage_hotel'
                activeClassName='active-link'
              >
                <FormattedMessage
                  id='manage_hotel'
                  defaultMessage='manage_hotel'
                />
              </NavLink>
            </li>
          )}
        </ul>
        <React.Fragment>
          <Box
            sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
          >
            {localStorage.getItem('userId') ? (
              <Tooltip title='Account settings'>
                <IconButton
                  onClick={handleClick}
                  size='small'
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <div className=''>
                <Link className='header-link' to='/register_hotel'>
                  <FormattedMessage
                    id='register_hotel'
                    defaultMessage='register_hotel'
                  />
                </Link>
                <Link className='header-link' to='/login'>
                  <FormattedMessage id='login' defaultMessage='login' /> /
                  <FormattedMessage id='register' defaultMessage='register' />
                </Link>
              </div>
            )}
          </Box>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0
                  }
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Link className='link' to='/profile'>
              <MenuItem>
                <Avatar />{' '}
                <FormattedMessage id='profile' defaultMessage='profile' />
              </MenuItem>
            </Link>
            <Divider />
            <Link className='link' to='/booking-history'>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize='small' />
                </ListItemIcon>
                <FormattedMessage id='history' defaultMessage='history' />
              </MenuItem>
            </Link>
            <MenuItem onClick={hanldeLogout}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              <FormattedMessage id='logout' defaultMessage='logout' />
            </MenuItem>
          </Menu>
        </React.Fragment>
      </nav>
    </header>
  )
}

export default Header
