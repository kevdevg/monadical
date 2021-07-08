import React from 'react';
import './App.css';
import {useRoutes} from "react-router";
import routes from "./routes";

const App = () => {
    const routing = useRoutes(routes);
    return (
        <div className="App">
            {routing}
        </div>
    );
}

export default App;