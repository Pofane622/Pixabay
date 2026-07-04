import { GlobalContext } from '../../context/GlobalState'
import './searchpage.css'
import React, { useContext } from 'react'
import Masonry from "react-masonry-css";
import { Link } from 'react-router';
import PulseLoader from 'react-spinners/PulseLoader';


export function SearchPage() {

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };


  const { images, search, loading } = useContext(GlobalContext)

  if (loading){
    return(
      <div>
        <PulseLoader color="#00b4b4" size={15} margin={5} />
        <p>Loading images...</p>
      </div>
    )
  }

  return (
    <div className='search-body'>
      <h1>{search} pictures and images</h1>
      <p>20+ {search} photos and stock images. Download your favourite royalty free {search} pictures in HD to 4K quality as wallpapers, backgrounds and more </p>

      {
        images && images.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-column"
          >
            {images.map((image) => (
              <Link key={image.id} to={`/images/${image.id}`} >
              <img
                key={image.id}
                src={image.webformatURL}
                alt={image.tags}
              /></Link>
              

            ))}
          </Masonry>

        ) : (<div> Please search something </div>)
      }
    </div>
  )
}