// essential
import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// importing Common Components
import Navbar2 from './components/common_assets/Navbar2'
import LoginForm from './components/common_assets/LoginForm'
import SignUp from './components/common_assets/Signup'
import About from './components/common_assets/About';

// importing Employer Components
import Employer from './components/employer/Employer'
import EmpNavbar from './components/employer/EmpNavbar'
import EmpViewProfile from './components/employer/ProfileView/EmpProfileView'
import EmpEditProfile from './components/employer/ProfileEditor/EmpEditProfile'
import PostJob from './components/employer/PostJob'

// importing Student Components
import Student from './components/student/Student'
import EditProfile from './components/student/Container/EditProfile/EditProfile'
import ViewProfile from './components/student/Container/ViewProfile/ViewProfile'
import AppliedJobs from './components/student/Container/AppliedJobs/AppliedJobs'
import SavedJobs from './components/student/Container/SavedJobs/SavedJobs'
import SearchJobs from './components/student/Container/SearchJobs/SearchJobs'

// importing Admin Components
import Admin from './components/admin/Admin'

// importing utils
import {ProtectedRoute} from './utils/protected.routes'

// importing CSS
import './App.css'
import auth from './utils/auth';



/* 
App will first check the 'localStorage' to check whether the user already logged in or not.
If the user is already logged in, the app will redirect to corresponding app (student.js, employer.js or admin.js)
*/
class App extends Component {
  constructor(){
    super()
    // this.state = {
    //   isAuthenticated : localStorage.getItem('isAuthenticated'), // to check whether user is already logged in
    //   userType : localStorage.getItem('userType') // to check the user type (student, employer, admin)
    // }
  }


  ContentToRender = () => {
    if(!auth.isAuthenticated()) return <LoginForm/>
    else {
      switch(localStorage.getItem('usertype')){
        case 'student': return <Student/>
        case 'employer': return <Employer/>
        case 'admin': return <Admin/>
      }
    }
  }

  // render accordingly depending on the usertype
  NavbarToRender = () => {
    if(!auth.isAuthenticated()) return null
    switch(localStorage.getItem('usertype')){
        case 'student'  : return <Navbar2/>
        case 'employer' : return <EmpNavbar/>
        case 'admin'    : return null
    }
  }

  render() { 
    return (
      <div>
        <this.NavbarToRender/>
        <Router>
          <Switch>
            {/* Public Routes */}
            <Route exact path="/" component={this.ContentToRender}></Route>
            <Route exact path="/login" component={LoginForm}></Route>
            <Route exact path="/signup" component={SignUp}></Route>


            {/* Employer Routes */}
            <ProtectedRoute exact path="/employer" component={Employer}></ProtectedRoute>
            <ProtectedRoute exact path="/employer/viewprofile" component={EmpViewProfile}></ProtectedRoute>
            <ProtectedRoute exact path="/employer/editprofile" component={EmpEditProfile}></ProtectedRoute>
            <ProtectedRoute exact path="/employer/about" component={About}></ProtectedRoute>
            <ProtectedRoute exact path="/employer/postjob" component={PostJob}></ProtectedRoute>

            {/* Student Routes */}
            <ProtectedRoute exact path="/student" component={EditProfile}></ProtectedRoute>
            <ProtectedRoute exact path="/student/editprofile" component={EditProfile}></ProtectedRoute>
            <ProtectedRoute exact path="/student/viewprofile" component={ViewProfile}></ProtectedRoute>
            <ProtectedRoute exact path="/student/appliedjobs" component={AppliedJobs}></ProtectedRoute>
            <ProtectedRoute exact path="/student/savedjobs" component={SavedJobs}></ProtectedRoute>
            <ProtectedRoute exact path="/student/searchjobs" component={SearchJobs}></ProtectedRoute>

            {/* Admin Routes */}
            <ProtectedRoute exact path="/admin" component={Admin}></ProtectedRoute>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
