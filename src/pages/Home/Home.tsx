import React, { useEffect, useState } from "react";
import { Skeleton } from 'antd';
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";
import ProductsList from '../../components/Templates/ProductsList/ProductsList';
import Breadcrumb from "../../components/Atoms/Breadcrumb/Breadcrumb";
import App from "../../components/Templates/App";

import './Home.scss';

const INIT_BREADCRUMB = [{
    text: 'Todos los productos',
}];

const Home = () => {
    const [breadcrumb, setBreadcrumb] = useState(INIT_BREADCRUMB);
    const [productsList, setProductsList] = useState<ProductI[]>([]);
    
    useEffect(() => {
        if (productsList.length === 0) {
            getProductsList();
        }
    }, []);
    
    const getProductsList = async () => {
        const response = await FakeStoreService.getProducts();
        if (response.statusCode === 200 && response.data) {
            setProductsList(response.data);
        }
    }

    return (
        <App>
            <Breadcrumb items={breadcrumb} />
            {productsList.length > 0
                ? <ProductsList products={productsList} /> : <Skeleton active />}
        </App>
    );
};

export default Home;