import { 
  BrowserRouter,
  Route,
  Routes, 
} from 'react-router-dom'
// ------ Pages ------ //
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import DashBoard from './pages/dashboard'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<DashBoard/>} />
        <Route path='/dashboard/:userId' element={<DashBoard/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
