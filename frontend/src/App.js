// essential
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// importing Components
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoMatch from './components/NoMatch'
import Login from './components/Login'
import PostJob from './components/employer/PostJob'

// testing
import ProtectedRoute from './components/ProtectedRoute'

// importing CSS
import './App.css';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>

        <ProtectedRoute exact path="/home" component={Home}></ProtectedRoute>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/postjob" component={PostJob}></Route>
      </Switch>
    </Router>
    
  )
}

export default App
