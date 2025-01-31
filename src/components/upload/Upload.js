import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";


//let fs=require('mcrypt');
import CryptographyHelper from '../Common/CryptographyHelper';

const uploadServerUrl = "https://localhost:44306/api/upload";

class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      info:{}
    };
 

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);

    this.goToNextStep = this.goToNextStep.bind(this);
 
  }

  goToNextStep(){ this.props.goToNextStep(this.state.info);}

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }

   
  }




sendRequest(file) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    //req.setHeader('Access-Control-Allow-Origin', '*');

    req.upload.addEventListener("progress", event => {
      if (event.lengthComputable) {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = {
          state: "pending",
          percentage: (event.loaded / event.total) * 100
        };
        this.setState({ uploadProgress: copy });
      }
    });

    req.upload.addEventListener("load", event => {
      const copy = { ...this.state.uploadProgress };
      copy[file.name] = { state: "done", percentage: 100 };
      this.setState({ uploadProgress: copy });
      resolve(req.response);
    });

    req.upload.addEventListener("loadend", event => {
      var temp = req.responseText;
      console.log("loadend");
    });

    req.onreadystatechange = function(){
      if(req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        console.log("onreadystatechange");
            console.log(req.responseText);

            var theInfo = JSON.parse(CryptographyHelper.DoDecrypt(JSON.parse(req.responseText)));

            this.setState((prevState)=>({info :  theInfo} ));
            
            var temp = this.state;
        }
    }.bind(this);

    req.upload.addEventListener("error", event => {
      const copy = { ...this.state.uploadProgress };
      copy[file.name] = { state: "error", percentage: 0 };
      this.setState({ uploadProgress: copy });
      reject(req.response);
    });

    const formData = new FormData();
    formData.append("file", file, file.name);

    req.open("POST", uploadServerUrl);
    req.send(formData);
  });
}

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  
  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <div>
          <button className="iranSansFont HnrM4"
            onClick={() =>
              this.setState({ files: [], successfullUploaded: false })
            }
          >
            انتخاب مجدد
          </button>
          <button className="iranSansFont HnrM4"
                  onClick={() => this.goToNextStep()}
          >
            گام بعدی (انتخاب تحلیل)
          </button>
        </div>
      );
    } else {
      return (
        <button className="iranSansFont HnrM4"
          disabled={this.state.files.length <= 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          بارگذاری
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Upload" >
       
        <span className="Title iranSansFont">فایل خود را بارگذاری کنید</span>
        <div className="Content">
          <div>
            <Dropzone
              multiple = {false}
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row LeftToRight">
                  <span className="Filename WordBreak">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>         
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;
