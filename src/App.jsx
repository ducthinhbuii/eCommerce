import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Header} from './components/header/Header'
import {Footer} from './components/footer/Footer'
import {Home} from './pages/home/Home'
import { Categories } from './pages/categories/Categories'
import { Detail } from './pages/detail/Detail'
import { Cart } from './pages/cart/Cart'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/categories/:categoryId?" element={<Categories/>} />
          <Route path="/detail" element={<Detail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
