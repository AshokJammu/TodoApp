import React, { Component } from "react";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import "./taskList.css";

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      todoList:"",
      hashList:"",
      hashFlag:false
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
      let todoList = JSON.parse(localStorage.getItem(" todoList"));

      // task list is null means empty
      // create an empty list
      if (todoList == null) {
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
      console.log(todoList, "lists");

      // save the task list in the local storage
      localStorage.setItem(" todoList", JSON.stringify(todoList));

      // clear the form
      this.setState({ 
        task: "" ,
        hashFlag:false
      });

      // refresh the tasks
      this.getTasks();
    }
  };

  // get all the tasks
  getTasks = () => {
    // get the task list from the local storage
    let todoList = JSON.parse(localStorage.getItem(" todoList"));

    // check if task list is empty
    if (todoList) {
      // sort all the tasks on the basis of status
      // completed task will move down
      todoList = todoList.sort((a, b) => {
        if (a.status) {
          return 1;
        } else if (b.status) {
          return -1;
        }
        return 0;
      });

      // save the task list in the local storage
      localStorage.setItem(" todoList", JSON.stringify(todoList));

      // set the  todoList to the state
      this.setState({
        todoList: todoList.map((item, index) => {
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
                  <div
                    style={{ wordWrap: "break-word" }}
                    onClick={() => this.hashTask(todoList,index)}
                  >
                    {item.task}
                  </div>
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

  // Hashtask List

  hashTasksList = () => {
    // get the hash list from the local storage
    let hashList = JSON.parse(localStorage.getItem("hashList"));
    console.log(hashList)

    // check if hash list is empty
    if (hashList) {
      //sort all the tasks on the basis of status
      //completed task will move down
      hashList = hashList.sort((a, b) => {
        if (a.status) {
          return 1;
        } else if (b.status) {
          return -1;
        }
        return 0;
      });

      // save the hash list in the local storage
      localStorage.setItem("hashList", JSON.stringify(hashList));

      // set the  todoList to the state
      this.setState({
        hashList: hashList.map((item, index) => {
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
                  <div
                    style={{ wordWrap: "break-word" }}
                    onClick={() => this.hashTask(hashList,index)}
                  >
                    {item.task}
                  </div>
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

  // HashTask
  hashTask = (todoList,index) => {
    // console.log(todoList,index);
    let hashIndex = todoList[index].task.split("#")
    // console.log(hashIndex)
    let hashArr = []
    todoList.map(item =>{
    var input = item.task.split("#")
    if(hashIndex[1] === input[1]){
      hashArr.push(item)
    }
    })
    console.log(hashArr,"arr")
    localStorage.setItem("hashList", JSON.stringify(hashArr))
    this.setState({ 
      task: "",
      hashFlag:true
     });
    this.hashTasksList()
  //  console.log(input[1],"input")
  };

  // update the task status to true
  updateTask = (index) => {
    // get the task list from the local storage
    let todoList = JSON.parse(localStorage.getItem(" todoList"));
    let hashList = JSON.parse(localStorage.getItem("hashList"));

    // change status to true
    todoList[index].status = true;
    hashList[index].status = true
    // save the updated task list
    localStorage.setItem(" todoList", JSON.stringify(todoList));
    localStorage.setItem("hashList", JSON.stringify(hashList))

    // refresh the task list
    this.getTasks();
    this.hashTasksList()
  };

  // undone the task status from true to false
  undoTask = (index) => {
    // get the task list from the local storage
    let todoList = JSON.parse(localStorage.getItem(" todoList"));
    let hashList = JSON.parse(localStorage.getItem("hashList"));

    // change status to false
    todoList[index].status = false;
    hashList[index].status = false
    // save the updated task list
    localStorage.setItem(" todoList", JSON.stringify(todoList));
    localStorage.setItem("hashList", JSON.stringify(hashList))

    // refresh the task list
    this.getTasks();
    this.hashTasksList()
  };

  // delete the task from the task list
  deleteTask = (index) => {
    // get the task list from the local storage
    let todoList = JSON.parse(localStorage.getItem(" todoList"));
    let hashList = JSON.parse(localStorage.getItem("hashList"));
    // remove the task from the task list
    todoList.splice(index, 1);
    hashList.splice(index,1)
    // save the updated task list
    localStorage.setItem(" todoList", JSON.stringify(todoList));
    localStorage.setItem("hashList", JSON.stringify(hashList))

    // refresh the task list
    this.getTasks();
    this.hashTasksList()
  };

  // ClearAll
  clearTask = ()=>{
    console.log("Clear All")
    let todoList = JSON.parse(localStorage.getItem(" todoList"));
    let hashList = JSON.parse(localStorage.getItem("hashList"));
    todoList.map(item =>{
      if(item){
        todoList.pop()
      }
    })
    hashList.map(item =>{
      if(item){
        hashList.pop()
      }
    })
    localStorage.setItem(" todoList", JSON.stringify(todoList))
    localStorage.setItem("hashList", JSON.stringify(hashList))
    // todoList = ""
    this.getTasks()
    this.hashTasksList()

  }

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
          </Form>
        </div>
        <button onClick={() => this.clearTask()}>Clear All</button>
        <div>
          {
            !this.state.hashFlag? <Card.Group>{this.state.todoList}</Card.Group> : <Card.Group>{this.state.hashList}</Card.Group>
          }
          
          
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default TaskList;
