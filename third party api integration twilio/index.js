var sid='ACea1265562d55af57216a72f3246f3c57';
var auth_token='40c6d424e9422988b65191a48106d7e2';
var twilio = require('twilio')(sid,auth_token);

twilio.messages.create({
    from:"+18455348430",
    to:"+919664969780",
    body:"THIS IS tesing message"
}).then((res)=>console.log('message has send!')).catch((err)=>{console.log(err)})