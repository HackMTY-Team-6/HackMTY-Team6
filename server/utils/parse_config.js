const Parse = require("parse/node");

const APP_ID = "LsI5utgpc1SoDuWjmHWUjLeRv3EiAPxtpjlPuFlk"
const JS_KEY = "i6hBekVh52OZ9QazePbm0QoSqtwNBADznRRMKggp";
const MASTER_KEY = "RxhFq2jYrJukg2s3HMDDTg89rsvebBS3XFWqldaE";

Parse.serverURL = "https://parseapi.back4app.com";
Parse.initialize(
  APP_ID, // Application ID
  JS_KEY, // Javascript key
  MASTER_KEY //  Master key
);

module.exports = Parse;