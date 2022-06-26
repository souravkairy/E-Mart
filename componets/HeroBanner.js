import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const HeroBanner = ({ heroBannerData }) => {
    return (
        <>
            <div className="hero-banner-container">
                <div>
                    <p className="beats-solo">
                        {heroBannerData.smallText}
                    </p>
                    <h3>{heroBannerData.midText}</h3>
                    <h1>{heroBannerData.largeText1}</h1>
                    <img src={urlFor(heroBannerData.image)} alt="headphones" className='hero-banner-image' />
                    <div>
                        <Link href={`/product/${heroBannerData.product}`}>
                            <button className='button'>{heroBannerData.buttonText}</button>
                        </Link>
                        <div className="desc">
                            <h5>Description</h5>
                            <p>{heroBannerData.desc}</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HeroBanner