
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'

export default function UpdateItemQuantity({pizzaId, currentQuantity}) {

    const dispatch = useDispatch();
    

  return (
    <div className='flex gap-1 items-center md:gap-3'>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
      <span className='test-sm font-medium'>{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
    </div>
  )
}
