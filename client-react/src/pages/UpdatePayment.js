import React from 'react';
import axios from "axios";
import '../index.css';
import '../task.min.css';
import Header from '../components/Header';

class UpdatePayment extends React.Component{
  constructor(props) {
    super(props);
    this.state = { UpdatePayment: [] };
    this.id = React.createRef();
    this.billingcycle = React.createRef();
    this.minimumpayment = React.createRef();
    this.interestrate = React.createRef(); 
    this.payment_type = React.createRef();
  }
  
  componentDidMount() {
    this.getData();
  };

  getData = () => {
    console.log("In getData in update payment");
    // Java Spring Boot uses port 8080
    let url = "http://localhost:8080/payments/{this.id}";
    // C# dotnetcore uses port 5000
    //let url = "http://localhost:5000/projects";
    // Express uses port 3001 (react uses 3000)
    //let url = "http://localhost:3001/tasks";
    axios.get(url).then(response => this.setState({ UpdatePayment: response.data }));
  };

  updatePayment = () => {
    console.log("In updatePayment before axios.put");
   this.testAll();
    let url = "http://localhost:8080/payments/{this.id}";
 
    axios.put(url, { id: this.id.current.value, billingcycle: this.billingcycle.current.value, interestrate: this.interestrate.current.value, minimumpayment: this.minimumpayment.current.value, payment_type: this.payment_type.current.value } ).then(_response => {
      // refresh the data
      console.log("In update payment after axios.put function call");
   this.testAll();
      this.getData();
      // empty the input
      this.emptyInput();
    });
  };

  emptyInput() {
      this.billingcycle.current.value = "";
      this.interestrate.current.value = "";
      this.minimumpayment.current.value = "";
      this.payment_type.current.value = "";
  };
  
  testAll(){
    console.log("In testAll in update payment");
    if(this.billingcycle.current.value !== ""){
      console.log("billingcycle: " + this.billingcycle.current.value);}
    else{
      console.log("billingcycle is NULL");
    }
    if(this.interestrate.current.value !== ""){
        console.log("interestrate: " + this.interestrate.current.value);}
    else{
        console.log("interestrate is NULL");
    }
    if(this.minimumpayment.current.value !== ""){
      console.log("minimumpayment: " + this.minimumpayment.current.value);}
    else{
      console.log("minimumpayment is null");
    }   
    if(this.payment_type.current.value !== ""){
        console.log("payment_type:" + this.payment_type.current.value);}
    else{
      console.log("payment_type is null");
    } 
};

  render() {
    return (
      <div><Header />
        <div id="inputs">
          <div>
            <h2>Bill Payment and Budget Tool</h2>
            <h3>Update Payment Type</h3>
            <label> Payment ID:
            <input className="form-control" ref={this.id} type="number" />
            </label>
            <br></br>
            <label> Payment Type:
            <input className="form-control" ref={this.payment_type} type="text" />
            </label>
            <br></br>
            <label> Interest Rate:
            <input className="form-control" ref={this.interestrate} type="number" />
            </label>
            <br></br>
            <label> Minimum Payment:
              <input className="form-control" ref={this.minimumpayment} type="number" />
            </label>
            <br></br>
            <label> Billing Cycle :
              <input className="form-control" ref={this.billingcycle} type="number" />
            </label>
            <br></br>
            <br></br>
            <button type="button" className="btn btn-primary" onClick={this.updatePayment}>Update Payment Type</button>
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdatePayment;