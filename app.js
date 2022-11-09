const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.post('/', function(req, res){

    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.mail;

    // console.log(fname, lname, mail);

const data = {
        member: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                    
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/50cb825e5b ";

    const options = {
        method: 'POST',
        auth: 'Shaun: c029909464a46b364435eae2c88ff415-us5 '
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        }
        else{
            res.sendFile(__dirname + '/failure.html');
        }
        
        response.on('data', function(data){
             console.log(JSON.parse(data));
             
           })

         })

    request.write(jsonData);
    request.end();

})

app.listen(3000, function (){
    console.log('Listening on port 3000');
})

//c029909464a46b364435eae2c88ff415-us5       -->  api key
// 50cb825e5b      LIST ID
