import CryptoJS from "crypto-js";

const key = import.meta.env.VITE_ENCRYPT_KEY;

export const passwordEncrypt = string => {
    return CryptoJS.HmacSHA1(string, key).toString();
}

export const genericEncrypt = string => {
    return CryptoJS.AES.encrypt(string, key).toString();
}

export const genericDecrypt = string => {
    var bytes  = CryptoJS.AES.decrypt(string, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}