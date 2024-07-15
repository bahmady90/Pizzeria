import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utility/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

import Button from "../../ui/Button"
import EmptyCart from "../cart/EmptyCart"
import store from "../../store"

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {

  const [withPriority, setWithPriority] = useState(false);


  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice
  const formErrors = useActionData();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress
  } = useSelector(state => state.user);

  const isLoadingStatus = addressStatus === "loading"
  const dispatch = useDispatch();
  

  if(!cart.length) return <EmptyCart/>

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-seminbold">Ready to order? Let's go!</h2>
      
      <Form method="POST" action="/order/new">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required className="input grow" defaultValue={username}/>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full"/>
            {formErrors?.phone && <p className="text-red-600 bg-red-100 text-xs mt-2 border-2 border-black rounded">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required 
            className="input w-full" disabled={isLoadingStatus} defaultValue={address}/>

            {addressStatus === "error" && <p className="text-red-600 bg-red-100 text-xs mt-2 border-2 border-black rounded">{errorAddress}</p>}
            {!position.latitude && !position.longitude &&<span className="absolute left-[370px] top-[20px] sm:left-[500px] sm:down-[100px] z-50 " >
              <Button type="small" disabled={isLoadingStatus}
                onClick={(e) => 
                { e.preventDefault();
                  dispatch(fetchAddress())}}
                  >Get Position</Button>
            </span>}
          </div>
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude}, ${position.longitude}` : "" }></input>
          <Button type="primary" disabled={isSubmitting}>{isSubmitting ? "Placing order..." : `Order now for ${formatCurrency(totalPrice)}` }</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}){

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const {priority} = data;
  const order = {...data, cart: JSON.parse(data.cart), priority: priority ? true : false}
  console.log(order)

  const errors = {};
  if(!isValidPhone(order.phone)){errors.phone = 
    "Please give us your phonenumber. We might need it to contact you.";}
  
  if(Object.keys(errors).length > 0){return errors;}

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);

  
}


export default CreateOrder;
