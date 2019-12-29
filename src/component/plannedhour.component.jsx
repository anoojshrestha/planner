import React, { Component } from "react";

class PlannedHour extends Component {
  render() {
    return this.props.vals.map((val, index) => {
      if (index == this.props.arrid && val != undefined && val != "") {
        return (
          <React.Fragment key={index}>
            <td
              className="name-result"
              id={val.id + "_" + val.day + "_" + val.value}
            >
              {this.props.employees[val.id]}
            </td>
          </React.Fragment>
        );
      } else if (index == this.props.arrid && (val == undefined || val == "")) {
        return <td>Nobody</td>;
      }
    });
  }
}

export default PlannedHour;
