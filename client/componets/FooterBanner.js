import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const FooterBanner = ({ footerBannerData: { discount, largeText1, largeText2, midText, saleTime, image, product, buttonText, smalltext, desc } }) => {
    return (
        <div className='footer-banner-container'>
            <div className="banner-desc">
                <div className="left">
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3>{largeText2}</h3>
                    <p>{saleTime}</p>
                </div>
                <div className="right">
                    <p>{smalltext}</p>
                    <h3>{midText}</h3>
                    <p>{desc}</p>
                    <Link href={`product/${product}`}>
                        <button type='button'>
                            {buttonText}
                        </button>
                    </Link>
                    <img src={urlFor(image)} alt="" className='footer-banner-image' />
                </div>
            </div>


        </div>
    )
}

export default FooterBanner