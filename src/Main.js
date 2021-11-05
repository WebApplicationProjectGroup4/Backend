import './styles/Main.css'

const React = require('react'); 
const ReactDOM = require('react-dom'); 

// TODO:
// customer / admin ui
// components for shopping cart, login
// restaurant browsing could be the front page and automatically loaded to UI before login
// order food -> pay -> order preparing, ready, delivering... -> delivery ok, order closed
// create account
// order history
// admin component for creating restaurant

// information should not be lost during reboot so most of this has to eventually go to database

const shoppingCart = props => {
  

  // keeps track of food orders from this current customer
  // customer username/unique id could be passed to this as props
  // needs functions/components for adding & deleting stuff
}

const foodOrderingSystem = props => {

  // this will be in direct relation with shoppingCart component
  // i think we can do it all in a single component
  // checkout order -> display delivery ETA etc

  // when order is closed after successful delivery,
  // this should pass some info back to database
  // to order history
}

const adminUI = props => {


  // render more stuff
  // create restaurant etc
}

const login = props => {

console.log("test");

// this could render a username + pw window/element
// save it to local variables, pass to database
// compare returned username + pw from database to local variables

// admin check in here or in mysql
// we could add an admin entry to user table in mysql
// if admin == true launch admin UI else customer UI (default)
}

function Header() {
    return (
      <nav>
        <ul>
          <li> Search bar </li>
          <li> Asiakaspalvelu </li>
          <li></li>

          <button onClick= {() => login()}> Kirjaudu </button>

        </ul>
      </nav>
    )
}

function Main() {
  return ReactDOM.render(
	<Header />,
	document.getElementById('root')
  )
}

export default Main;