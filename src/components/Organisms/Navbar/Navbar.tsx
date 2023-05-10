import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../../assets/images/navbar-logo.png';
import { ProductI } from "../../../services/FakeStoreService/FakeStoreService.utils";
import InputSearch from "../../Molecules/InputSearch/InputSearch";
import './Navbar.scss';

interface NavbarI {
    productsList: ProductI[];
    searchOnClick: (value: string) => void;
}
const Navbar = ({ productsList, searchOnClick }: NavbarI) => {
    const navigate = useNavigate();
    const searchResult = (query: string) => {
        const result: any[] = [];
        if (productsList.length > 0) {
            productsList.forEach(({ id, title }: ProductI) => {
                if (title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
                    const onClick = () => {
                        navigate(`/items/${id}`);
                    };
                    result.push({
                        value: `${title}`,
                        label: (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                            onClick={onClick}
                          >
                            {title}
                          </div>
                        ),
                      });
                }
            });
        }
        return result;
    }

    return (
        <header className="navbar-header">
            <div className="navbar-container">
                <Link to="/">
                    <img className="navbar-logo" src={Logo} alt="Test MercadoLibre logo, Academic purpose only" />
                </Link>
                <div className="navbar-search-bar">
                    <InputSearch searchResult={searchResult} onClick={searchOnClick} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;