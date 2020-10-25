
const reducer = (state, action) =>{
    if(action.type === "REMOVE_ALL"){
        return{
            ...state, cart:[]
        }
    }
    else if(action.type === "REMOVE_ITEM"){
        const newItem = state.cart.filter((cartItem)=>
                cartItem.id !== action.payload)
        return{
            ...state, cart:newItem
        }
    }else if(action.type ==="INCREASE"){
        let tempCart = state.cart.map((cartItem)=>{
                if(cartItem.id === action.payload){
                    return{...cartItem, amount: cartItem.amount+1}
                }
            return cartItem
        })
        return{
            ...state, cart:tempCart
            }
    }else if(action.type ==="DECREASE"){
        let tempCart = state.cart.map((cartItem)=>{
                if(cartItem.id === action.payload){
                    return{...cartItem, amount: cartItem.amount-1}
                }
            return cartItem
        }).filter((cartItem)=>cartItem.amount !== 0)
        return{
            ...state, cart:tempCart
            }
    }else if(action.type === "UPDATE_AMOUNT"){
        let {total, amount} = state.cart.reduce(
            (cartTotal, cartItem)=>{
            const {price, amount} = cartItem
            const itemTotal = price * amount

            cartTotal.total += itemTotal
            cartTotal.amount += amount
            return cartTotal 
        },{
            total:0,
            amount:0
        })
    total = parseFloat(total.toFixed(2))
    return { ...state, total, amount }
    }else if(action.type ==="LOADING"){
        return{...state, loading:true}
    }else if(action.type === "DISPLAY_CART"){
        return{...state, cart:action.payload, loading:false}
    }         
}
export default reducer