import React, { Component } from "react";
import { Card, Input } from "semantic-ui-react";
import "./taskList.css";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      todolist: [],
    };
  }
  render() {
    return <div>TodoApp</div>;
  }
}

export default TaskList;
