import React from 'react';
import { connect } from "react-redux";


const Home = (props) => {
  const { entries } = props

  return (
    <div>
      <div className="container-fluid entry-container">
        <h3>Location</h3>
        <ul>
          {/* {entries.map(entry => (
            <li key={entry}>{entry}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    entries: state
  };
};

export default connect(mapStateToProps)(Home);