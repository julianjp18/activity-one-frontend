import React, { useEffect, useState } from "react";
import { Skeleton } from 'antd';
import { useLocation } from 'react-router-dom';
import Breadcrumb from "../../components/Atoms/Breadcrumb/Breadcrumb";
import App from "../../components/Templates/App";
import ProductsList from '../../components/Templates/ProductsList/ProductsList';
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";

import './ProductSearchList.scss';
import ElementsNotFound from "../../components/Organisms/ElementsNotFound/ElementsNotFound";

const INIT_BREADCRUMB = [{
    text: 'Resultado Búsqueda',
}];

const ProductSearchList = () => {
    const { search } = useLocation();
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(new URLSearchParams(search));
    const [breadcrumb, setBreadcrumb] = useState(INIT_BREADCRUMB);
    const [productToShow, setProductToShow] = useState<ProductI[]>([]);
    
    useEffect(() => {
        const params = new URLSearchParams(search);
        setQuery(params);
        getProductsList(params || ':query' || '');
    }, [search]);
    
    const findProductsBySearch = (queryToFind: string, products: ProductI[]) => {
        const result: any[] = [];
        if (products.length > 0) {
            products.forEach((product: ProductI) => {
                if (product.title.toLocaleLowerCase().includes(queryToFind.toLocaleLowerCase())) {
                    result.push(product);
                }
            });
        }
        setBreadcrumb([
            ...INIT_BREADCRUMB,
            { text: `${query.get('search')}` }
        ]);
        return result.slice(0, 4);
    }

    const getProductsList = async (params: any) => {
        setLoading(true);
        const value = params === ':query' ? ':query' : params.get('search');
        const response = await FakeStoreService.getProducts(value);
        if (response.statusCode === 200 && response.data) {
            setProductToShow(findProductsBySearch(value, response.data));
        }
        setLoading(false);
    }

    return (
        <App>
            <Breadcrumb items={breadcrumb} />
            {productToShow.length > 0
                ? <ProductsList products={productToShow} /> : loading ? <Skeleton active /> : <ElementsNotFound />}
        </App>
    );
};

export default ProductSearchList;