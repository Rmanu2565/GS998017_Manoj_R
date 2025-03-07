import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/Components/Home';
import Sku from '../Pages/Components/Sku';
import Calculation from '../Pages/Components/Calculation';
// import FinancialTable from '../Pages/Components/Calculation';

function Common_Router() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path=''
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
                </Routes>

            </Router>
        </>
    )
}

export default Common_Router