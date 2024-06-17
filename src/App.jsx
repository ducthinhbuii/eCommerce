import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Header} from './components/header/Header'
import {Footer} from './components/footer/Footer'
import {Home} from './pages/home/Home'
import { Categories } from './pages/categories/Categories'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/categories" element={<Categories/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
