import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import App from "../../components/Templates/App";
import Button from "../../components/Atoms/Button/Button";
import Breadcrumb from "../../components/Atoms/Breadcrumb/Breadcrumb";
import HelmetComponent from "../../components/Templates/Helmet/Helmet";
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";

import './ProductDetail.scss';

const INIT_BREADCRUMB = [{
    text: 'Todos los productos',
}];

const ProductDetail = () => {
    let { id } = useParams();
    const [breadcrumb, setBreadcrumb] = useState(INIT_BREADCRUMB);
    const [productToShow, setProductToShow] = useState<ProductI>();
    const navigate = useNavigate();
    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        if (id) {
            const response = await FakeStoreService.getProductById(id);
            if (response?.statusCode === 200 && response.data) {
                const isEmpty = Object.values(response.data[0]).find((value: any) => value !== undefined);

                if (isEmpty) {
                    setProductToShow(response.data[0]);
                    setBreadcrumb([
                        ...INIT_BREADCRUMB,
                        { text: `${response.data[0].category_id}`},
                        { text: response.data[0].title},
                    ]);
                }
            } else {
                navigate('/');
            }
        } else {
            navigate('/');
        }
    };

    const buyProductOnClick = () => {
        navigate(`/items/${id}/buy-cart`);
    };

    return (
        <App>
            {productToShow && (<HelmetComponent product={productToShow} />)}
            <Breadcrumb items={breadcrumb} />
            {productToShow ? (
                <div className="product-detail-container">
                    <div className="main-container">
                        <div className="left-side-container">
                            <img src={productToShow.picture} alt={productToShow.title} />
                        </div>
                        <div className="main-description-container">
                            <span className="main-category">{productToShow.category_id}</span>
                            <h1 className="main-title">{productToShow.title}</h1>
                            <h2 className="main-price">$ {productToShow.price} USD</h2>
                            <div className="buy-button-container">
                                <Button text="Comprar" onClick={buyProductOnClick} block />
                            </div>
                        </div>
                    </div>
                    <div className="description-container">
                        <h3 className="description-title">Descripción del producto</h3>
                        <p className="description-text">{productToShow.description}</p>
                    </div>
                </div>
            ) : (<Skeleton active />)}
        </App>
    );
};

export default ProductDetail;