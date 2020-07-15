import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Imported Guarded route intends to provide protection on Price history page.
import GuardedRoute from './Components/GuardedRoute';

// Imported list of all pages containing within the app
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage'
import HomePage from './Pages/HomePage';
import PriceHistoryPage from "./Pages/PriceHistory";
import StocksPage from "./Pages/StocksPage";
import QuotePage from "./Pages/QuotePage";

// Main application for stock prices
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/"> <HomePage/> </Route>
                <Route path="/login"> <LoginPage/> </Route>
                <Route path="/register"> <RegisterPage/> </Route>
                <Route path="/stocks"> <StocksPage/> </Route>
                <Route path="/quote"> <QuotePage/> </Route>
                <GuardedRoute path="/price-history"> <PriceHistoryPage/> </GuardedRoute>
            </Switch>
        </Router>
    );
}

export default App;
