import { Route, Routes } from "react-router-dom";
import "./App.css";
import 'react-loading-skeleton/dist/skeleton.css'
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import RequireAuth from "./Pages/Auth/RequireAuth";
import UpdateUser from "./Pages/Dashboard/Users/UpdataUser";
import UpdateCatg from "./Pages/Dashboard/Categories/UpdataCatg";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import Catg from "./Pages/Dashboard/Categories/Catg";
import AddCatg from "./Pages/Dashboard/Categories/AddCatg";
import Products from "./Pages/Dashboard/Products/Products";
import AddProduct from "./Pages/Dashboard/Products/AddProduct";
import UpdateProducts from "./Pages/Dashboard/Products/UpdataProducts";
import LoginRegisterAuth from "./Pages/Auth/LoginRegisterAuth";
import Categories from "./Pages/Website/Categories";
import Website from "./Pages/Website/WebSite";
import Home from "./Pages/Website/Home";
import SingleProduct from "./Pages/Website/SingleProduct";
import ScrollToTop from "./helpers/ScrollToTop";
import Cart from "./Pages/Website/Cart";
import Shop from "./Pages/Website/Shop";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          {/*Public routes*/}
          <Route element={<Website />}>
            <Route path="/" element={<Home />}/>
            <Route path="/*" element={<Home />} />
            <Route path="/categories" element={<Categories />}/>
            <Route path="/shop" element={<Shop />}/>
            <Route path="/product/:id" element={<SingleProduct />}/>
            <Route path="/cart" element={<Cart />}/>
          </Route>
          <Route element={<LoginRegisterAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/auth/google/callback" element={<GoogleCallBack />} />
          {/*Protected routes*/}

          <Route element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route element={<RequireAuth allowedRole={["1995"]} />}>
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UpdateUser />} />
                <Route path="users/add" element={<AddUser />} />
              </Route>
              <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
                <Route path="categories" element={<Catg />} />
                <Route path="categories/:id" element={<UpdateCatg />} />
                <Route path="categories/add" element={<AddCatg />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<UpdateProducts />} />
                <Route path="products/add" element={<AddProduct />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </QueryParamProvider>
    </div>
  );
}

export default App;
