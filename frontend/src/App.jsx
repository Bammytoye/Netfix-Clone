import { Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import Login from "./Pages/LoginPage/Login"
import SignUp from "./Pages/SignUpPage/SignUp"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/AuthUser"
import { useEffect } from "react"

function App() {
  const { user, isAuthChecking, authCheck } = useAuthStore()
  console.log('Auth user is here', user)

  useEffect(() => {
    authCheck()
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  )
}

export default App
