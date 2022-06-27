import { createContext, useContext, useState, useEffect } from 'react'
import toast, { Toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItem, setCartItem] = useState(() => {
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        }
    })
    const [totalPrice, setTotalPrice] = useState(() => {
        if (typeof window !== 'undefined') {
            const localtotalPriceData = localStorage.getItem('totalPrice');
            return localtotalPriceData ? JSON.parse(localtotalPriceData) : 0
            return 0;
        }
    })
    const [totalQty, setTotalQty] = useState(() => {
        if (typeof window !== 'undefined') {
            const localtotalQtyData = localStorage.getItem('totalQty');
            return localtotalQtyData ? JSON.parse(localtotalQtyData) : 0
            return 0;
        }
    })
    const [qty, setQty] = useState(1)
    let foundProduct;
    let index;

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItem))
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
        localStorage.setItem('totalQty', JSON.stringify(totalQty))
    }, [cartItem, totalPrice, totalQty])





    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItem.find((item) => item._id === product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQty((prevTotalQty) => prevTotalQty + quantity)

        if (checkProductInCart) {
            const updatedCartItems = cartItem.map((cartProduct) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })
            setCartItem(updatedCartItems)

        }
        else {
            product.quantity = quantity
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
    const onRemove = (product) => {
        foundProduct = cartItem.find((item) => item._id === product._id);
        const newCartItems = cartItem.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setQty(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItem(newCartItems);
    }

    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItem.find((item) => item._id === id)
        index = cartItem.findIndex((product) => product._id === id);
        const newCartItems = cartItem.filter((item) => item._id !== id)

        if (value === 'inc') {
            setCartItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setQty(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItem([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setQty(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
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
            setShowCart,
            onRemove,
            toggleCartItemQuanitity,
            setCartItem,
            setTotalPrice,
            setTotalQty
        }}>
            {children}
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context)