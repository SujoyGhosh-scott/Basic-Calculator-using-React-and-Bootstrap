import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

class Clear extends Component {
  render() {
    return (
      <div className="clearButton">
        <button
          className="btn btn-dark m-0 clrbtn"
          onClick={this.props.onClick}
        >
          Clear
        </button>
      </div>
    );
  }
}

function isOperator(val) {
  //this function checks weather val is an operator,
  // or number and accoring to that returns the class
  if (val === "+" || val === "-" || val === "*" || val === "/")
    return "btn-danger";
  else if (val === "=") return "btn-warning";
  else return "btn-primary";
}

function AllButtons(props) {
  return (
    <button
      onClick={props.onClick}
      className={`btn m-2 col ${isOperator(props.value)}`}
    >
      <b>{props.value}</b>
    </button>
  );
}

function calculateResult(num1, num2, op) {
  let ans;
  switch (op) {
    case "+":
      ans = num1 + num2;
      break;
    case "-":
      ans = num1 - num2;
      break;
    case "*":
      ans = num1 * num2;
      break;
    case "/":
      ans = num1 / num2;
      break;
  }
  return ans.toFixed(4);
}

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNumber: 0,
      secondNumber: 0,
      operator: "",
      enteredFirstNumber: false,
      enteredOperator: false,
      decimalDiv: 10,
      //this flag indecates weater entered number is before decimal or not
      // 1 if before decimal
      // 2 if after decimal, for the first time
      // 3 if after decimal
      beforeDecimalFlag: 1,
    };
  }
  handelClick = (val) => {
    console.log("key pressed", val);
    if (val === ".") {
      if (this.state.beforeDecimalFlag === 1) {
        this.setState({
          beforeDecimalFlag: 2,
        });
        return;
      }
      this.handelClear();
    }

    if (
      val === "=" &&
      this.state.enteredFirstNumber &&
      this.state.enteredOperator
    ) {
      let answer = calculateResult(
        this.state.firstNumber,
        this.state.secondNumber,
        this.state.operator
      );
      console.log("answer", answer);
      this.setState({
        firstNumber: answer,
        secondNumber: 0,
        operator: "",
        enteredOperator: false,
      });
      return;
    }

    if (val === "+" || val === "-" || val === "*" || val === "/") {
      if (
        !this.state.enteredFirstNumber &&
        (val === "+" || val === "*" || val === "/")
      )
        return;

      this.setState({
        operator: val,
        enteredOperator: true,
        decimalDiv: 10,
        decimalDiv: 10,
        beforeDecimalFlag: 1,
      });
      return;
    }

    let newVal = 0;
    let decimalPart = 0;

    if (this.state.enteredFirstNumber && this.state.enteredOperator) {
      if (this.state.beforeDecimalFlag === 1) {
        newVal = this.state.secondNumber * 10 + val;
      } else {
        decimalPart = val / this.state.decimalDiv;
        newVal = this.state.secondNumber + decimalPart;
        this.setState({
          beforeDecimalFlag: 3,
          decimalDiv: this.state.decimalDiv * 10,
        });
      }
      this.setState({
        secondNumber: newVal,
      });
      return;
    }

    if (this.state.beforeDecimalFlag === 1) {
      newVal = this.state.firstNumber * 10 + val;
    } /*if(this.state.beforeDecimalFlag === 2 )*/ else {
      decimalPart = val / this.state.decimalDiv;
      newVal = this.state.firstNumber + decimalPart;
      this.setState({
        beforeDecimalFlag: 3,
        decimalDiv: this.state.decimalDiv * 10,
      });
    }
    this.setState({
      firstNumber: newVal,
      enteredFirstNumber: true,
    });
  };

  handelClear = () => {
    //console.log("state", this.state);
    let newState = {
      firstNumber: 0,
      secondNumber: 0,
      enteredFirstNumber: false,
      operator: "",
      beforeDecimal: true,
    };
    this.setState((this.state = newState));
    //console.log("new state", this.state);
  };

  renderAllButtons(i) {
    return <AllButtons value={i} onClick={() => this.handelClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="screen">
          {this.state.enteredFirstNumber
            ? this.state.enteredOperator
              ? `${this.state.firstNumber} ${this.state.operator} ${this.state.secondNumber}`
              : this.state.firstNumber
            : ""}
        </div>
        <div className="row">
          {this.renderAllButtons(7)}
          {this.renderAllButtons(8)}
          {this.renderAllButtons(9)}
          {this.renderAllButtons("+")}
        </div>
        <div className="row">
          {this.renderAllButtons(4)}
          {this.renderAllButtons(5)}
          {this.renderAllButtons(6)}
          {this.renderAllButtons("-")}
        </div>
        <div className="row">
          {this.renderAllButtons(1)}
          {this.renderAllButtons(2)}
          {this.renderAllButtons(3)}
          {this.renderAllButtons("*")}
        </div>
        <div className="row">
          {this.renderAllButtons(0)}
          {this.renderAllButtons(".")}
          {this.renderAllButtons("/")}
          {this.renderAllButtons("=")}
        </div>
        <div className="row">
          <Clear onClick={this.handelClear} />
        </div>
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <div className="main container-fluid">
        <div className="buttons">
          <Buttons />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
