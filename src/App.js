import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";

import LandingPage from './components/LandingPage.js';
import LogInPage from './components/LogInPage.js'
import RegisterPage from './components/RegisterPage.js'
import AboutPage from './components/AboutPage.js'
import MarketplacePage from './components/MarketplacePage.js'
import UserAccountPage from './components/UserAccountPage.js'
import CheckoutPage from './components/CheckoutPage.js'
import ReduxResetPage from './components/ReduxResetPage.js'

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/login" component={LogInPage} /> {/* the same: <Route path="/login"><LogInPage/></Route> */}
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/marketplace" component={MarketplacePage} />
                    <Route path="/useraccount" component={UserAccountPage} />
                    <Route path="/checkout" component={CheckoutPage} />
                    <Route path="/resetredux" component={ReduxResetPage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
