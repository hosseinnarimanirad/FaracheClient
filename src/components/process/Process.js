import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Process.css";
import Progress from "../progress/Progress";
import { Row } from "antd";

import logo from '../../assets/images/processmining.gif'

const serverUrl = "https://localhost:44306/api/ProcessMininig/RunTheProcess";
  
class Process extends Component {
    constructor(props){
        super(props);
        this.state =    {info:props.info};
    }
    
 
    goToPrevStep(){
        this.props.goToPrevStep();
    }

    RunProcess(){
 
        const request = new XMLHttpRequest();
 
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                console.log("onreadystatechange");

                //show the html response (vizNetwork diagram) in a new tab
                var win= window.open('about:blank');
               
                win.document.open();
                win.document.write(request.responseText);
                win.document.close();
            }
        };//.bind(this);


        request.open("POST", serverUrl);

        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        request.send(JSON.stringify({ fileId: this.state.info.uploadFileId.Stamp, processMode: this.state.info.process.Title }));
 
    }

    render() {
        return (<div  style={{width:"100%"}}> 

            <div>
                PROCESS
            </div>
            <Row>

                <img src={logo} alt="PROCESS MINING" style={{
                    height: '200px'
                }} />
            </Row>
            <div  style={{
                            float:"Left",
                            marginTop: "30px"
                        }}>

                <button className="iranSansFont HnrM4"
                    onClick={() => this.goToPrevStep()}>
                    بازگشت
                </button>

                <button className="iranSansFont HnrM4"
                    onClick={() => this.RunProcess()}>
                    انجام تحلیل
                </button>

            </div>

        </div>);
    }
}


export default Process;