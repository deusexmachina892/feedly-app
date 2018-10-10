import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';



import Header from './Header';
import Landing from './Landing'

const DashBoard = ()=><h2>DashBoard</h2>
const SurveyNew = ()=><h2>SurveyNew</h2>



class App extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
    return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact ={true} path = "/" component={Landing} />
                        <Route exact path = "/dashboard" component={DashBoard} />
                        <Route path = "/dashboard/createSurvey" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
//the first argument is reserved for the maps state to props argument or maps state to props function
export default connect(null, actions)(App);