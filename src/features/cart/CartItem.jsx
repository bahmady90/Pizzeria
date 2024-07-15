
import { useSelector } from "react-redux";
import {formatCurrency} from "../../utility/helpers"
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";
import { useEffect, useMemo, useState } from "react";

import Button from "../../ui/Button";
import DeleteItem from "./DeleteItem";
import ChangeIngredients from "./ChangeIngredients";
import { useFetcher } from "react-router-dom";








function CartItem({item}) {

  const { pizzaId, name, quantity, totalPrice } = item;

  
  const fetcher = useFetcher();

  useEffect(function() {
    if(!fetcher.data && fetcher.state === "idle")
    fetcher.load("/menu");
  }, [fetcher])


  const ingredients =  useMemo( () => fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? [], [item.pizzaId, fetcher.data]);
    
  const [openChangeIngredientsMenu, setOpenChangeIngredientsMenu] = useState(null);
  
  const [pizzaIngredients, setPizzaIngredients] = useState([]);

  useEffect(function(){
    setPizzaIngredients(ingredients)
  },[ingredients])


  
  let addIngredients = [];
  let removeIngredients = [];


  pizzaIngredients.forEach((el) => {
    if(!ingredients.includes(el)){
      addIngredients.push(el);
    }
  })

  ingredients.forEach((el) => {
    if(!pizzaIngredients.includes(el)){
      removeIngredients.push(el)
    }
  })
  
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  
  function handleClick(){
    setOpenChangeIngredientsMenu(pizzaId);
  }

  if(openChangeIngredientsMenu === pizzaId) return (
    <ChangeIngredients 
      name={name}
      pizzaIngredients={pizzaIngredients}
      onSetPizzaIngredients={setPizzaIngredients}
      setOpenChangeIngredientsMenu={setOpenChangeIngredientsMenu}
      pizzaId={pizzaId}
      addIngredients={addIngredients}
      removeIngredients={removeIngredients}
      isLoadingIngredients={fetcher.state === "loading"}   
  />
  )
    

  return (
    <li className="py-3 sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <p className="text-sm mb-2"><span className="text-l mr-2">Ingredients:</span> {fetcher.state === "loading" ? "...loading" : pizzaIngredients.join(", ")}{fetcher.state !== "loading" &&
         <span className="ml-2"><Button type="verySmall" onClick={handleClick}>⚙️</Button></span>}</p>
      <div className="flex items-center justify-between sm:gap-8">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
        <DeleteItem pizzaId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
