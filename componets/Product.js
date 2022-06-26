import React from 'react'
import { urlFor } from '../lib/client'
import Link from 'next/link'

const Product = ({ productData: { image, name, slug, price } }) => {
    return (
        <>
            <Link href={`/product/${slug.current}`}>
                <div className="product-card">
                    <img src={urlFor(image && image[0])} alt={name} height={250} width={250} className="product-image" />
                    <p className="product-name">{name}</p>
                    <p className="product-price">${price}</p>
                </div>
            </Link>

        </>
    )
}

export default Product