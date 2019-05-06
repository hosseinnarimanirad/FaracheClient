import React, {Component} from "react";

 

var base64 = require('base64-js');
var jsRijndael = require('js-rijndael');
 

var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");


//********************************* */
const NodeRSA = require('node-rsa');

 


class CryptographyHelper  extends React.Component {
        // componentDidMount() {
        //         system();
        //       }
            

  static DoEncrypt = function(value, prKey) {
 

        const keyInPem = '-----BEGIN RSA PRIVATE KEY-----\n'+
        'MIICXwKBAQACgYDJNTd9j6vM7ytLs9xMI9lokAeCFXjdFpqJUcmCWJ9wLd3A7RlYsVdI9PcTm6FcaXLrh3RS/yvkq5KK6+ysvwcl1TzpDQCqDbbLmuccjjohmXGgxtiLr6DryJQ8Jdd9hnmYIWPORs+/scPF8rAjxt9yHn3MTl2pZG3qnWFYmgALYQKBAwEAAQKBgJ+sA6U45nVzN0CUMzaZHGbGJa8tqwSIc4qVxPwTqDM1sszvWzXvRf03qPt+fccAR5pxm/ZhWUvWfCySnPdZgSkzw9x6uoaUNZL5K+HwyU8y+g7pwj+6gS8MLLUQ43SEwdAXTq/6cYdmPByz3YI7hhjB3H90XHpaYBE2csz4UxMhAoFA08zzUZfeJJRVw3r1kyYjulf+FbghnABN0XcMz3Qe6zk8lB4ps3ylRg8xgeR8UPSmjURqY5/YLGFVXRbcNcCqYwKBQPMyXuE3uXLIFy5+fMN/u0LhFB9rlKkuxBjDociLRdYXVzb103hDnkz5C3FWABi+8h59EVgdobHVyi7nvz2yHGsCgUBwhHC+5+8bf7IQJ0JO6fQRCq3w2+D+/ypYHOaxTv8d90o3Zc7Bi3ZBwdCLMNbaKx5P7giW5FPzP8IZsgtKgxABAoFAv5zMTL7PCrTELwnR22bkcElOxYLJ2pLSRoC9E3lISOqS+Oau+26rZxJCBcYwxU6NDaCU7cxK/gboChTmBQI0iQKBQIEaVOH9/CDEUa+IUaxexz3jYpHVqU72w9JM3s0y38qa/xrliY7sSQ/QRf5REkKA9wrYCGd0cg+JcwQo9EVoRYg='+
        '-----END RSA PRIVATE KEY-----';
        
        const rsa = new NodeRSA({b: 1024});
        rsa.importKey(keyInPem,'pkcs1-private-pem');
        var base64Key = rsa.decrypt(value.m, 'utf8');


        //get AES IV
        // var ivByte = base64.toByteArray(value.k);

        // var key = [].slice.call(base64.toByteArray(base64Key));
        // var iv = [].slice.call(base64.toByteArray(value.k));
        // var message = [].slice.call(base64.toByteArray(value.f));
        // var messageBytes = jsRijndael.decrypt(message, iv, key, 'rijndael-128', 'cbc').filter(item => item !== 16);
        // var clearText = String.fromCharCode.apply(null,messageBytes)
        
        ///*************************************** */
         //get AES IV 
        
        var aesIv = CryptoJS.enc.Base64.parse(value.k);
        var aesKey = CryptoJS.enc.Base64.parse(base64Key); 

        var decrypted=CryptoJS.AES.decrypt(value.f, aesKey, {iv: aesIv, mode: CryptoJS.mode.CBC});
        var plainText=decrypted.toString(CryptoJS.enc.Utf8);

 

  
 
    };
 
  

}

 export default CryptographyHelper;