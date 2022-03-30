const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());

let count = 0;
const messagesList = [];

app.get('/api/messagesListCheckPalindrom', (req, res) => {
    res.send(messagesList);
  })

app.get('/api/posts/:id', (req, res) => {
    res.send(searchId(req, res));
})

app.post ('/api/messagesListCheckPalindrom', (req, res) => {
    if (searchText(req, res)) {
        count++;
        const message = {
            id: count,
            text: req.body.text,
            palindrom: isPalindrom(req.body.text)        
        }
        messagesList.push(message);
        res.send(message);
    }
});

app.put ('/api/messagesListCheckPalindrom/:id', (req, res) => {
    const message = searchId(req, res);
    if (message && searchText(req, res)) {
        message.text = req.body.text;
        message.palindrom = isPalindrom(req.body.text)        
        res.send(message);
    }
})

app.delete('/api/messagesListCheckPalindrom/:id', (req, res) => {
    if (message = searchId(req, res)) {
        const index = messagesList.indexOf(message);
        messagesList.splice(index, 1);
        res.send(message);
    }
})

function isPalindrom (checkText) {
    for (let i = 0; i<checkText.length-1-i; i++)
        if (checkText.charAt(i)!=checkText.charAt(checkText.length-1-i))
            return false;
    return true;
}

function searchId(req, res){
    const message = messagesList.find (c => c.id === parseInt(req.params.id));
    if (!message) res.status(404).send('error 404. the required id is not exist.');
    else return message;
}

function searchText(req, res) {
    if (req.body.text === undefined)
        res.status(400).send("error 400. missing text");
    else return true;
}

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
