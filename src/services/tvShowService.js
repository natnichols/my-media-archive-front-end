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
    throw new Error(err),
    console.log(tokenService.getToken())
  }
}