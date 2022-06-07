import React, { Component } from 'react';
import { Route , Routes} from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import {FetchData} from "./components/FetchData";
import SendForm from "./components/SendForm";

const App: React.FC = () => {
    return (
        <Layout>
            <Routes>
               {/* <Route path='/' element={<Home/>} />*/}
                <Route path='/' element={<SendForm/>}/>
                <Route path='/fetch-data' element={<FetchData/>} />
            </Routes>
        </Layout>
    );
};

export default App;