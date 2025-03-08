import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/Components/Home';
import Sku from '../Pages/Components/Sku';
import Calculation from '../Pages/Components/Calculation';
import Login from '../Pages/Components/login';
// import FinancialTable from '../Pages/Components/Calculation';

function Common_Router() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path='/store'
                        element={<Home />}
                    />
                    <Route
                        path='/sku'
                        element={<Sku />}
                    />
                    <Route
                        path='/calculations'
                        element={<Calculation />}
                    />
                    <Route
                        path='/'
                        element={<Login />}
                    />
                </Routes>

            </Router>
        </>
    )
}

export default Common_Router