import './App.css';
import {Switch, Route} from "react-router-dom";
import Home from './pages/Home';
import Cars from './pages/Cars';

function App() {
  return (
    <div className="App font-mono">
          <h1 className="mb-12 text-5xl">PARKING SLOTS</h1>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cars" component={Cars} />
        </Switch>        
    </div>
  );
}

export default App;
