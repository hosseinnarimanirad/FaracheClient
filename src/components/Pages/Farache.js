import React, { Component } from 'react';
import { render } from "react-dom";

//import FileUpload from '../Common/FileUpload'
import Upload from '../upload/Upload'
import './main.css'


class MainComponent extends React.Component {

    render() {
        return (
            <div className="height100Percent rtl"> 
                <div className="shadowPanel curvePanel margin4 horizontallyCenter height100Percent">
                    <br />
                    <h2 className="text-right">آماده‌سازی داده</h2>
                    <div className="dragDropPanel">
                        {/* <FileUpload /> */}
                        <Upload/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainComponent;
