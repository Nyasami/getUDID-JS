# getUDID-JS
An ExpressJS server template for getting iOS / iPadOS UDID from user written in Js instead of PHP like most repo on github

## How to use

1. Clone the repo
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000/` in your browser
5. Install the profile and it will redirect to your endpoint
6. You will get the UDID in the response

## Note

- Configure the config.mobileconfig file with your own values first
- Always serve the profile with https otherwise it will not work
- Since it needs to be served with https, this wont work on self local host for testing I recommend using ngrok to test it on local host
