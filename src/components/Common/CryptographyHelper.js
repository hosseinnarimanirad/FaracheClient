import React, {Component} from "react";

var base64 = require('base64-js');
var mcrypt = require('mcrypt').MCrypt;

// class CryptographyHelper {
//     constructor(){

//     }

     Encrypt(value, pKey) {


        var kByte=base64.toByteArray( value.k);
        var mc = new MCrypt('rijndael-256', 'cbc');


        // fromByteArray 
        // toByteArray 
    }

}