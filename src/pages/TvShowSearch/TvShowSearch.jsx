// npm modules
import { useState } from 'react'

// services
import * as tvShowService from '../../services/tvShowService'

// css
import styles from './TvShowSearch.module.css'
import { NavLink } from 'react-router-dom'

const TvShowSearch = () => {
  const [formData, setFormData] = useState({
    query: ''
  })
  
  const [results, setResults] = useState([])

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      const data = await tvShowService.tvShowSearch(formData)
      console.log(data)
      setResults(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>TV Show Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" onChange={handleChange}/>
        <button type="submit">Search</button>
      </form>
      {/* {console.log(results.results?.length)} */}
      {
        results?.length ?
        <div className={styles.resultContainer}>
          {results?.map(tvShow => 
            <NavLink to={`/tvShows/${tvShow.id}`} key={tvShow.id}>
              <div className={styles.tvShowCard}>
                {/* <img src={tvShow.poster_path} alt="" /> */}
                <h3>{tvShow.name}</h3>
              </div>
            </NavLink>
          )}
        </div>
        :
        <h2>Search for a TV Show!</h2>
      }
    </>
  )
}

export default TvShowSearch