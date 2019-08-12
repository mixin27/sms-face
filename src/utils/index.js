import { notification } from 'antd'

const noti = (type,msg,des) => {
    if(type === 'close'){
        notification.close({key : 'noti'})
    }
    else{
        notification[type]({
            top: 500,
            message: msg,
            description: des,
            duration: 5,
            key:'noti',
            style : { marginTop : "10%"}
          });
    }
};
 
export { noti }

export function setUserInfo(data) {
    var CryptoJS = require("crypto-js");
    
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'yzhn user info');
    localStorage.setItem('usdt', ciphertext.toString());
}

export function getUserInfo() {
    var CryptoJS = require("crypto-js");
    
    var sessi = localStorage.getItem('usdt');
    if (!sessi) return false
    var bytes  = CryptoJS.AES.decrypt(sessi, 'yzhn user info');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}

export function setUserToken(data) {
    var CryptoJS = require("crypto-js");
    
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'yzhn user token');
    if(ciphertext.toString().includes('/')){
        return setUserToken(data)
    }
    localStorage.setItem('ustoken', ciphertext.toString());
}

export function getUserToken() {
    var CryptoJS = require("crypto-js");
    
    var sessi = localStorage.getItem('ustoken');
    if (!sessi) return false
    var bytes  = CryptoJS.AES.decrypt(sessi, 'yzhn user token');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}

export function encryptId(id) {
    var CryptoJS = require("crypto-js");
    
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(id), 'yzhn encrypt');
    if(ciphertext.toString().includes('/')){
        return encryptId(id)
    }
    return ciphertext.toString()
}

export function decryptId(id) {
    var CryptoJS = require("crypto-js");
    var bytes  = CryptoJS.AES.decrypt(id, 'yzhn encrypt');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}