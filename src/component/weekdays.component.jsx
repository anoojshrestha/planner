import React, { Component } from "react";

class WeekDays extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <th>Montag</th>
        <th>Dienstag</th>
        <th>Mittwoch</th>
        <th>Donnerstag</th>
        <th>Freitag</th>
        <th>Samstag</th>
        <th>Sonntag</th>
      </React.Fragment>
    );
  }
}

export default WeekDays;
