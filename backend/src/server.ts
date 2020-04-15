import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as cors from "cors";
import * as Busboy from "busboy";
import * as path from "path";
import * as fs from "fs";

const port = 3000;

export class Server {
    
    public app: express.Application;
    private server: http.Server;
    public static bootstrap(): Server {
        return new Server();
    }

    public constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.server = http.createServer(this.app);
        this.app.use(cors());
        this.server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        this.app.post('/upload', function(req, res) {
                const busboy = Busboy({ headers: req.headers });
                busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
                    const saveTo = path.join((path.join(__dirname, "/../uploads/" + filename)));
                    file.pipe(fs.createWriteStream(saveTo));
                });
                busboy.on("finish", function () {
                    res.status(200).json({ "message": "File uploaded successfully." });
                });
                req.pipe(busboy);
          });
    
    }
    public close() {
        this.server.close();
    }
}

const server : Server = new Server();
