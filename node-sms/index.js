const twilio = require('twilio');
require('dotenv').config();

var accountSid = "ACdb15e063589d3f85a9a0d2c24c82f728";
authToken = "b83f45aa096e53755d6ff685bb2c1fe5";
const client = new twilio(accountSid, authToken);

client.messages.create({
    body: '😜😜😜😜😜😜😜',
    to: '+919664969780', 
    from: '+19085407685'
})
.then((message) => console.log(message.sid)).catch((err)=>{console.log(err);});
