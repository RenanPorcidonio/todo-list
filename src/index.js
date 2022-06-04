import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasksList: [],
      todoList: [],
      doneList: [],
      taskIds: 0,
      isCreateTaskVisible: false,
    }

    this.toggleCreateTaskVisibility = this.toggleCreateTaskVisibility.bind(this)
    this.addNewTask = this.addNewTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.taskDone = this.taskDone.bind(this)
  }

  toggleCreateTaskVisibility() {
    const isVisible = this.state.isCreateTaskVisible
    if (isVisible) {
      this.setState({ isCreateTaskVisible: !isVisible })
    }
    else {
      this.setState({ isCreateTaskVisible: !isVisible })
    }
  }

  addNewTask(value) {
    this.setState({taskIds: this.state.taskIds + 1})
    this.state.tasksList.push(<Task key={this.state.taskIds} text={value} deleteTask={this.deleteTask} taskDone={this.taskDone} />)
    this.state.todoList.push(<Task key={this.state.taskIds} text={value} deleteTask={this.deleteTask} taskDone={this.taskDone} />)
  }
  
  deleteTask(e) {
    const tasksContainer = e.target.parentNode.parentNode
    const selectedTask = e.target.parentNode
    const taskIndex = Array.from(tasksContainer.children).indexOf(selectedTask)
    const confirmDelete = window.confirm("Are you sure? you can't undo this action")

    if(confirmDelete) {
      const deleted = this.state.tasksList.splice(taskIndex, 1)
      console.log(deleted[0])
      this.state.todoList.push(deleted[0])
      console.log(this.state.todoList)
    }
    this.setState({tasksList: this.state.tasksList})
  }

  taskDone(e) {
    console.log("done!")
    e.target.parentNode.children[0].style.backgroundColor= "#11ee11"
    e.target.parentNode.children[0].textContent = "Done"
    /* const todoList = this.state.todoList
    for(let task of todoList) {
      this.state.doneList.push(task)
    } */
    this.state.doneList.push(e.target.parentNode)
    console.log(this.state.doneList)
  }
  render() {

    const showCreateTask = () => this.state.isCreateTaskVisible ?
      <CreateTaskForm toggleVisibilty={this.toggleCreateTaskVisibility} addNewTask={this.addNewTask} />
      : null

    return (
      <div className="App">
        <header>
          <span>TODO list</span>
          <nav>
            <span>To Do</span>
            <span>Done</span>
          </nav>
        </header>
        <main>
          <StageScetion tasksList={this.state.tasksList} toggleForm={this.toggleCreateTaskVisibility} />
          {showCreateTask()}
        </main>
      </div>
    )
  }
}

class StageScetion extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className="sections">
        <h3>Tasks</h3>
        <div>
          {this.props.tasksList}
        </div>
        <span onClick={this.props.toggleForm} className="addTaskBtn">+</span>
      </section>
    )
  }
}
class Task extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      day: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    }
  }
  render() {
    return (
      <span className="task">
        <span className="taskHeader">todo</span>
        <p>{this.props.text}</p>
        <div className="taskDate">
          <span>{this.state.day}</span>
          <span>{this.state.time}</span>
        </div>
        <button className="deleteBtn" onClick={e => this.props.deleteTask(e)}>Delete</button>
        <button className="doneBtn" onClick={e => this.props.taskDone(e)}>Done</button>
      </span>
    )
  }
}
class CreateTaskForm extends React.Component {
  constructor(props) {
    super(props)

    this.newTask = this.newTask.bind(this)
  }
  newTask() {
    const taskForm = document.getElementsByClassName("createTaskForm")[0]
    const txtArea = taskForm.children[2]
    this.props.addNewTask(txtArea.value)
    this.props.toggleVisibilty()
  }
  render() {
    return (
      <div className="createTaskForm">
        <h3>New Task</h3>
        <span onClick={this.props.toggleVisibilty} >X</span>
        <textarea>

        </textarea>
        <button onClick={this.newTask} >Add</button>
      </div>
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);