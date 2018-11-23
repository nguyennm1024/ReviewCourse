import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router} from 'react-router-dom';

// let state = {};

// window.setState = (changes) => {
//     state = Object.assign({}, state, changes);
//     ReactDOM.render(<App {...state}/>, document.getElementById('root'));
// }

// let initialState = {
//     name: "Duong",
//     location: location.pathname.replace(/^\/?|\/$/g, "")
// };
ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
//window.setState(initialState);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
