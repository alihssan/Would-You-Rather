import React,{Component,Fragment} from 'react'
import Leaderboard from './Leaderboard'
import Ask from './Ask.js'
import QuestionDrawer from './Card'
import Nav from './Nav'
import {connect} from 'react-redux'
import {handleData} from '../actions/combine_actions'
import LoadingBar from 'react-redux-loading'
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import Login from './Login'
import Questions from './Questions'
import Error from './Error'

class App extends Component{

  componentDidMount(){
    this.props.dispatch(handleData())

  }
  
  render(){
    const {loadingBar}=this.props
    
  return (
    <Router>
    <div>
      <LoadingBar/>
      <Fragment>
            <div className="main">
                <Nav/>
            </div>
            {loadingBar!==true && (
              <div className="user">
                <div className="show">
                    <img className="avatar" alt={this.props.User.id} src={this.props.User.avatarURL}/>
                    <p>Hello {this.props.User.name}!</p>
                </div>
            </div>
            )

            }
	<Fragment>
	  <Switch>
            <Route path='/login' render={(props)=>(<Login/>)}/>
            <Route path='/' exact render={(props)=>(
              loadingBar===true ? <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/> :<QuestionDrawer/>
            )}/>
            <Route path='/add' render={(props)=>(
              loadingBar===true ? <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>:<Ask/>

            )}/>
            <Route path='/leaderboard' render={(props)=>(
              loadingBar===true ? <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/> :<Leaderboard/>

            )}/>
             <Route path='/question/:id' render={(props)=>(
              loadingBar===true ? <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/> :<Questions/>

            )}/>
            <Route component={Error}/>
	</Switch>
            </Fragment>
          
            

            </Fragment>

    </div>
    </Router>
  );
}
}
function mapStateToProps({AuthenUser,user_reducer,question_reducer}){
  return{
     loadingBar: AuthenUser===null,
     User:user_reducer[AuthenUser],
     user_reducer
  }

}
export default connect(mapStateToProps)(App)

