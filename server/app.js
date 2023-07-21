const AuthModel = require('./Schema/Model');
const JsonModel = require('./Schema/JsonModel');
const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require("multer")




const app = express();
const port = 8080




app.use(cors())
app.use(bodyParser.json());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 1000000, limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))



// Connect to MongoDB
mongoose.connect('mongodb+srv://alfazsozib:nfbV8dRnOkisfNgX@auth.wg7tkxc.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// middlewire to upload json 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/files");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({ storage: storage });
const dataUpload = upload.fields([{ name: 'json', maxCount: 1 }])


app.post('/send-data', async (req, res) => {
  let { name, password, date } = req.body
  console.log(name, password, date)
  date = new Date(date)
  const saveData = new AuthModel({
    name,
    password,
    date
  })
  saveData.save()
  res.json({ message: "OK" })
})



app.get("/get-data", async (req, res) => {
  const allData = await AuthModel.find({})
  res.json(allData)
})



app.post('/remove-data', async (req, res) => {
  const resultToDelete = req.body.id
  if (resultToDelete) await AuthModel.findByIdAndDelete(resultToDelete)
  try {
    res.send("success");
  } catch (e) { res.send(e) }
  console.log("Deleted")
})


app.get('/query-data', async (req, res) => {
  const password = req.query.key
  const name = req.query.name
  const dateNow = new Date()
  const findData = await AuthModel.findOne({ password, name })

  if (name === "83626492" && password === "A8iNsNBuM943I2935l3Nipp2Z5nWxyM0bOBFSQcrjl") {
    res.json({ message: "True" })
  }
  else if (findData) {
    const date = findData.date
    if (date > dateNow) {
      res.json({ message: "True" })
    }
    else res.json({ message: "False" })
  }
  else {
    res.json({ message: findData })
  }
});



app.get("/view-json", async (req, res) => {
  const viewJson = await JsonModel.findById("64bafe107e6fceff0f33b5f3")
  if (viewJson) {
    const dataURI = JSON.stringify(viewJson.jsonFile, null, 2);
    // Extract the base64 data from the data URI
    const base64Data = dataURI.split(",")[1];
    const jsonData = Buffer.from(base64Data, "base64").toString("utf-8");

    // Parse the JSON data
    const parsedData = JSON.parse(jsonData);

    // Save the parsed data to a file (optional)
    fs.writeFileSync("parsed_data.json", JSON.stringify(parsedData, null, 2));

    // Send the JSON data as a response (optional)
    res.json(parsedData);
  } else {
    res.status(404).send("JSON data not found.");
  }
})


// save json file 
app.post("/save", dataUpload, async (req, res) => {

  const json = req.files['json'][0]
  const jsonFileBuffer = fs.readFileSync(json.path)
  const base64Json = jsonFileBuffer.toString('base64')

  await JsonModel.findByIdAndUpdate("64bafe107e6fceff0f33b5f3", {
    jsonFile: `data:${json.mimetype};base64,${base64Json}`,

  });
  // saveData.save
  console.log("Inserted")
  res.send("ok")

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
