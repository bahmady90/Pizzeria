import {RouterProvider, createBrowserRouter} from "react-router-dom";
import { loader as orderLoader} from "./features/order/Order";
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder";
import Menu, {loader as menuLoader} from "./features/menu/Menu";
import {action as updateOrderAction} from "./features/order/UpdateOrder"

import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";




const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    errorElement: <Error/>,
    children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/menu",
          element: <Menu/>,
          loader: menuLoader,
          errorElement: <Error/>,
        },
        {
          path: "/cart",
          element: <Cart/>
        },
        {
          path: "/order/:orderId",
          element: <Order/>,
          loader: orderLoader,
          errorElement: <Error/>,
          action: updateOrderAction
        },
        { 
          path: "/order/new",
          element: <CreateOrder/>,
          action: createOrderAction
        },
      ]
  },
 
]);




export default function App() {

  
  return (
    <RouterProvider
      router={router}
    />
  )
}

