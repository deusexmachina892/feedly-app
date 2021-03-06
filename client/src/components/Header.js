import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>;
            //when this.props.auth is an object
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }
    render(){
        console.log(this.props);
        return(
           <nav>
               <div className="nav-wrapper">
                    <Link   to={this.props.auth? '/dashboard':'/'}
                     className="left brand-logo">
                        Feedly
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                        
                    </ul>
               </div>
           </nav>
        )
    }
}

// function mapStateToProps(state){
//     return {auth: state.auth};
// }

function mapStateToProps({auth}){
    return {auth};
}
export default connect(mapStateToProps)(Header);