import React, {Component} from 'react';
import { Checkbox } from 'antd';

import './ProcessSelection.css'

class ProcessItem extends Component{
    constructor(props){
        super(props);

        // this.state = {Id:props.item.Id, IsSelected:props.item.IsSelected, Title:props.item.Title}; //props.item;
        this.state = props.item; //props.item;
 
        this.handleIsCheckChanged=this.handleIsCheckChanged.bind(this);
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
        return (<Checkbox style={{fontSize:"15px"}} 
            className="iranSansFont"  
            checked={this.state.IsSelected}
            onChange={this.handleIsCheckChanged}>
            {this.state.Title}
        </Checkbox>);
    }
}

class ProcessSelection extends Component{
    constructor(props){
        super(props);
    
        this.Processes = [];
  
        this.state={CanGoToNextStep:false};

        this.Processes.push(
            {Title:"کشف مدل فرایند (Directed Flow Graph)", 
            Id : 1, 
            IsSelected : false
        });
    }

    goToNextStep(){

    }

    updateItem(item, value){
        item.IsSelected=value;
    }

    anyProcessSelected(){
        this.setState({CanGoToNextStep:false});

         for (let index = 0; index < this.Processes.length; index++) {
             const element = this.Processes[index];
             
             if (element.IsSelected) {                 
                this.setState({CanGoToNextStep:true});
                return;
             }
         }

        //  return false;
    }

    render(){
        return (<div style={{width:"100%"}}>

            <div className="Title iranSansFont">
                تحلیل(های) مورد نظر خودت رو انتخاب کن.
            </div>

            {/* <div style={{flow:"Right", display: "flex", flexDirection: "row"}}>
                {this.Processes.map(p=>
                    <Checkbox style={{fontSize:"15px"}} 
                                className="iranSansFont"  
                                key={p.Id} 
                                IsSelected={p.IsSelected}
                                onChange={p.onChange}>
                            {p.Title}
                    </Checkbox>)}
            </div> */}

            <div style={{flow:"Right", display: "flex", flexDirection: "row"}}>
                {this.Processes.map(p=> <ProcessItem 
                                            key={p.Id} 
                                            item={p} 
                                            onCheckChanged={(e)=>{
                                                this.updateItem(p,e);
                                                this.anyProcessSelected();
                                                }}/>)}
            </div>


            <div style={{
                float:"Left",
                marginTop: "30px"
            }}>
                <button className="iranSansFont"                    
                    disabled={!this.state.CanGoToNextStep}
                    onClick={this.goToNextStep()}                     
                >
                انجام تحلیل
                </button>
            </div>
        </div>);
    }

}

export default ProcessSelection;
