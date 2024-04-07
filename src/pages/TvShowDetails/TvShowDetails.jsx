// npm modules
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// services
import * as tvShowService from '../../services/tvShowService'

// css
import styles from './TvShowDetails.module.css'

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
          {/* <img src={tvShow.poster_path} alt="" /> */}
        </div>
      :
        <h2>Loading...</h2>
      }
    </>
  )
}

export default TvShowDetails