import React, { Component } from "react";

class WorkingHourOption extends Component {
  render() {
    return this.props.days.map(day => {
      return (
        <React.Fragment key={"select_" + day + "_" + this.props.empid}>
          <td>
            <select
              id={"select_" + day + "_" + this.props.empid}
              onChange={this.props.handleChangeDay}
            >
              <option value="all">Any time</option>
              <option value="m1">Morning 1</option>
              <option value="m2">Morning 2</option>
              <option value="d">Day</option>
              <option value="n">Night</option>
              <option value="off">Day off</option>
            </select>
          </td>
        </React.Fragment>
      );
    });
  }
}

export default WorkingHourOption;
