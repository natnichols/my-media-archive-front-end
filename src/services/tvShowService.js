// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/tvshows`

export async function tvShowSearch(query) {
  try {
    const res = await fetch(`${BASE_URL}/search`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}` ,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query)
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

export async function tvShowDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

export async function addFaveTvShow(tvShowData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}` ,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tvShowData)
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}