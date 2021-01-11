import logo from './logo.svg';
import './App.css';
import {Input} from "./input/input.js";
import {Navbar} from "./Header/navbar";
import {View} from "./view/view";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={View} />
                <Route path="/input" component={Input} />
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
