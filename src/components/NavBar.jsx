import React, { useContext } from 'react'
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router'
import { GlobalContext } from '../context/GlobalState'
import { FaMoon, FaSearch } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';

export function NavBar({ isDarkMode, toggleTheme }) {

  const navigate = useNavigate()
  const location = useLocation()

  const showLocation = location.pathname === '/images' || location.pathname === '/search'

  const { search, setSearch, getImages } = useContext(GlobalContext)

  return (
    <div className='pixabay-navbar'>
      <div className='navbar-left'>
        <span className='logo' onClick={() => { navigate('/') }} >Pixabay</span>
      </div>

      {
        showLocation && (
          <div className='nav-input-div'>
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
              placeholder='Search Images'
              className='nav-input'
              onKeyDown={(e)=>{
                if (e.key==='Enter'){
                  getImages()
                }
              }}
            />
            <button className='nav-search-btn' onClick={getImages} >
              <FaSearch />
            </button>

          </div>
        )
      }

      <div className='navbar-right' onClick={toggleTheme}>
        {
          isDarkMode ? <FaMoon className='theme-icon' size={25} /> : <FaSun className='theme-icon' size={25} />
        }
      </div>
    </div>
  )
}