import { Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import Login from "./Pages/LoginPage/Login"
import SignUp from "./Pages/SignUpPage/SignUp"

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<SignUp/>} />
    </Routes>
  )
}

export default App
