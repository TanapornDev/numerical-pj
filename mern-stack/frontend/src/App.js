import React from 'react';
import Navigation from './components/Navigation'
import bisection from './components/bisection'
import regression from './components/regression'
import linear from './components/linear'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={bisection} />
        <Route path="/edit/:id" component={regression} />
        <Route path="/regression" component={regression} />
        <Route path="/linear" component={linear} />
      </div>
    </Router>

  );
}

export default App;