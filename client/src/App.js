import React, { Component } from 'react';
// import './App.css';
import Home from './Components/Home/Home';
import Login from './Login';
import Admin from './Components/Admin/Admin';
import Student from './Components/Student/Student';
import Teacher from './Components/Teacher/Teacher';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from './Auth';


class App extends Component {
  render() {
    let mainComponent = "";
    switch(this.props.location) {
      case "":
        mainComponent = <Home />;
        break;
    }

    return (
        // <div>
        //   <Router>
        //     <div>
        //       <Login></Login>
        //       <Switch>
        //         <Route path="/admin" component={Admin} />
        //         <Route path="/student" component={Student} />
        //         <Route path="/teacher" component={Teacher} />
        //       </Switch>
        //     </div>
        //   </Router>
        // </div>
      //<Test1 />
      // <Home />
      <Auth />
      // <Home />
    );
  }
}

export default App;
