import React from 'react';
import { Route , Routes} from 'react-router';
import { Layout } from './components/Layout';

import './custom.css'
import {FetchData} from "./components/FetchData";
import TryCredit from "./components/TryCredit";

const App: React.FC = () => {
    return (
        <Layout>
            <Routes>
                {/* <Route path='/' element={<Home/>} />*/}
                <Route path='/' element={<TryCredit/>}/>
                <Route path='/fetch-data' element={<FetchData/>} />
            </Routes>
        </Layout>
    );
};

export default App;