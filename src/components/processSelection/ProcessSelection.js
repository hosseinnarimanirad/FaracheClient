import React, {Component} from 'react';
import { Checkbox } from 'antd';

import './ProcessSelection.css'

class ProcessItem extends Component{
    constructor(props){
        super(props);

        // this.state = {Id:props.item.Id, IsSelected:props.item.IsSelected, Title:props.item.Title}; //props.item;
        this.state = props.item; //props.item;
 
        this.handleIsCheckChanged = this.handleIsCheckChanged.bind(this);
    }

    
    handleIsCheckChanged=(e)=>{ 
        this.setState((prevState)=>({IsSelected:e.target.checked}), 
            () => {
            this.props.onCheckChanged(e.target.checked);
        });
    }

    // handleIsCheckChanged(e){
    //     this.setState({IsSelected:e.target.value});
    // }

    render(){
        return (        
        <Checkbox className="iranSansFont"
            style={{fontSize:"15px"}} 
            checked={this.state.IsSelected}
            disabled={!this.state.IsEnabled}
            onChange={this.handleIsCheckChanged}>
            {this.state.Title}
        </Checkbox>);
    }
}

class ProcessSelection extends Component{
    constructor(props){
        super(props);
    
        this.Processes = [];
  
        this.state={CanGoToNextStep:false, CurrentSelectedProcess : null};

        this.Processes.push(
            {Title:"کشف مدل فرایند (Directed Flow Graph)", 
            Id : 1, 
            IsSelected : false,
            IsEnabled : true
        });

        this.Processes.push({
            Title:"کشف مدل فرایند (BPML)", 
            Id : 2, 
            IsSelected : false,
            IsEnabled : false
        });
        
        this.Processes.push({
            Title:"کشف مدل فرایند (CNET)", 
            Id : 3, 
            IsSelected : false,
            IsEnabled : false
        });
    }

    goToNextStep(){
        this.props.goToNextStep(this.state.CurrentSelectedProcess);
    }

    goToPrevStep(){
        this.props.goToPrevStep();
    }
    // updateItem(item, value){
    //     item.IsSelected=value;
    // }

    anyProcessSelected(){
        this.setState(prevState=>({CanGoToNextStep:false}));

         for (let index = 0; index < this.Processes.length; index++) {
             const element = this.Processes[index];
             
             if (element.IsSelected) {                 
                this.setState(prevState=>({CanGoToNextStep:true}));
                return;
             }
         }

        //  return false;
    }

    itemSelectedChanged(process, isSelected){
        process.IsSelected = isSelected;
        // this.updateItem(p,e);
        this.anyProcessSelected();

        if (process.IsSelected){
            this.setState((prevState)=> ({CurrentSelectedProcess : process}));
        }
    }

    render(){
        return (<div style={{width:"100%"}}>

            <div className="Title iranSansFont">
                تحلیل(های) مورد نظر خودت رو انتخاب کن.
            </div>

            <div style={{flow:"Right"}}>
                {this.Processes.map(p=> 
                <div className="Row" style={{textAlign:"Right"}} key={p.Id} >
                    <ProcessItem 
                        
                        item={p} 
                        onCheckChanged={(e)=>
                            {
                            // p.IsSelected = e; 
                            // this.anyProcessSelected();
                            this.itemSelectedChanged(p,e);
                                }
                            }/>
                </div>)}
            </div>


           

            <div style={{
                            float:"Left",
                            marginTop: "30px"
                        }}>
                         <button className="iranSansFont HnrM4" 
                                    onClick={() => this.goToPrevStep()}>
                                بازگشت
                            </button>
                            
                            <button className="iranSansFont HnrM4"                    
                                disabled={!this.state.CanGoToNextStep}
                                onClick={(e)=>{this.goToNextStep();}}                     
                            >
                                انجام تحلیل
                            </button>


            </div>
           
        </div>);
    }

}

export default ProcessSelection;
