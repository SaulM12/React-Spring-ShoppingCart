import { Typography } from '@mui/material'
import React from 'react'
import cardStyle from './productCard.module.css'
function ProductCard(props) {
    const { product } = props
    return (
        <a className={cardStyle.card} href={'/store/detail/' + product.id + '/' + product.category}>
            <div className={cardStyle.img_container}>
                <img src={product.image} alt='logo' className={cardStyle.img} />
            </div>
            <article className={cardStyle.description}>
                <Typography variant="p" mt={1} fontSize={20} component="h1" fontWeight={500}>
                    {product.name}
                </Typography>
                <Typography variant="p" fontSize={15} color={'#868686'} component="h2" fontWeight={500}>
                    {product.category}
                </Typography>
                <Typography mt={1} variant="p" fontSize={22} component="p" fontWeight={700}>
                    ${product.price.toFixed(2)}
                </Typography>
            </article>
        </a>
    )
}

export default ProductCard