import { createContext, useContext, useState } from 'react'
import { Toast } from 'react-hot-toast'

const Context = createContext()




export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItem, setCartItem] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [totalQty, setTotalQty] = useState()
    const [Qty, setQty] = useState(1)

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1
        })
    }

    return (
        <Context.Provider value={{
            showCart,
            cartItem,
            totalPrice,
            totalQty,
            Qty,
            incQty,
            decQty
        }}>
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context)