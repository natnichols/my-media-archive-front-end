// npm modules
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// services
import * as tvShowService from '../../services/tvShowService'

// css
import styles from './TvShowDetails.module.css'

// assets
// import defaultImg from '../../assets/archer-season-9.jpg'

const TvShowDetails = ({ profile, tmdbImgUrl, handleAddFaveTvShow }) => {
  const { tmdbId } = useParams()
  const [tvShow, setTvShow] = useState({})
  const [displaySeasons, setDisplaySeasons] = useState(false)

  // const tmdbImgUrl = `https://image.tmdb.org/t/p/w500`
  
  console.log(tmdbId)
  console.log(profile.faveTvShows)

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

  const handleFaveTvShow = () => {
    // will run the fn passed down as a prop
    handleAddFaveTvShow({title: tvShow.name, tmdbId: tmdbId})
    
  }

  return (
    <>
      {tvShow.id ?
        <div className={styles.tvShowContainer}>
          <h1>{tvShow.name} ({tvShow.first_air_date.slice(0,4)}-{tvShow.last_air_date.slice(0,4)})</h1>
          <a href={tvShow.homepage}>Show Homepage</a>
          <h4><i>{tvShow.tagline}</i></h4>
          <img src={`${tmdbImgUrl}${tvShow.poster_path}`} alt="image of tv show poster" />
          {/* need to add conditional + default photo if tvShow.poster_path = null*/}
          <h3>Number of Seasons: {tvShow.number_of_seasons}</h3>
          <h3>Status: {tvShow.status}</h3>
          <p>{tvShow.overview}</p>
          <div className={styles.btnContainer}>
            {/*props.profile.faveTvShows.some(tvsh => tvsh.tmdbId === tmdbId) ? 'true' : 'false'*/} {/* <--- this doesn't appear to be working correctly, shows 'false' regardless if show is in array */}
            <button onClick={handleFaveTvShow} className={styles.faveTvShow}>Add to Fave Shows</button>
            <button onClick={handleToggleSeasonsDisplay} className={styles.seasonsDisplay}>{displaySeasons ? 'Hide' : 'Show'} Seasons Component</button>
          </div>
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