import React, { Component } from "react";

import WeekDays from "./weekdays.component";
import WorkingHourOption from "./workinghouroption.component";
import PlannedHour from "./plannedhour.component";

const Newemp = props => (
  <React.Fragment>
    <td className="s-no">
      <span>{props.id + 1}</span>
    </td>
    <td className="emp-name">
      <input
        type="text"
        id={"name_" + props.id}
        onChange={props.handleChangeName}
      ></input>
    </td>
  </React.Fragment>
);

class Planner extends Component {
  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDay = this.handleChangeDay.bind(this);

    this.state = {
      id: [0, 1, 2, 3, 4],
      days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
      employees: [],
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
      m1: [],
      m2: [],
      d1: [],
      n: [],
      all: [],
      calculated: 0
    };
  }

  componentDidMount() {
    this.state.days.map(d => {
      return this.state.id.map(empid => {
        this.state[d][empid] = { id: empid, day: d, value: "all" };
        return this.setState({ d: this.state[d] });
      });
    });
  }

  addId(newid) {
    this.state.id[newid] = newid;

    //Clear state
    this.state.m1 = [];
    this.state.m2 = [];
    this.state.d1 = [];
    this.state.n = [];
    this.state.all = [];
    // set the state

    this.setState({
      m1: this.state.m1,
      m2: this.state.m2,
      d1: this.state.d1,
      n: this.state.n,
      all: this.state.all,
      calculated: 0,
      id: this.state.id
    });

    this.state.days.map(d => {
      this.state[d][newid] = { id: newid, day: d, value: "all" };
      this.setState({ d: this.state[d] });
    });
  }

  calculatePlan() {
    this.setState({ calculated: 1 });

    if (this.state.calculated === 1) {
      this.state.id.map(empidn => {
        this.state.days.map(daa => {
          let e = document.getElementById("select_" + daa + "_" + empidn);
          this.state[daa][empidn] = {
            id: empidn,
            day: daa,
            value: e.options[e.selectedIndex].value
          };
          this.setState({ daa: this.state[daa] });
        });
      });
    }

    this.state.days.map((val, index) => {
      let key = 0;
      let to_delete = [];
      this.state[val].map((day, j) => {
        if (day != undefined && day.day === val) {
          if (day.value === "m1") {
            key = this.state.m1.length;
            this.state.m1[key] = {
              id: day.id,
              day: val,
              value: day.value
            };
            this.setState({ m1: this.state.m1 });
          } else if (day.value === "m2") {
            key = this.state.m2.length;
            this.state.m2[key] = {
              id: day.id,
              day: val,
              value: day.value
            };

            this.setState({ m2: this.state.m2 });
          } else if (day.value === "d") {
            key = this.state.d1.length;
            this.state.d1[key] = {
              id: day.id,
              day: val,
              value: day.value
            };

            this.setState({ d1: this.state.d1 });
          } else if (day.value === "n") {
            key = this.state.n.length;
            this.state.n[key] = {
              id: day.id,
              day: val,
              value: day.value
            };

            this.setState({ n: this.state.n });
          } else if (day.value === "all") {
            key = this.state.all.length;
            this.state.all[key] = {
              id: day.id,
              day: val,
              value: day.value
            };

            this.setState({ all: this.state.all });
          }
        }
      });

      this.state[val] = [];
      this.setState({ val: this.state[val] });
      console.log(this.state[val]);

      //randomly get one value in 4 different array and set it for monday.
      let id = 0;
      let id_all = 0;
      let rand_id = 0;
      let rand_id_all = 0;
      let count = 0;

      id = this.state.m1.length;
      id_all = this.state.all.length;
      rand_id = Math.floor(Math.random() * id);
      rand_id_all = Math.floor(Math.random() * id_all);

      if (id === 0) {
        while (
          index > 0 &&
          this.state[this.state.days[index - 1]][3].id ==
            this.state.all[rand_id_all].id
        ) {
          rand_id_all = Math.floor(Math.random() * id_all);
          count++;
          if (count > 5) {
            break;
          }
        }
        this.state[val][0] = this.state.all[rand_id_all];
        this.setState({ val: this.state[val] });
        const new_all = this.state.all.splice(rand_id_all, 1);
        this.setState({ all: new_all });
      } else {
        while (
          index > 0 &&
          id > 0 &&
          this.state[this.state.days[index - 1]][3].id ==
            this.state.m1[rand_id].id
        ) {
          rand_id = Math.floor(Math.random() * id);
          count++;
          if (count > 5) {
            break;
          }
        }

        this.state[val][0] = this.state.m1[rand_id];
        this.setState({ val: this.state[val] });
        const new_m1 = this.state.m1.splice(rand_id, 1);
        this.setState({ m1: new_m1 });
      }

      id = this.state.n.length;
      id_all = this.state.all.length;
      rand_id = Math.floor(Math.random() * id);
      rand_id_all = Math.floor(Math.random() * id_all);

      if (id === 0) {
        this.state[val][3] = this.state.all[rand_id_all];
        this.setState({ val: this.state[val] });
        const new_all = this.state.all.splice(rand_id_all, 1);
        this.setState({ all: new_all });
      } else {
        this.state[val][3] = this.state.n[rand_id];
        this.setState({ val: this.state[val] });
        const new_n = this.state.n.splice(rand_id, 1);
        this.setState({ n: new_n });
      }

      id = this.state.m2.length;
      id_all = this.state.all.length;
      rand_id = Math.floor(Math.random() * id);
      rand_id_all = Math.floor(Math.random() * id_all);

      if (id === 0) {
        this.state[val][1] = this.state.all[rand_id_all];
        this.setState({ val: this.state[val] });
        const new_all = this.state.all.splice(rand_id_all, 1);
        this.setState({ all: new_all });
      } else {
        this.state[val][1] = this.state.m2[rand_id];
        this.setState({ val: this.state[val] });
        const new_m2 = this.state.m2.splice(rand_id, 1);
        this.setState({ m2: new_m2 });
      }

      id = this.state.d1.length;
      id_all = this.state.all.length;
      rand_id = Math.floor(Math.random() * id);
      rand_id_all = Math.floor(Math.random() * id_all);

      if (id === 0) {
        this.state[val][2] = this.state.all[rand_id_all];
        this.setState({ val: this.state[val] });
        const new_all = this.state.all.splice(rand_id_all, 1);
        this.setState({ all: new_all });
      } else {
        this.state[val][2] = this.state.d1[rand_id];
        this.setState({ val: this.state[val] });
        const new_d1 = this.state.d1.splice(rand_id, 1);
        this.setState({ d1: new_d1 });
      }

      this.state.m1 = [];
      this.state.m2 = [];
      this.state.d1 = [];
      this.state.n = [];
      this.state.all = [];

      this.setState({
        m1: this.state.m1,
        m2: this.state.m2,
        d1: this.state.d1,
        n: this.state.n,
        all: this.state.all
      });
    });
  }

  handleChangeName(e) {
    let key = e.target.id.replace("name_", "");
    this.state.employees[key] = e.target.value;
    this.setState({ employees: this.state.employees });
  }

  handleChangeDay(e) {
    this.setState({ calculated: 0 });
  }

  render() {
    return (
      <React.Fragment>
        <div className="header">Weekly Planner</div>
        <div className="outer">
          <div className="inner">
            <table>
              <tbody>
                <tr>
                  <th className="s-no">S.No:</th>
                  <th className="emp-name">Emp Name/Day</th>
                  <WeekDays />
                </tr>
                {this.state.id.map(emp => {
                  return (
                    <React.Fragment key={this.state.id[emp]}>
                      <tr>
                        <Newemp
                          id={this.state.id[emp]}
                          handleChangeName={this.handleChangeName}
                        />
                        <WorkingHourOption
                          empid={this.state.id[emp]}
                          days={this.state.days}
                          handleChangeDay={this.handleChangeDay}
                        />
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <a
          className="btn add-emp"
          href="#"
          onClick={() => {
            this.addId(this.state.id.length);
          }}
        >
          Add New Employee
        </a>
        <a
          className="btn calculate-plan"
          href="#"
          onClick={() => {
            this.calculatePlan();
          }}
        >
          Calculate Plan
        </a>
        <br />
        <br />

        <div className="outer">
          <div className="inner-result">
            <table className={this.state.calculated ? "show" : "hide"}>
              <tbody>
                <tr>
                  <th className="shift">Shift</th>
                  <WeekDays />
                </tr>
                <tr>
                  <td className="shift">Morning 1</td>
                  {this.state.days.map(day => {
                    return (
                      <PlannedHour
                        vals={this.state[day]}
                        employees={this.state.employees}
                        arrid="0"
                        key={"0_" + day}
                      />
                    );
                  })}
                </tr>
                <tr>
                  <td className="shift">Morning 2</td>
                  {this.state.days.map(day => {
                    return (
                      <PlannedHour
                        vals={this.state[day]}
                        employees={this.state.employees}
                        arrid="1"
                        key={"1_" + day}
                      />
                    );
                  })}
                </tr>
                <tr>
                  <td className="shift">Day</td>
                  {this.state.days.map(day => {
                    return (
                      <PlannedHour
                        vals={this.state[day]}
                        employees={this.state.employees}
                        arrid="2"
                        key={"2_" + day}
                      />
                    );
                  })}
                </tr>
                <tr>
                  <td className="shift">Night </td>
                  {this.state.days.map(day => {
                    return (
                      <PlannedHour
                        vals={this.state[day]}
                        employees={this.state.employees}
                        arrid="3"
                        key={"3_" + day}
                      />
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="footer">
          copyright © {new Date().getFullYear()}{" "}
          <a href="mailto:anoojshrestha.52532@gmail.com">anooj shrestha</a>
        </div>
      </React.Fragment>
    );
  }
}

export default Planner;
