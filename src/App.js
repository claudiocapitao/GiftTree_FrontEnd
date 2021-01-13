import "./App.css";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>

                    <Route path="*">
                        <img src="https://media3.giphy.com/media/9J7tdYltWyXIY/giphy.gif?cid=ecf05e47nxxxd9893gxmif28x7bmpl96w5et37fvkbmymj0s&rid=giphy.gif" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
