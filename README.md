# fabot

Tiny small express app sample of interacting with the  Facebook Messenger Platform

TODO: . extract facebook message interface and the bot ai implementation to  external libraries.
      .implemement an ai nodejs platform such as https://wit.ai/ or other on the bot layer (maybe built our own).
      


But for now you can :


1- Clone this repo

2- Run npm i

3- After configuring facebook (steps bellow, more details on https://developers.facebook.com/docs/messenger-platform/quickstart)
copy paste the WEBHOOK_TOKEN on the config.json file of this project, and ...

5- curl -ik -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=PAGE_TOKEN"


 Configuring Facebook

a. Create a Facebook App
     https://developers.facebook.com/quickstarts/?platform=web
     The Page profile pic and name will be used to form the "identity" of your bot and is what people will see when they engage it.

b. Create a Page
  https://www.facebook.com/pages/create
   Your Facebook App can remain in sandbox mode and your Page does NOT have to be publicly visible.

c. Configure your Facebook App to use the Messenger Product.
     Go to your app settings and, under Product Settings, click "Add Product." Select "Messenger."
     In the Messenger tab select a WEBHOOK_TOKEN and copy paste it on the config.json file of this project.

 d. On the Webhooks set the webhook url where this is running (https://thisapp/webhook/)
 and select the options:

    messages
    message_deliveries
    messaging_optins
    messaging_postbacks


The app should run publicly in order for Facebook to reach the webhook endpoint;
