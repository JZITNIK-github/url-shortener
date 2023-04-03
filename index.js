const express = require('express');
const fs = require('fs');
const app = express();
var config;
if (process.env.urlShortenerPath && process.env.urlShortenerPassword) {
    config = {"port": 3000, "path": process.env.urlShortenerPath, "password": process.env.urlShortenerPassword}
}
else {
    config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
}
app.use(express.json())
app.get('/', (request, response) => {
    fs.readFile('./pages/index.html', 'utf8', (err, data) => {
        response.send(data);
    })
});

app.get(config.path+"/*", (request, response) => {
    fs.readFile('./database/urls.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        if (err) {
            response.sendStatus(500)
        }
        else {
            if (data[request.path.replace(config.path+"/","")]) {
                response.redirect(data[request.path.replace(config.path+"/","")])
            }
            else {
                response.status(404)
                fs.readFile('./pages/404-website.html', 'utf8', (err, data) => {
                    response.send(data);
                })
            }
        }
    });
})
app.post('/api/testpass',(req, response) => {
    let {pass} = req.body
    if (pass === config.password) {
        response.send(JSON.stringify(
            {
                "result":true
            }
        ))
    }
    else {
        response.send(JSON.stringify(
            {
                "result":false
            }
        ))
    }
})
app.get('/api/geturls/:pass',(req, response) => {
    let {pass} = req.params
    if (pass === config.password) {
        fs.readFile('./database/urls.json', 'utf8', (err, data) => {
            response.send(JSON.stringify(
                {
                    "result":true,
                    "content": JSON.parse(data),
                    "path": config.path
                }
            ))
        })
    }
    else {
        response.send(JSON.stringify(
            {
                "result":false
            }
        ))
    }
})

app.delete("/api/remove/", (req, res) => {
    let {key, pass} = req.body
    if (pass === config.password) {
        fs.readFile('./database/urls.json', 'utf8', (err, data) => {
            var data = new Map(Object.entries(JSON.parse(data)));
            if (data.get(key) === undefined) {
                res.status(500);
                res.send(JSON.stringify(
                  {
                      "result":null
                  }
                ))
            }
            else {
                data.delete(key);
                var object = Object.fromEntries(data);
                fs.writeFile('./database/urls.json', JSON.stringify(object), err => {
                    if (err) {
                      res.status(500);
                      res.send(JSON.stringify(
                        {
                            "result":null
                        }
                      ))
                    }
                    else {
                        res.send(JSON.stringify(
                            {
                                "result":true
                            }
                        ))
                    }
                });
            }
        })
    }
    else {
        res.send(JSON.stringify(
            {
                "result":false
            }
        ))
    }
})

app.post('/api/create',(req, response) => {
    let {pass,to} = req.body
    if (pass === config.password) {
        const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        var datas;
        var final = ""
        fs.readFile('./database/urls.json', 'utf8', (err, data) => {
            datas = JSON.parse(data)
            while (true) {
                final = "";
                for (var i = 0; i < 5; i++) {
                    final += characters.charAt(Math.floor(Math.random() * characters.length))
                }
                if (datas[final] == undefined) {
                    break
                }
            }
            
            fs.readFile('./database/urls.json', 'utf8', (err, data) => {
                var data = JSON.parse(data)
                data[final] = to
                fs.writeFile('./database/urls.json', JSON.stringify(data), err => {
                    if (err) {
                        response.status(500);
                        response.send(JSON.stringify(
                        {
                            "result":null
                        }
                      ))
                    }
                    else {
                        response.send(JSON.stringify(
                            {
                                "result":true,
                                "from": config.path+"/"+final
                            }
                        ))
                    }
                });
            })
        })
    }
    else {
        response.send(JSON.stringify(
            {
                "result":false
            }
        ))
    }
})

app.get('/*', (request, response) => {
    fs.readFile('./pages/404-main.html', 'utf8', (err, data) => {
        response.send(data);
    })
})


app.listen(config.port, function () {
    console.log('Server started on port '+config.port+".");
});