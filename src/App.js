import React, { Component } from "react";
import "./App.css";
import Upload from "./components/upload/Upload"; 

import ProcessSelection from './components/processSelection/ProcessSelection'
import Process from "./components/process/Process";

const steps = ['upload', 'processSelection', 'process'];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {    

      currentStep: steps[0],
      currentStepIndex: 0      
    };

    this.goToNextStep = this.goToNextStep.bind(this);
    this.goToPrevStep = this.goToPrevStep.bind(this);
  }

  setCurrentStep(step){
   
  }

  goToNextStep(){
    var index = (this.state.currentStepIndex + 1) % steps.length;

    this.updateCurrentStep(index);
    // this.setState((prevState)=>({currentStep : steps[index]})); 
  }

  goToPrevStep(){
    var index = (this.state.currentStepIndex - 1) % steps.length;

    this.updateCurrentStep(index);
    // this.setState((prevState)=>({currentStep : steps[index]})); 
  }

  updateCurrentStep(index){
    this.setState((prevState)=>({
      currentStep : steps[index],
      currentStepIndex : index
    }));
  }

  getUI(){
    switch(this.state.currentStep){
      case steps[0]:{ 
        return (<Upload goToNextStep={()=>this.goToNextStep()}/>);
      }
      case steps[1]:{
        return (<ProcessSelection goToNextStep={()=>this.goToNextStep()} goToPrevStep={()=>this.goToPrevStep()}/>);
      }
      case steps[2]:{
        return (<Process goToPrevStep={()=>this.goToPrevStep()}/>);
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
