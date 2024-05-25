
import './App.css'
import Login from './Pages/Login'
import { Routes ,Route} from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
function App() {
  

  return (
    <Routes>
  <Route path='/' element={<Login/>}/>
  <Route path='/signUp' element={<SignUp/>}/>
  <Route path='/home' element={<Home/>}/>
    </Routes>

  )
}

export default App
