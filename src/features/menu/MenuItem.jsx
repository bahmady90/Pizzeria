import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import {formatCurrency} from "../../utility/helpers"
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/deleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  
  
  
  function handleAddToCart(){
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice
    }
    dispatch(addItem(newItem));

  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}/>
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {currentQuantity > 0 && 
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/>
              <DeleteItem pizzaId={id}/>
            </div>}
          {(!soldOut && currentQuantity === 0) && 
            <Button type="small" onClick={handleAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  )
}

export default MenuItem;
