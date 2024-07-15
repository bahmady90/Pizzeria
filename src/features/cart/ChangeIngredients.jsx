import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCartIngredients } from "./cartSlice";
import Button from "../../ui/Button";


export default function ChangeIngredients({name, onSetPizzaIngredients, pizzaIngredients, 
    setOpenChangeIngredientsMenu, pizzaId, addIngredients, removeIngredients, isLoadingIngredients}) {

    
    
    // Get the menu-data
    const fetcher = useFetcher();
    const dispatch = useDispatch();

    const [addIng, setAddIng] = useState(pizzaIngredients[0]);
    const [removeIng, SetremoveIng] = useState("");

    useEffect(function() {
    if(!fetcher.data && fetcher.state === "idle")
    fetcher.load("/menu");
    }, [fetcher])

    //get all ingredients
    const allIngredientsWithDouplicates = fetcher?.data?.map((el) => el.ingredients)
    let allIngredients = [];
    allIngredientsWithDouplicates?.forEach((list) => {
        list.forEach((el) => {
            if(!allIngredients.includes(el)){
                allIngredients.push(el);
            }
        })
    })
    //sort all ingredients without duplicates
    const allIngredientsSorted = allIngredients.sort((a,b) => a.charCodeAt(0) - b.charCodeAt(0));

    function handleAddIngredient(ingredient) {
        onSetPizzaIngredients([...pizzaIngredients, ingredient]);
        
    }

    function handleDeleteIngredient(ingredient) {
        onSetPizzaIngredients((pizzaIngredients) => pizzaIngredients.filter((item) => item !== ingredient));
        
    }

    function submitChangeIngedrients(){
        console.log("object");
        dispatch(updateCartIngredients(pizzaId, pizzaIngredients, addIngredients, removeIngredients));
        setOpenChangeIngredientsMenu(null);

    }
   

  return (
    <div className="flex-row items-center justify-center">

        <div className="flex justify-center gap-6 sm:gap-8  z-10">
            <div>
                <h2>Pizza {name}:</h2>
                <select className="mr-2 sm:mr-5" value={removeIng} onChange={(e) => SetremoveIng(e.target.value)}>
                {pizzaIngredients.map((el, index) =>    
                    <option key={index} className="ml-20 mt-1 text-sm hover:text-lg" value={el}>{el}</option>  
                )}
                </select>
                <Button className="!mr-0" onClick={() => handleDeleteIngredient(removeIng)} type="round">-</Button>
            </div>
            <div>
                <h2>{isLoadingIngredients ? "Loading..." : "All Ingredients:"}</h2>
                <select className="mr-2 sm:mr-5" value={addIng} onChange={(e) => setAddIng(e.target.value)}>
                {allIngredientsSorted.map((el, index) => 
                    <option key={index} className="ml-4 mt-1 text-sm hover:text-lg" value={el}>{el}</option>
                )}
                </select>
                <Button onClick={() => handleAddIngredient(addIng)} type="round">+</Button>
                
            </div>
        </div>
        <div className="flex items-center justify-center mt-4">
        <Button type="round"
            onClick={submitChangeIngedrients}>Submit Changes</Button>
        </div>
    </div>  
  )
}
