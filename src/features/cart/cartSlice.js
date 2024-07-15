import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart: [],
    // cart: [
    //     {
    //         pizzaId: 12,
    //         name: "Mediterranean",
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32,
    //     },
    // ]
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addItem(state, action){
            //payload: newItem
            state.cart.push(action.payload)
        },
        deleteItem(state,action){
            //playload: pizzaId
            state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
        },
        increaseItemQuantity(state, action){
            const item = state.cart.find((item => item.pizzaId === action.payload));
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action){
            const item = state.cart.find((item => item.pizzaId === action.payload));
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if(item.quantity === 0){
                cartSlice.caseReducers.deleteItem(state, action)
            }
        },
        clearCart(state){
            state.cart = [];
        },
        addPizzaIngredient: {
            prepare(pizzaId, ingredient){
                return{
                    payload: {pizzaId, ingredient}
                };
            },

            reducer(state, action){
                const item = state.cart.find( (item) => item.pizzaId === action.payload.pizzaId);
                item.ingredients = action.payload.ingredient;

            }
        },

        updateCartIngredients: {
            prepare(pizzaId, pizzaIngredients, addIngredients, removeIngredients){
                return{
                    payload: {pizzaId, pizzaIngredients, addIngredients, removeIngredients}
                };
            },

            reducer(state, action){
                const item = state.cart.find( (item) => item.pizzaId === action.payload.pizzaId);
                item.addIngredients = action.payload.addIngredients;
                item.removeIngredients = action.payload.removeIngredients;
                item.pizzaIngredients = action.payload.pizzaIngredients;


            }
        },

        

    }
});

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart, updateCartIngredients, addPizzaIngredient} = cartSlice.actions;

export default cartSlice.reducer;

export const getNumberOfPizzas = (state) => state.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0);

export const getTotalPrice = (state) => state.cart.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;


  