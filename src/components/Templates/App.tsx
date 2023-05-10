import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Organisms/Navbar/Navbar";
import FakeStoreService from "../../services/FakeStoreService/FakeStoreService";
import { ProductI } from "../../services/FakeStoreService/FakeStoreService.utils";

interface AppInterface {
    children: React.ReactNode;
}

const App = ({ children }: AppInterface) => {
    const navigate = useNavigate();
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

    const searchOnClick = async (value: string) => {
        if (value) {
            navigate(`/items?search=${value}`);
        }
    };

    return (
        <React.Fragment>
            <Navbar productsList={productsList} searchOnClick={searchOnClick} />
            <main>
                {children}
            </main>
        </React.Fragment>
    );
};

export default App;