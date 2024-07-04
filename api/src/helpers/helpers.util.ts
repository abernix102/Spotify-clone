// import * as apiConfig from "../../config/api.config";


export const generateRandomString = function(length: number): string {
    let randomString = '';
    const possibleLetters = 'abcdefghijlkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * possibleLetters.length);
        randomString += possibleLetters[randomIndex];
    }
    return randomString;
}
