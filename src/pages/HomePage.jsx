import './homepage.css'
import React, { useContext, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { GlobalContext } from '../context/GlobalState'
import { useNavigate } from 'react-router'

export function HomePage() {

  const navigate = useNavigate()

  const { search, getImages, handleSearch, setSearch } = useContext(GlobalContext)

  const categories = [
    "nature", "flowers", "background", "sunset", "forest",
    "landscape", "sky", "beach", "wallpaper", "cat",
    "mountains", "dog"
  ]

    useEffect(() => {
  if (search) {
    getImages(search);
  }
});

  console.log(search)

  return (
    <div className='pixabay-home'>

      {/* ===== HERO SECTION ===== */}
      <section className='hero-section'>
        <h1 className='hero-title'>Stunning royalty-free images &amp; royalty-free stock</h1>

        <div className='search-wrapper'>
          <FaSearch className='search-icon' />
          <input
            value={search}
            type='text'
            className='search-input'
            placeholder='Search for free Images'
            onChange={handleSearch}
          />
          <button className='search-btn' onClick={()=>{ navigate('/images'); getImages(search)} } >
            <FaSearch />
          </button>
          
        </div>

        {/* Category Tags */}
        <div className='category-tags'>
          {categories.map((cat) => (
            <span key={cat} className='category-tag' onClick={()=>{setSearch(cat); navigate('/images'); getImages(search)}} >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* ===== FEATURED SECTION ===== */}
      <section className='featured-section'>
        <div className='featured-content'>
          <div className='featured-left'>
            <span className='featured-label'>Featured Illustration</span>
            <h2 className='featured-title'>Digital dreams</h2>
          </div>
          <div className='featured-right'>
            <span className='featured-user'>Art</span>
          </div>
        </div>
      </section>

      {/* ===== CONTENT GRID ===== */}
      <section className='content-grid-section'>
        <div className='content-grid'>
          {/* Grid items will go here */}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className='pixabay-footer'>
        <span>Read more about the Content License</span>
      </footer>

    </div>
  )
}