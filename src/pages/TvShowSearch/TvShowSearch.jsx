// npm modules
import { useState } from 'react'

// services
import * as tvShowService from '../../services/tvShowService'
import * as tokenService from '../../services/tokenService'

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
            // <NavLink to={}>
            <div className={styles.tvShowCard} key={tvShow.id}>
                {/* <img src="" alt="" /> */}
                <h3>{tvShow.name}</h3>
                {/* <h3>Test</h3> */}
              </div>
            // </NavLink>
          )}
        </div>
        :
        <h2>Search for a TV Show!</h2>
      }
    </>
  )
}

export default TvShowSearch