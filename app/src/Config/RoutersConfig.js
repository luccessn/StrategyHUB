import { routes } from "../Constants/Routes";
import { Home } from "../Pages/Home/Home";
import { LogIn } from "../Pages/User/Login/LogIn";
import { SignUp } from "../Pages/User/Signup/SignUp";

import { Products } from "../Pages/Products/Products";
import { AboutMe } from "../Pages/About/AboutMe";
import { ProductsDTL } from "../Pages/Products/ProductsDTL";
export const RoutersConfig = [
  { path: routes.Home, Component: Home },
  { path: routes.SignUp, Component: SignUp },
  { path: routes.LogIn, Component: LogIn },
  { path: routes.Products, Component: Products },
  { path: routes.ProductsDTL, Component: ProductsDTL },
  { path: routes.About, Component: AboutMe },
];
