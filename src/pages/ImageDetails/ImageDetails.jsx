import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState'
import { useParams } from 'react-router'
import './imagedetails.css'

export function ImageDetails() {
  const { id } = useParams()
  const API_KEY = '54656998-287a62fa80ae4fac0fcca9ab0'
  const { imageDetails, setImageDetails } = useContext(GlobalContext)
  const [loading, setLoading] = useState(true)
  const [isFollowed, setIsFollowed] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  function toggleFollow() {
    setIsFollowed(!isFollowed)
  }

  function closeModal() {
  setOpenModal(false);
}

  useEffect(() => {
    async function getImageDetails() {
      try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&id=${id}`)
        const fetchedData = await response.json()
        console.log(fetchedData)

        if (fetchedData?.hits && fetchedData.hits.length > 0) {
          setImageDetails(fetchedData.hits[0])
        }
        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setLoading(false)
      }
    }
    getImageDetails()
  })

  if (loading) return <div className='image-details-page' style={{ padding: '40px' }}>Loading...</div>
  if (!imageDetails) return <div className='image-details-page' style={{ padding: '40px' }}>Image not found</div>

  return (
    <div className='image-details-page'>
      <div className='inner-details'>

        {/* LEFT: Image */}
        <div className='image-wrapper'>
          <img
            src={imageDetails.largeImageURL || imageDetails.webformatURL}
            alt={imageDetails.tags}
          />
        </div>

        {/* RIGHT: Details */}
        <div className='details-wrapper'>
          <h1 className='details-title'>{imageDetails.tags}</h1>

          <p className='license-text'>
            Free for use under the Pixabay Content License
          </p>

          <div className='details-buttons'>
            <a href={imageDetails.largeImageURL} download className='download-btn' >Free download</a>
          </div>

          <div className='details-stats'>
            <span className='stat-item'>
              <span className='stat-icon'>❤️</span>
              <span className='stat-number'>{imageDetails.likes}</span>
            </span>
            <span className='stat-item'>
              <span className='stat-icon'>👁️</span>
              <span className='stat-number'>{imageDetails.views}</span>
            </span>
            <span className='stat-item'>
              <span className='stat-icon'>⬇️</span>
              <span className='stat-number'>{imageDetails.downloads}</span>
            </span>
          </div>

          <div className='user-section'>
            <div className='user-avatar'>
              {imageDetails.user?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className='user-info'>
              <span className='user-name'>{imageDetails.user}</span>
              <span className='user-followers'>2,863 followers</span>
            </div>
            <button className='follow-btn' onClick={toggleFollow} >{!isFollowed ? "Follow" : "Followed"}</button>
          </div>

          <div className='donate-section'>
            <button className='donate-btn' onClick={()=>{setOpenModal(true)}} >Donate</button>
          </div>

          { openModal && (
            <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close-btn' onClick={closeModal}>✕</button>
            <div className='modal-icon'>⚠️</div>
            <h2 className='modal-title'>Action Unavailable</h2>
            <p className='modal-message'>Sorry, that action can't be done yet.</p>
            <button className='modal-btn' onClick={closeModal}>Okay</button>
          </div>
        </div>
          )}

          <div className='sponsored-section'>
            <p className='sponsored-text'>
              Sponsored Images iStock LIMITED DEAL: 20% off with PIXABAY20 coupon
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}