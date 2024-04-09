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
  const [displaySeasons, setDisplaySeasons] = useState(false)
  
  useEffect(() => {
    const fetchTvShowDetails = async () => {
      const data = await tvShowService.tvShowDetails(tmdbId)
      setTvShow(data)
    }
    fetchTvShowDetails()
  }, [tmdbId])

  const handleToggleSeasonsDisplay = () => {
    setDisplaySeasons(!displaySeasons)
  }

  return (
    <>
      {tvShow.id ?
        <div className={styles.tvShowContainer}>
          <h1>{tvShow.name} ({tvShow.first_air_date.slice(0,4)}-{tvShow.last_air_date.slice(0,4)})</h1>
          <a href={tvShow.homepage}>Show Homepage</a>
          <h4><i>{tvShow.tagline}</i></h4>
          <img src={defaultImg} alt="default image of archer season 9 poster" />
          <h3>Number of Seasons: {tvShow.number_of_seasons}</h3>
          <h3>Status: {tvShow.status}</h3>
          <p>{tvShow.overview}</p>
          <button onClick={handleToggleSeasonsDisplay} className={styles.seasonsDisplay}>{displaySeasons ? 'Hide' : 'Show'} Seasons Component</button>
          {displaySeasons && 
            <h1>Seasons Component</h1>
          }
        </div>
      :
        <h2>Loading...</h2>
      }
    </>
  )
}

export default TvShowDetails