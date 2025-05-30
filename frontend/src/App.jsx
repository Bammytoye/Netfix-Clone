import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import Login from "./Pages/LoginPage/Login"
import SignUp from "./Pages/SignUpPage/SignUp"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/AuthUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import WatchPage from "./Pages/WatchPage/WatchPage"
import Search from "./Pages/SearchPage/Search"
import SearchHistory from "./Pages/SearchHistory/SearchHistory"
import NotFoundPage from "./Pages/NotFoundPage"

function App() {
  const { user, isAuthChecking, authCheck } = useAuthStore()
  console.log('Auth user is here', user)

  useEffect(() => {
    authCheck()
  }, [authCheck])

  if (isAuthChecking) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={ !user ? <Login /> : <Navigate to={"/"} /> } />
        <Route path='/register' element={ !user ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path='/watch/:id' element={ user ? <WatchPage /> : <Navigate to={"/login"} />} />
        
        <Route path='/search' element={ user ? <Search /> : <Navigate to={"/login"} />} />
        <Route path='/history' element={ user ? <SearchHistory /> : <Navigate to={"/login"} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  )
}

export default App
