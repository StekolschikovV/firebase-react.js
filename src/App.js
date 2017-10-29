// App.js

import React, { Component } from 'react';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      app: [],
      name: '',
      lastName: '',
    }

    this._handlerForm = this._handlerForm.bind(this)
    this._handlerLastName = this._handlerLastName.bind(this)
    this._handlerName = this._handlerName.bind(this)
    this._handlerRemove = this._handlerRemove.bind(this)
    
    var config = {
      apiKey: "AIzaSyC9cG0p4nNOdYL4Wy60H7_i3JdFJfZmc2M",
      authDomain: "moviefire-11f08.firebaseapp.com",
      databaseURL: "https://moviefire-11f08.firebaseio.com",
      projectId: "moviefire-11f08",
      storageBucket: "moviefire-11f08.appspot.com",
      messagingSenderId: "588103576969"
    };
    firebase.initializeApp(config)

    this.leadsRef = firebase.database().ref('users')

    
    this.leadsRef.on('value', (users) => {
      let r = []
      users.forEach((user) => {
        let u = user.val()
        u.key = user.key
        r.push(u)
      })
      this.setState({
        app: r
      })
    })
  }

  componentWillMount() {
  }

  _handlerForm(e) {
    e.preventDefault()
    var newData = {
      name: this.state.name,
      lastName: this.state.lastName,
    }
    this.leadsRef.push(newData);
  }

  _handlerLastName(e) {
    this.setState({
      lastName: e.target.value
    })
  }

  _handlerName(e) {
    this.setState({
      name: e.target.value
    })
  }

  _handlerRemove(eK){
    var desertRef = this.leadsRef.child(eK);
    desertRef.remove();
  }

  render() {
    let li = this.state.app.map((e, i) => {
      return <li key={i}>{e.name} {e.lastName} <button onClick={() => this._handlerRemove(e.key)}>X</button></li>
    })
  
    return (
      <div>
        <form onSubmit={this._handlerForm}>
          <input type='text' placeholder={'name'} value={this.state.name} onChange={this._handlerName} />
          <input type='text' placeholder={'lastName'} value={this.state.lastName} onChange={this._handlerLastName} />
          <input type='submit' value={'save'} />
        </form>
        <ul id={'result'}>
          {li}
        </ul>
      </div>
    );
  }
}

export default App;