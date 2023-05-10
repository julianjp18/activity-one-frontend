import React from "react";
import { Helmet } from 'react-helmet';
import { ProductI } from "../../../services/FakeStoreService/FakeStoreService.utils";

interface HelmetI {
    product?: ProductI;
}

const HelmetComponent = ({ product }: HelmetI) => {
    return (
        <Helmet>
            <title>{product?.title ?? 'Mercado Libre'}</title>
            <meta charSet="utf-8" />
            <meta name="description" content={product?.description?.slice(0,200) ?? product?.title ?? ''} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={product?.title ?? 'Mercado Libre'} />
            <meta property="og:description" content={product?.description?.slice(0,200) ?? product?.title ?? ''} />
            { /* End Facebook tags */ }
            { /* Twitter tags */ }
            <meta name="twitter:creator" content={'Julian Perez'} />
            <meta name="twitter:card" content="article" />
            <meta name="twitter:title" content={product?.title ?? 'Mercado Libre'} />
            <meta name="twitter:description" content={product?.description?.slice(0,200) ?? product?.title ?? ''} />
            <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
    );
}

export default HelmetComponent;