import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getNumberOfPizzas, getTotalPrice} from "./cartSlice";
import { formatCurrency } from "../../utility/helpers";

function CartOverview() {


  const numberOfPizzas = useSelector(getNumberOfPizzas);
  
  const totalPrice = useSelector(getTotalPrice);
  
  if(numberOfPizzas === 0) return null;

  return (

    <div className="bg-stone-800 text-stone-200 uppercase 
      flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{numberOfPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice)} Euro</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
