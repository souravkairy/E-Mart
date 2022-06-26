import React from 'react'
import { HeroBanner, FooterBanner, Product } from '../componets'
import { client } from '../lib/client'

const index = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBannerData={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Speaker There are many variations passages</p>
      </div>
      <div className="products-container">
        {
          products.map((product, key) => <Product productData={product} key={key} />)
        }
      </div>

      <FooterBanner footerBannerData={bannerData.length && bannerData[0]} />
    </>
  )
}



export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { products, bannerData }
  }
}

export default index