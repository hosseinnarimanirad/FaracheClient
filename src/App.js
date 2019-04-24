import React, { Component } from "react";
import "./App.css";
import Upload from "./components/upload/Upload";
// import Process from "./components/process/Process"

import ProcessSelection from './components/processSelection/ProcessSelection'

const steps = ['upload', 'process'];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {       
      currentStep: steps[0],
      currentStepIndex:0
    };
  }

  setCurrentStep(state){
    this.setState({currentStep:state});
  }

  goToNextStep(){
    var index = (this.state.currentStepIndex+1)%2;

    this.setCurrentStep(steps[index]);
  }

  getUI(){
    switch(this.state.currentStep){
      case steps[0]:{

        return (<ProcessSelection />);
        // return (<Upload goToProcessMode={()=>this.goToNextStep()}/>);
      }
      case steps[1]:{

        return (<ProcessSelection />);
      }
      default:{
        return (<Upload/>);
      }
    }

  }


  render() {
    return (
      <div className="App">
        <div className="Card">
          {this.getUI()}
        </div>
      </div>
    );
  }
}

export default App;
