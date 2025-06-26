import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/react-toastify/dist/ReactToastify.css';
import {Routes , Route} from 'react-router-dom';
import HomePage from "./components/Common Pages/HomePage";
import About from "./components/Common Pages/About";
import Contactus from "./components/Common Pages/Contactus";
import Policy from "./components/Common Pages/Policy";
import PageNotFound from "./components/Common Pages/PageNotFound";
import Register from "./components/Authentication Pages/Register";
import Login from "./components/Authentication Pages/Login";
import PrivateRoute from "./components/Authentication Pages/Private";
import Dashboard from "./components/User Pages/Dashboard";
import ForgotPasssword from "./components/Authentication Pages/ForgotPassword";
import AdminRoute from "./components/Authentication Pages/AdminRoute";
import AdminDashboard from "./components/Admin Pages/AdminDashboard";
import Orders from "./components/User Pages/Orders";
import Profile from "./components/User Pages/Profile";
import UpdateProfile from "./components/User Pages/UpdateProfile";
import CreateCategory from "./components/Admin Pages/CreateCategory";
import CreateProduct from "./components/Admin Pages/CreateProduct";
import Products from "./components/Admin Pages/Products";
import UpdateProduct from "./components/Admin Pages/UpdateProduct";
import AdminOrders from "./components/Admin Pages/Orders(admin)";
import Search from "./components/Common Pages/Search";
import ProductDetails from "./components/Common Pages/ProductDetails";
import Categories from "./components/Authentication Pages/Categories";
import CategoryProduct from "./components/Authentication Pages/CategoryProduct";
import CartPage from "./components/Common Pages/CartPage";

function App()  {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<HomePage/>} />
        <Route path = '/Product/:slug' element = {<ProductDetails/>} />
        <Route path = '/Categories' element ={<Categories/>} />
        <Route path= '/Cart' element={<CartPage />} />
        <Route path = '/Category/:slug' element ={<CategoryProduct/>} />
        <Route path = '/Search' element ={<Search/>}/>
        <Route path = '/About' element = {<About/>} />
        <Route path = '/Contact' element = {<Contactus/>} />
        <Route path = '/Policy' element = {<Policy/>} />
        <Route path = '/*' element = {<PageNotFound/>} />
        <Route path = '/Register' element = {<Register/>} />
        <Route path = '/Login' element = {<Login/>} />
        <Route path = '/Forgot-Password' element = {<ForgotPasssword/>} />
        <Route path = '/Dashboard' element = {<PrivateRoute/>} >
           <Route path = 'user' element = {<Dashboard/>} /> 
           <Route path = 'user/Orders' element = {<Orders/>} />
           <Route path = 'user/UpdateProfile' element = {<UpdateProfile/>} />
           <Route path = 'user/Profile' element = {<Profile/>}/>
        </Route>
        <Route path = '/Dashboard' element = {<AdminRoute/>} >
           <Route path = 'admin' element = {<AdminDashboard/>} />
           <Route path = 'admin/Create-Category' element = {<CreateCategory/>} />
           <Route path = 'admin/Create-Product' element = {<CreateProduct/>} />
           <Route path = 'admin/Product/:slug' element = {<UpdateProduct/>} />
           <Route path = 'admin/products' element = {<Products/>} />
           <Route path = 'admin/AdminOrders' element = {<AdminOrders/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
