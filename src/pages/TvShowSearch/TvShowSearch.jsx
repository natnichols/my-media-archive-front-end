// npm modules
import { useState } from 'react'

// services
import * as tvShowService from '../../services/tvShowService'

// css
import styles from './TvShowSearch.module.css'

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
    } catch (err) {
      console.log(err)
    }
    // MAKE API CALL USING STATE
    // SET RESULTS WITH RETURNED DATA
  }

  return (
    <>
      <h1>TV Show Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" onChange={handleChange}/>
        <button type="submit">Search</button>
      </form>
    </>
  )
}

export default TvShowSearch