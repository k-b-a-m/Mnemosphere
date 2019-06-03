import React, {Component} from 'react';
import {getCurrentCoordinates} from '../utils/utils';
import Nav from './Nav';
import '../styles/Entry.css';
import { addEntryThunk, fetchEntries } from "../redux/store";
import { connect } from "react-redux";
import "../styles/Entry.css";

class Entry extends Component {
  constructor() {
    super();
    this.state = {
      entry: '',
      date: '',
      time: '',
      submittedEntry: '',
      curLatitude: 0,
      curLongitude: 0,
    };
  }

  handleChangeInput = evt => {
    const { target } = evt;
    this.setState({ entry: target.value });
  };

  getDateTime = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const hours =
      today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const minutes =
      today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const seconds =
      today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
    const time = hours + ":" + minutes + ":" + seconds;
    this.setState({ date, time });
  };
  componentDidMount() {
    this.getDateTime();
    this.interval = setInterval(() => this.getDateTime(), 1000);
    navigator.geolocation.getCurrentPosition(success => this.setState({
      curLatitude: success.coords.latitude,
      curLongitude: success.coords.longitude,
    }))
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     JSON.stringify(JSON.stringify(prevProps)) !==
  //       JSON.stringify(JSON.stringify(this.props)) ||
  //     prevState.date !== this.state.date
  //   ) {
  //     const submittedEntry = this.props.entries.filter(
  //       entry => entry.date === this.state.date
  //     )[0];
  //     this.setState({submittedEntry});
  //   }
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { entry, date, time } = this.state;
    return (
      <div className="container-fluid entry-container">
        <h3>Location</h3>
        <div>
          <form className="d-flex flex-column justify-content-center">
            <input
              type="text"
              value={entry}
              onChange={evt => this.handleChangeInput(evt)}
            />
          </form>
        </div>
        <button disabled={entry === ""}>Submit</button>
        <div className="date-container">
          <h3>{date}</h3>
          <h3>{time}</h3>
          {this.state.curLatitude ? <div><h5>Latitude: {this.state.curLatitude}</h5><h5>Longitude: {this.state.curLongitude}</h5></div> : <div/>}
        </div>
      </div>
    );
  }
}



export default connect(
  null,
  { addEntryThunk, fetchEntries }
)(Entry);
