import logo from './logo.svg';
import './App.css';
import {Switch, Route} from "react-router-dom";
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/edit" component={Edit} />
        </Switch>        
    </div>
  );
}

export default App;