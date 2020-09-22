import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import NotFound from './pages/NotFound/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={DashboardLayout} exact />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
