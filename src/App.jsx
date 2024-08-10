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
import { Order } from './pages/cart/order/Order'
import { Address } from './pages/cart/address/Address'
import { Payment } from './pages/payment/Payment'
import { ToastContainer} from 'react-toastify';
import { User } from './pages/user/User'
import { Information } from './pages/user/infomation/Information'
import { OrderStatus } from './pages/user/order-status/OrderStatus'
import ProtectRouter from './ultis/ProtectRouter'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/categories/:categoryId?" element={<Categories/>} />
          <Route path="/detail" element={<Detail/>} />
          
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />



            
          <Route element={<ProtectRouter />}>
            
            <Route path="/cart" element={<Cart/>}>
              <Route path="order" element={<Order/>}/>
              <Route index element={<Address />} />
            </Route>

            <Route path="/user-info" element={<User/>}>
              <Route path="order-status" element={<OrderStatus/>}/>
              <Route index element={<Information />} />
            </Route>
            
            <Route path="/payment-info/:orderId?" element={<Payment />} />

          </Route>
        </Routes>
        <Footer/>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
