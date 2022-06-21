import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'

const Cart = () => {
    const cartRef = useRef();
    const { cartItem, totalPrice, totalQty, setShowCart } = useStateContext();

    return (
        <div className='cart-wrapper' ref={cartRef}>
            <div className="cart-container">
                <button className='cart-heading' type='button' onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className='heading'>your cart</span>
                    <span className='cart-num-items'>({totalQty}items)</span>
                </button>
                {
                    cartItem.length < 1 && (
                        <div className='empty-cart'>
                            <AiOutlineShopping size={150} />
                            <h3>Your shopping cart is empty</h3>
                            <Link href='/'>
                                <button className='btn' type='button' onClick={() => setShowCart(false)}>
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    )
                }
                <div className="product-container">
                    {
                        cartItem.length >= 1 && cartItem.map((item, index) => (
                            <div className='product' key={item._id}>
                                <img src={urlFor(item?.image[0])} alt="" className='cart-product-image' />
                                <div className='item-desc'>
                                    <div className='flex top'>
                                        <h5>{item.name}</h5>
                                        <h4>${item.price}</h4>
                                    </div>
                                    <div className='flex bottom'>
                                        <div>
                                            <p className="quantity-desc">
                                                <span className='minus' onClick=''>
                                                    <AiOutlineMinus />
                                                </span>
                                                <span className='num'>
                                                    0
                                                </span>
                                                <span className='plus' onClick=''>
                                                    <AiOutlinePlus />
                                                </span>
                                            </p>
                                        </div>
                                        <button className='remove-item' type='button' onClick=''>
                                            <TiDeleteOutline />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {
                    cartItem.length >= 1 && (
                        <div className="cart-bottom">
                            <div className="total">
                                <h3>Subtotal:</h3>
                                <h3>${totalPrice}</h3>
                            </div>
                            <div className="btn-container">
                                <button type='button' onClick='' className="btn">
                                    Pay With Stripe
                                </button>
                            </div>
                        </div>
                    )
                }


            </div>

        </div>
    )
}

export default Cart