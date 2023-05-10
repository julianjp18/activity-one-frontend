import React from 'react';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';

import Divider from '../../Atoms/Divider/Divider';
import { ProductI } from '../../../services/FakeStoreService/FakeStoreService.utils';

import './ProductItem.scss';

interface ProductItemI {
    product: ProductI;
}
const ProductItem = ({ product }: ProductItemI) => {
    const {
        id,
        title,
        picture,
        price: {
            amount,
            currency,
            decimals,
        },
        category_id,
    } = product;

    return (
        <React.Fragment>  
                    <div className="product-item-container">
                            <img className="product-item-img" src={picture} alt={title} />
                            <div className="product-item-description">
                                <Link to={`/items/${id}`}>
                                    <h2 className="price-text">$ {amount} {currency}</h2>
                                </Link>
                                <Link to={`/items/${id}`}>
                                    <h3 className="title-text">{title}</h3>
                                </Link>
                            </div>
                            <div className="product-item-extra-info">
                                <p className="category-text">{category_id ?? ''}</p>
                                <div className='rate-container'>
                                    <Rate value={decimals} disabled allowHalf />
                                    {decimals && <span className="ant-rate-text">{decimals}</span>}
                                </div>
                            </div>
                    </div>
            <Divider />
        </React.Fragment>
    );
};

export default ProductItem;