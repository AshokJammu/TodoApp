import React, { Component } from "react";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import "./taskList.css";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
    };
  }
  componentDidMount = () => {
    this.getTasks();
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // add task to the list
  onSubmit = () => {
    // check is task is empty string
    if (this.state.task) {
      // get the task list from the local storage
      let  todoList = JSON.parse(localStorage.getItem(" todoList"));

      // task list is null means empty
      // create an empty list
      if ( todoList == null) {
         todoList = [];
      }

      // create task object
      // default status is false
      let task = {
        task: `${this.state.task}`,
        status: false,
      };

      // add the task to the task list
       todoList.push(task);

      // save the task list in the local storage
      localStorage.setItem(" todoList", JSON.stringify( todoList));

      // clear the form
      this.setState({ task: "" });

      // refresh the tasks
      this.getTasks();
    }
  };

  // get all the tasks
  getTasks = () => {
    // get the task list from the local storage
    let  todoList = JSON.parse(localStorage.getItem(" todoList"));

    // check if task list is empty
    if ( todoList) {
      // sort all the tasks on the basis of status
      // completed task will move down
       todoList =  todoList.sort((a, b) => {
        if (a.status) {
          return 1;
        } else if (b.status) {
          return -1;
        }
        return 0;
      });

      // save the task list in the local storage
      localStorage.setItem(" todoList", JSON.stringify( todoList));

      // set the  todoList to the state
      this.setState({
         todoList:  todoList.map((item, index) => {
          let color = "red";
          let cardBackground = { background: "white" };
          let taskComplete = { textDecoration: "none" };

          if (item.status) {
            color = "green";
            cardBackground.background = "beige";
            taskComplete["textDecoration"] = "line-through";
          }
          return (
            <Card key={index} color={color} fluid style={cardBackground}>
              <Card.Content>
                <Card.Header textAlign="left" style={taskComplete}>
                  <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                </Card.Header>

                <Card.Meta textAlign="right">
                  <Icon
                    link
                    name="check circle"
                    color="green"
                    onClick={() => this.updateTask(index)}
                  />
                  <span style={{ paddingRight: 10 }}>Done</span>
                  <Icon
                    link
                    name="undo"
                    color="yellow"
                    onClick={() => this.undoTask(index)}
                  />
                  <span style={{ paddingRight: 10 }}>Undo</span>
                  <Icon
                    link
                    name="delete"
                    color="red"
                    onClick={() => this.deleteTask(index)}
                  />
                  <span style={{ paddingRight: 10 }}>Delete</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          );
        }),
      });
    }
  };

  // update the task status to true
  // updateTask = (index) => {
  //   // get the task list from the local storage
  //   let  todoList = JSON.parse(localStorage.getItem(" todoList"));
  //   // change status to true
  //    todoList[index].status = true;
  //   // save the updated task list
  //   localStorage.setItem(" todoList", JSON.stringify( todoList));
  //   // refresh the task list
  //   this.getTasks();
  // };

  // undone the task status from true to false
  // undoTask = (index) => {
  //   // get the task list from the local storage
  //   let  todoList = JSON.parse(localStorage.getItem(" todoList"));
  //   // change status to false
  //    todoList[index].status = false;
  //   // save the updated task list
  //   localStorage.setItem(" todoList", JSON.stringify( todoList));
  //   // refresh the task list
  //   this.getTasks();
  // };

  // delete the task from the task list
  deleteTask = (index) => {
    // get the task list from the local storage
    let  todoList = JSON.parse(localStorage.getItem(" todoList"));
    // remove the task from the task list
     todoList.splice(index, 1);
    // save the updated task list
    localStorage.setItem(" todoList", JSON.stringify( todoList));
    // refresh the task list
    this.getTasks();
  };

  render() {
    return (
      <div>
        <div>
          <Header as="h1">
            <div className="app-header">My Todo List</div>{" "}
          </Header>
        </div>
        <div className="app-form">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Enter tasks..."
            />
          <button>Clear All</button>
          </Form>
        </div>
        <div>
          <Card.Group>{this.state.todoList}</Card.Group>
        </div>
      </div>
    );
  }
}

export default TaskList;
