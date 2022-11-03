var fs  = require("fs")
var http  = require("http")


// Escribí acá tu servidor
http.createServer(function(req,res){
   fs.readFile(`./images${req.url}.jpg`), function(err,data){
    if(err){
        fs.writeHead(404, {'Content-type': 'text/plain'})
        fs.end('image not found')
    } else {
        fs.writeHead(200, {'Content-type':'image/jpeg'})
        fs.end(data)
    }
   }
   }
).listen(3000,'127.0.0.1')
