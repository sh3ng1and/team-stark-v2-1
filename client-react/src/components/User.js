import React from 'react';
import axios from "axios";
import '../index.css';
import '../task.min.css'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { User: [] };
    this.id = React.createRef();
    this.email = React.createRef();
    this.firstname = React.createRef();
    this.lastname = React.createRef();
    this.password = React.createRef();
    this.username = React.createRef();
  }

  componentDidMount() {
    this.getData();
  }
  // get id entered by user to update or delete record associated with id
  getUserid = () => {
    console.log("In getUser");
    let url = "http://localhost:8080/users/{i}";
    axios.get(url)
      .then(response => (this.info = response))
  }

  getData = () => {
    console.log ("In getData");
    // Java Spring Boot uses port 8080
    let url = "http://localhost:8080/users";

    // C# dotnetcore uses port 5000
    //let url = "http://localhost:5000/projects";

    // Express uses port 3001 (react uses 3000)
    //let url = "http://localhost:3001/tasks";
    axios.get(url).then(response => this.setState({ User: response.data }));
  };

  addUser = () => {
    console.log ("In addUser");
    let url = "http://localhost:8080/users";
    axios.post(url, { email: this.email.current.value, firstname: this.firstname.current.value, lastname: this.lastname.current.value, password: this.password.current.value }).then(response => {
    //axios.post(url, { email: this.email.current.value }).then(response => {
      // refresh the data
       this.getData();
        // empty the input
        this.email.current.value = "";
        this.password.current.value = "";
        this.firstname.current.value = "";
        this.lastname.current.value = "";
        console.log ("In addUser Input emptied");
      });
  };

  deleteUser = () => {
    console.log ("In DeleteUser");
    let url = "http://localhost:8080/users/{id}";
//    let url = "http://localhost:8080/users";
    axios.delete(url, { id: this.id.current.value } ).then(_response => {
      // refresh the data
      this.getUserid();
      // empty the input
      console.log ("In DeleteUser Empty the Input");
      this.id.current.value = "";
    });
  };

 // update project for id entered by user
  updateProject = () => {
    console.log ("In UpdateProject");
    let url = "http://localhost:8080/users/{id}";
    //let url = "http://localhost:8080/users";
    // axios.put(url, { id: this.id.current.value, email: this.email.current.value, password: this.password.current.value} ).then(_response => {
    axios.put(url, { email: this.email.current.value, firstname: this.firstname.current.value, lastname: this.lastname.current.value, password: this.password.current.value } ).then(_response => {
        // refresh the data
        this.getUserid();
        // empty the input
        this.id.current.value = "";
        this.email.current.value = "";
        this.firstname.current.value = "";
        this.lastname.current.value = "";
        this.password.current.value = "";
  
        console.log ("In updateProject Input emptied");
    });
  };

  render() {
    return (
      <div>
        <h2>Bill Payment and Budget Tool</h2>

        <h3>Create User Account</h3>
        <div>
          <label> Email Address:
          <input className="form-control" ref={this.email} type="text" />
          </label>
          <label> Password:
          <input className="form-control" ref={this.password} type="password" />
          </label> 
          <br></br>
          <label> First Name:
          <input className="form-control" ref={this.firstname} type="text" />
           </label>
          <label> Last Name:
          <input className="form-control" ref={this.lastname} type="text" />
          </label>
          <br></br>
          <button type="button" className="btn btn-primary" onClick={this.addUser}>Create</button>
        </div>
        
        <h3>Delete User Account</h3>
        <div>
            <label> Account Number:
              <input className="form-control" ref={this.id} type="number" />  
            </label>
            <br></br>
            <button type="button" className="btn btn-success" onClick={this.deleteUser}>Delete</button>
        </div>

        <h3>Update User Account</h3>
        <div>
          <label> Account Number: 
            <input className="form-control" ref={this.id} type="number" />
          </label>
          <label> Email Address:
          <input className="form-control" ref={this.email} type="text" />
          </label>
          <br></br>
          <label> First Name:
          <input className="form-control" ref={this.firstname} type="text" />
          </label>
          <label> Last Name:
          <input className="form-control" ref={this.lastname} type="text" />
          </label> 
          <br></br>
          <button type="button" className="btn btn-primary" onClick={this.updateProject}>Update</button>
        </div>
      </div>
    );
  }
}
export default User;
