// npm modules
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// services
import * as tvShowService from '../../services/tvShowService'

// css
import styles from './TvShowDetails.module.css'

// assets
import defaultImg from '../../assets/archer-season-9.jpg'

const TvShowDetails = () => {
  const { tmdbId } = useParams()
  const [tvShow, setTvShow] = useState({})
  
  useEffect(() => {
    const fetchTvShowDetails = async () => {
      const data = await tvShowService.tvShowDetails(tmdbId)
      setTvShow(data)
    }
    fetchTvShowDetails()
  }, [tmdbId])

  return (
    <>
      {tvShow.id ?
        <div>
          <h1>{tvShow.name}</h1>
          <img src={defaultImg} alt="default image of archer season 9 poster" />
        </div>
      :
        <h2>Loading...</h2>
      }
    </>
  )
}

export default TvShowDetails