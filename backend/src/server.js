"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var cors = require("cors");
var Busboy = require("busboy");
var path = require("path");
var fs = require("fs");
var port = 3000;
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.server = http.createServer(this.app);
        this.app.use(cors());
        // this.app.use(uploader);
        this.server.listen(port, function () {
            console.log("Server running on port " + port);
        });
        // var storage = multer.diskStorage({
        //     destination: function (req, file, callback) {
        //       callback(null, '/uploads');
        //     },
        //     filename: function (req, file, callback) {
        //       callback(null, file.fieldname);
        //     }
        //   });
        //   var upload = multer({ storage : storage}).single('Ron Nabet CV');
        //   this.app.post('/upload',function(req,res){
        //       console.log("kak");
        //         upload(req,res,function(err) {
        //         if(err) {
        //             return res.end("Error uploading file.");
        //         }
        //         res.end("File is uploaded");
        //     });
        // });
        // this.app.post("/upload" , function (req, res) {
        //     if(req.files)
        // });
        this.app.post('/upload', function (req, res) {
            var busboy = Busboy({ headers: req.headers });
            busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
                var saveTo = path.join((path.join(__dirname, "/../uploads/" + filename)));
                file.pipe(fs.createWriteStream(saveTo));
            });
            busboy.on("finish", function () {
                res.status(200).json({ "message": "File uploaded successfully." });
            });
            req.pipe(busboy);
        });
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.close = function () {
        this.server.close();
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
