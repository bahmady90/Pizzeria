import {formatCurrency} from "../../utility/helpers"


function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice, addIngredients, removeIngredients } = item;

  const filteredIngredients = ingredients.filter((el) => !removeIngredients.includes(el));
  const updatedIngredients = [...filteredIngredients, ...addIngredients];

  
  return (
    <li className="py-3 ">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p><span>{quantity}&times;</span> {name}</p>
        <div className="flex items-center gap-4 text-[10px] capitalize italic">
          {isLoadingIngredients ? "loading..." : updatedIngredients.join(", ")}
        </div>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
