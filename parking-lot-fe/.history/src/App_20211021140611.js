import './App.css';
import {Switch, Route} from "react-router-dom";
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Error from './pages/Error';

function App() {
  return (
    <div className="App font-mono">
          <h1 class="mb-12 text-5xl">SIMPLE CALENDAR APP</h1>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/edit/:id" component={Edit} />
            <Route exact path="/error" component={Error} />
        </Switch>        
    </div>
  );
}

export default App;
