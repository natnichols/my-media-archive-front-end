// npm modules
import { useState, useEffect} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import TvShowSearch from './pages/TvShowSearch/TvShowSearch'
import TvShowDetails from './pages/TvShowDetails/TvShowDetails'
import TvShowIndex from './pages/TvShowIndex/TvShowIndex'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'
import * as tvShowService from './services/tvShowService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [profile, setProfile] = useState({})
  const navigate = useNavigate()

  const tmdbImgUrl = `https://image.tmdb.org/t/p/w500`

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        const profileData = await profileService.getUserProfile(user.profile)
        setProfile(profileData)
      }
      fetchUserProfile()
    }
  }, [user])

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddFaveTvShow = async (tvShowData) => {
    // make API call with title/tmdbId of tvShow
    const updatedProfile = await tvShowService.addFaveTvShow(tvShowData)
    // update profile state, adding new fave show
    setProfile(updatedProfile)
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route path="/tvshows" element={
          <TvShowIndex 
            profile={profile}
            tmdbImgUrl={tmdbImgUrl}
          />} 
        />
        <Route path="/tvshows/:tmdbId" element={
          <TvShowDetails 
            profile={profile}
            tmdbImgUrl={tmdbImgUrl}
            handleAddFaveTvShow={handleAddFaveTvShow} 
          />} 
        />
        <Route path="/tvshows/search" element={
          <TvShowSearch 
            tmdbImgUrl={tmdbImgUrl}
          />} 
        />
        
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
