'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 3000, () => console.log('webhook is listening at 3000. Lets hope its working'));




// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {

  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});
























































































// 'use strict';

// // Imports dependencies and set up http server
// const
//   PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
//   express = require('express'),
//   bodyParser = require('body-parser'),
//   app = express().use(bodyParser.json()); // creates express http server


// // Sets server port and logs message on success
// app.listen(process.env.PORT || 3000, () => console.log('webhook is listening at 3000'));







// // Creates the endpoint for our webhook 
// app.post('/webhook', (req, res) => {

//   let body = req.body;

//   // Checks this is an event from a page subscription
//   if (body.object === 'page') {

//     // Iterates over each entry - there may be multiple if batched
//     body.entry.forEach(function (entry) {
//       // Gets the body of the webhook event
//       // Gets the message. entry.messaging is an array, but 
//       // will only ever contain one message, so we get index 0
//       let webook_event2 = entry.changes[0];
//       let webhook_event = entry.messaging[0];
//       console.log(webhook_event);
//       console.log(webhook_event2);

//       // Get the sender PSID
//       let sender_psid = webhook_event.sender.id;
//       console.log('Sender PSID: ' + sender_psid);



//     });

//     // Returns a '200 OK' response to all requests
//     res.status(200).send('EVENT_RECEIVED');
//   } else {
//     // Returns a '404 Not Found' if event is not from a page subscription
//     res.sendStatus(404);
//   }

// });











// // Adds support for GET requests to our webhook
// app.get('/webhook', (req, res) => {

//   // Your verify token. Should be a random string.
//   let VERIFY_TOKEN = "justussylvestervoigt"

//   // Parse the query params
//   let mode = req.query['hub.mode'];
//   let token = req.query['hub.verify_token'];
//   let challenge = req.query['hub.challenge'];

//   // Checks if a token and mode is in the query string of the request
//   if (mode && token) {

//     // Checks the mode and token sent is correct
//     if (mode === 'subscribe' && token === VERIFY_TOKEN) {

//       // Responds with the challenge token from the request
//       console.log('WEBHOOK_VERIFIED');
//       res.status(200).send(challenge);

//     } else {
//       // Responds with '403 Forbidden' if verify tokens do not match
//       res.sendStatus(403);
//     }
//   }
// });




// // Handles messages events
// function handleMessage(sender_psid, received_message) {

// }

// // Handles messaging_postbacks events
// function handlePostback(sender_psid, received_postback) {

// }

// // Sends response messages via the Send API
// function callSendAPI(sender_psid, response) {

// }





















// // Creates the endpoint for our webhook 
// app.post('/', (req, res) => {
//   // console.log(JSON.stringify(req.body));
//   // res.send(req.body);
//   let body = req.body;

//   // console.log(req.body);

//   console.log(req.body.entry[0].messaging[0].sender.id);


//   // Checks this is an event from a page subscription
//   if (body.object === 'page') {

//     // Iterates over each entry - there may be multiple if batched
//     body.entry.forEach(function (entry) {

//       // Gets the message. entry.messaging is an array, but 
//       // will only ever contain one message, so we get index 0


//       let webhook_event = entry.changes[0];
//       console.log(entry.messaging);
//       // Get the sender PSID
//       let sender_psid = webhook_event.sender.id; //facebook example
//       console.log('Sender PSID: ' + sender_psid); //Facebook example
//       console.log(webhook_event);

//       // Check if the event is a message or postback and
//       // pass the event to the appropriate handler function
//       if (webhook_event.message) {
//         handleMessage(sender_psid, webhook_event.message); //facebook example
//       } else if (webhook_event.postback) {
//         handlePostback(sender_psid, webhook_event.postback); //facebook example
//       }

//     });

//     function handleMessage(sender_psid, received_message) {

//       let response;

//       // Check if the message contains text
//       if (received_message.text) {

//         // Create the payload for a basic text message
//         response = {
//           "text": `You sent the message: "${received_message.text}". Now send me an image!`
//         }
//       }

//       // Sends the response message
//       callSendAPI(sender_psid, response);
//     } //all of the above facebook example




//     // Returns a '200 OK' response to all requests
//     res.status(200).send('EVENT_RECEIVED');
//   } else {
//     // Returns a '404 Not Found' if event is not from a page subscription
//     res.sendStatus(404);
//   }

// });


// // Adds support for GET requests to our webhook
// app.get('/', (req, res) => {
//   console.log('get request received');

//   // Your verify token. Should be a random string.
//   let VERIFY_TOKEN = "justussylvestervoigt"

//   // Parse the query params
//   let mode = req.query['hub.mode'];
//   let token = req.query['hub.verify_token'];
//   let challenge = req.query['hub.challenge'];

//   // Checks if a token and mode is in the query string of the request
//   if (mode && token) {

//     // Checks the mode and token sent is correct
//     if (mode === 'subscribe' && token === VERIFY_TOKEN) {

//       // Responds with the challenge token from the request
//       console.log('WEBHOOK_VERIFIED');
//       res.status(200).send(challenge);

//     } else {
//       // Responds with '403 Forbidden' if verify tokens do not match
//       res.sendStatus(403);
//     }
//   }
// });




// // Handles messages events
// function handleMessage(sender_psid, received_message) {

// }

// // Handles messaging_postbacks events
// function handlePostback(sender_psid, received_postback) {

// }

// // Sends response messages via the Send API
// function callSendAPI(sender_psid, response) {

// }