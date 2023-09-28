import express from "express";
import qr from "qr-image";
import bodyParser from "body-parser"
import fs from "fs";
const app = express();
const port = 3000;
const qrDirectory = "./public/userQR";


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/process-form', (req, res) => {
    const urlInputValue = req.body['basic-url'];
    const fileNameInputValue = req.body['file_name'];
    const filePath = `${qrDirectory}/${fileNameInputValue}.png`;

    var qr_png = qr.image(urlInputValue);
    qr_png.pipe(fs.createWriteStream(filePath));

    res.setHeader("Content-disposition", `attachment; filename=${filePath}.png`);
    res.setHeader("Content-type", "image/png");
        
    // For now, just send a response back to the client
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Listen for the 'finish' event to send the response after the file has been fully streamed
    fileStream.on('finish', () => {
        res.send('Form submitted successfully!');
    });
});

app.get("/")


app.listen(port, ()=>{0
    console.log(`Server is running at port: ${port}`);
});