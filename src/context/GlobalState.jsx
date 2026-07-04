import React, { createContext, useState } from 'react'

export const GlobalContext = createContext(null)

export function GlobalState({ children }) {

  var API_KEY = '54656998-287a62fa80ae4fac0fcca9ab0';

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [imageDetails, setImageDetails] = useState(null)

  function handleSearch(e){
    setSearch(e.target.value)
  }

  async function getImages(e){
    try {
      setLoading(true)
      const res = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(search)}`)
      const data = await res.json()
      if (data?.hits){
        setImages(data?.hits)
        setLoading(false)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return <GlobalContext.Provider value={{search, setSearch, getImages, handleSearch, loading, images, imageDetails, setImageDetails }} >{children}</GlobalContext.Provider>
}


