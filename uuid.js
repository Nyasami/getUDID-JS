const express = require('express');
const { parseStringPromise } = require('xml2js');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/config.mobileconfig');
});

app.post('/endpoint', express.raw({ type: '*/*' }), async (req, res) => {
    try {
        const bodyString = req.body.toString('utf-8');
        // Define the beginning and end of the plist file
        const plistBegin = '<?xml version="1.0"';
        const plistEnd = '</plist>';

        const pos1 = bodyString.indexOf(plistBegin);
        const pos2 = bodyString.indexOf(plistEnd) + plistEnd.length;
        const xmlData = bodyString.substring(pos1, pos2);

        const result = await parseStringPromise(xmlData);
        
        let UDID = '';
        let DEVICE_PRODUCT = '';
        let DEVICE_VERSION = '';
        let DEVICE_NAME = '';
        
        const dict = result.plist.dict[0].key;
        const values = result.plist.dict[0].string;
        // I'm leaving this for you to do whatever you want with the data
        // gotten from the plist file
        dict.forEach((key, index) => {
            switch (key) {
                case 'UDID':
                    UDID = values[index];
                    break;
                case 'PRODUCT':
                    DEVICE_PRODUCT = values[index];
                    break;
                case 'VERSION':
                    DEVICE_VERSION = values[index];
                    break;
                case 'DEVICE_NAME':
                    DEVICE_NAME = values[index];
                    break;
            }
        });
        // Redirect to the show page with the UDID
        res.redirect(`/show/${UDID}`);
    } catch (error) {
        console.error('Error parsing XML:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/show/:udid', (req, res) => {
    res.send(`
        <h1>Your UDID is:</h1>
        <p>${req.params.udid}</p>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


