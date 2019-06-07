//libraries
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

//components
import HomeSphere from './Home-Sphere';
import Home from './Home';
import Nav from './Nav';
import Map from './Map';

//redux
import { fetchNearby } from '../redux/store';

//styles
import '../styles/App.css';

class App extends Component {
  async componentDidMount() {
    // var socket = io('https://localhost:8443');
    // socket.on('updateNearby', entry => {
    //   console.log(entry);
    // });

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.props.fetchNearby({
        coordinate: { latitude, longitude },
        distance: 500,
      }); //distance is in feet 5280ft = 1mi
    });

    const googleMapsScript = document.createElement('script');
    googleMapsScript.type = 'text/javascript';
    googleMapsScript.defer = true;
    await axios
      .get('/googlemaps')
      .then(response => response.data)
      .then(script => (googleMapsScript.innerHTML = script))
      .then(() =>
        document.getElementsByTagName('head')[0].appendChild(googleMapsScript)
      );
  }

  googleMapsScript;

  render() {
    return (
      <div>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/homesphere" component={HomeSphere} />
        {/* <Route path="/entry" component={Entry} /> */}
        <Route exact path="/map" component={Map} />
      </div>
    );
  }
}

export default connect(
  null,
  { fetchNearby }
)(App);
