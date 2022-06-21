import { createContext, useContext, useState } from 'react'
import toast, { Toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItem, setCartItem] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const [qty, setQty] = useState(1)

    const onAdd = (product, quatity) => {
        const checkProductInCart = cartItem.find((item) => item._id === product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quatity);
        setTotalQty((prevTotalQty) => prevTotalQty + quatity)

        if (checkProductInCart) {
            const updatedCartItems = cartItem.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quatity: cartProduct.quatity + quatity
                }
            })
            setCartItem(updatedCartItems)
        }
        else {
            product.quatity = quatity
            setCartItem([...cartItem, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to the cart`)

    }


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
            qty,
            incQty,
            decQty,
            onAdd,
            showCart,
            setShowCart
        }}>
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context)