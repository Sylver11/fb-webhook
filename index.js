'use strict';
const PAGE_ACCESS_TOKEN = process.env.VARNAME;
// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 3000, () => console.log('webhook is listening at 3000 '));
// console.log(process.env.VARNAME);

// Accepts POST requests at /webhook endpoint
app.post('/', (req, res) => {

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function (entry) {
      // console.log(body);
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      // let webhook_event = entry[0];
      // console.log(body.entry);
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {

        handlePostback(sender_psid, webhook_event.postback);
      }

    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/', (req, res) => {

  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "justussylvestervoigt";

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {

    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});


// Handles messages events
// function handleMessage(sender_psid, received_message) {

// }

// Handles messaging_postbacks events
// function handlePostback(sender_psid, received_postback) {

// }

// Sends response messages via the Send API
// function callSendAPI(sender_psid, response) {

// }


// var farmers = [{
//   '0000': ["test"]
// }];




// console.log("trying");


function handleMessage(sender_psid, received_message) {
  let response;

  if (received_message.text) {
    switch (received_message.text.replace(/[^\w\s]/gi, '').trim().toLowerCase()) {
      case "farmer":
        response = openwebview(sender_psid);
        console.log("farmer has been choosen");
        break;
      default:
        response = {
          "text": `You sent the message: "${received_message.text}".`
        };
        break;
    }
  } else {
    response = {
      "text": `Sorry, I don't understand what you mean.`
    }
  }

  // // Checks if the message contains text
  // if (received_message.text == "farmer") {
  //   // Create the payload for a basic text message, which
  //   // will be added to the body of our request to the Send API
  //   response = {
  //     "text": 'Hi there, hope you doing well today! Please enter your PIN.'
  //     // "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
  //   }
  // }
  // if (farmers.includes(received_message.text)) {
  //   response = {
  //     "text": 'Hi Test, hope you doing well! Please choose your available harvest.'

  //   }
  // }


  // Define the template and webview
  function openwebview(sender_psid) {
    console.log("initiated the function");
    let response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Hello Umthunzi Farmer! Please click the link below.",
          buttons: [{
            type: "web_url",
            // url: SERVER_URL + "/options",
            // url: process.env.SERVER_URL,
            url: "https://umthunzi.justusvoigt.com",
            title: "Open Veggi Mart",
            webview_height_ratio: "full",
            messenger_extensions: true
          }]
        }
      }
    };
    return response;

  }

  // else if (received_message.attachments) {
  //   // Get the URL of the message attachment
  //   let attachment_url = received_message.attachments[0].payload.url;
  //   response = {
  //     "attachment": {
  //       "type": "template",
  //       "payload": {
  //         "template_type": "generic",
  //         "elements": [{
  //           "title": "Is this the right picture?",
  //           "subtitle": "Tap a button to answer.",
  //           "image_url": attachment_url,
  //           "buttons": [{
  //               "type": "postback",
  //               "title": "Yes!",
  //               "payload": "yes",
  //             },
  //             {
  //               "type": "postback",
  //               "title": "No!",
  //               "payload": "no",
  //             }
  //           ],
  //         }]
  //       }
  //     }
  //   }
  // }

  // Send the response message
  callSendAPI(sender_psid, response);
}

// function handlePostback(sender_psid, received_postback) {
//   console.log('ok')
//   let response;
//   // Get the payload for the postback
//   let payload = received_postback.payload;

//   // Set the response based on the postback payload
//   if (payload === 'yes') {
//     response = {
//       "text": "Thanks!"
//     }
//   } else if (payload === 'no') {
//     response = {
//       "text": "Oops, try sending another image."
//     }
//   }
//   // Send the message to acknowledge the postback
//   callSendAPI(sender_psid, response);
// }

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": {
      "access_token": PAGE_ACCESS_TOKEN

    },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}