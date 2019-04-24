import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Process.css";
import Progress from "../progress/Progress";

const uploadServerUrl = "https://localhost:44306/api/upload";

class Process extends Component {

     
 
    goToPrevStep(){
        this.props.goToPrevStep();
    }

    render(){
        return (<div>
            
            <div>
                PROCESS
            </div>

            <div style={{
                            float:"Left",
                            marginTop: "30px"
                        }}>
                            <button className="iranSansFont HnrM4" 
                                    onClick={() => this.goToPrevStep()}>
                                بازگشت
                            </button>

            </div>


        </div>);
    }
}


export default Process;