const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(express.static("public")); // to use static files
app.use(bodyParser.json()); // looks at requests where the Content-Type: application/json header is present and transforms the text-based JSON input into JS-accessible variables under req.body.
app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine','ejs');

let items = [];
let workItems = [];

app.get('/', (req, res) => {
    let today = new Date();
    
    let options = {
        weekday: "long",
        day : "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US",options);

    
    res.render('list',{listTitle:day,
                      newListItem:items       //from post
    });
    // res.sendFile(__dirname+"/index.html")
});

app.post('/', (req, res) => {
    
    let newItem = req.body.newItem;
    if(req.body.button === "Work List"){
        workItems.push(newItem);
        res.redirect("/work");
    }else{
        items.push(newItem);
        res.redirect("/");
    }
    
})

app.get('/work', (req, res) => {
    res.render('list',{listTitle:"Work List",
                        newListItem:workItems})
})

// app.post('/work', (req, res) => {
//     let newItem = req.body.newItem;
   
// })

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(3000,function () {
    console.log('listening on port 3000')
});