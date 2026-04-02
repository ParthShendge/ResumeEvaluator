
import './App.css'
import Dashboard from './pages/dashboard'
import HomePage from './pages/home';
import LoginPage from './pages/Login'
import SignUp from './pages/SignUp'
import { Routes, Route } from "react-router"

function App() {

  return (
    <>
    
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App
