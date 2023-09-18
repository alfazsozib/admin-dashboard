const AuthModel = require('./Schema/Model');
const JsonModel1 = require('./Schema/JsonModel1');
const JsonModel2 = require("./Schema/JsonModel2");
const JsonModel3 = require("./Schema/JsonModel3");
const JsonModel4 = require("./Schema/JsonModel4");
const Profit = require("./Schema/Profit");
const NewUser = require("./Schema/NewUser");
const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require("multer")
const transporter = require('./utils/mailer')



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
const dataUpload = upload.fields([{ name: 'json1', maxCount: 1 }, { name: 'json2', maxCount: 1 }, { name: 'json3', maxCount: 1 },{ name: 'json4', maxCount: 1 }])


app.post('/send-data', async (req, res) => {
  let { name, password, date, email,affiliateName, affiliatePercentage , metaID , ourFee, address, phone } = req.body
  console.log(name, password, email)
  console.log(req.body)

  const saveData = new NewUser({
    name,
    password,
    date,
    affiliateName,
    affiliatePercentage,
    metaID,
    ourFee,
    address,
    phone,
    email
  })
  saveData.save()

  if (email) {
    try{
    await transporter.sendMail({
      from: '"Test Mail From Admin " <testavaliable0@gmail.com>',
      to: email,
      subject: "Test Mail From Admin",
      html: `
      <p> Hey there,</p>
      
        <p>Thanks for signing up! We're thrilled to have you on board.</p>
      
        <div>
          <p>
          But before we get started, we need to make sure your email address is legit. It's an important step to keep your
          account secure and to ensure you don't miss out on any exciting updates or promotions.
          </p>
          
        <p>Thanks for your cooperation!</p>
        <br>
        </div>

        Best,
        <br>
        ------
    `,
    })
  }catch(e){console.log(e)}
  }
  res.json({ message: "OK" })
})



app.get("/get-data", async (req, res) => {
  const allData = await AuthModel.find({})
  res.json(allData)
})


app.get("/get-user-data", async (req, res) => {
  const allData = await NewUser.find({})
  res.json(allData)
})


app.post('/remove-data', async (req, res) => {
  console.log(req)
  const resultToDelete = req.body.id
  if (resultToDelete) await NewUser.findByIdAndDelete(resultToDelete)
  try {
    res.send("success");
  } catch (e) { res.send(e) }
  console.log("Deleted")
})


app.post('/edit-data', async (req, res) => {
  const resultToUpdate = req.body.id
  let { name, password, date, email,affiliateName, affiliatePercentage , metaID , ourFee, address, phone } = req.body
  console.log(resultToUpdate, name, date)
  if (resultToUpdate) await NewUser.findByIdAndUpdate(resultToUpdate, {
    name,
    date,
    affiliateName,
    affiliatePercentage,
    metaID,
    ourFee,
    address,
    phone,
    email
  })

  res.json("ok");
})


app.get('/query-data', async (req, res) => {
  const password = req.query.key
  const name = req.query.name
  const dateNow = new Date()
  const findData = await AuthModel.findOne({ password, name })

 
  if (findData) {
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



app.get("/view-json-1", async (req, res) => {
  const viewJson = await JsonModel1.findById("64cd3b6b2b5b34b77620db10")
  if (viewJson) {
    const dataURI = JSON.stringify(viewJson.jsonFile, null, 2);
    const base64Data = dataURI.split(",")[1];
    const jsonData = Buffer.from(base64Data, "base64").toString("utf-8");
    const parsedData = JSON.parse(jsonData);
    fs.writeFileSync("parsed_data.json", JSON.stringify(parsedData, null, 2));
    res.json(parsedData);
  } else {
    res.status(404).send("JSON data not found.");
  }
})

app.get("/view-json-2", async (req, res) => {
  const viewJson = await JsonModel2.findById("64cd3a6dad7ca683f8ee265d")
  if (viewJson) {
    const dataURI = JSON.stringify(viewJson.jsonFile, null, 2);
    const base64Data = dataURI.split(",")[1];
    const jsonData = Buffer.from(base64Data, "base64").toString("utf-8");
    const parsedData = JSON.parse(jsonData);
    fs.writeFileSync("parsed_data.json", JSON.stringify(parsedData, null, 2));
    res.json(parsedData);
  } else {
    res.status(404).send("JSON data not found.");
  }
})

app.get("/view-json-3", async (req, res) => {
  const viewJson = await JsonModel3.findById("64ce98606d3965e85a9b42d8")
  if (viewJson) {
    const dataURI = JSON.stringify(viewJson.jsonFile, null, 2);
    const base64Data = dataURI.split(",")[1];
    const jsonData = Buffer.from(base64Data, "base64").toString("utf-8");
    const parsedData = JSON.parse(jsonData);
    fs.writeFileSync("parsed_data.json", JSON.stringify(parsedData, null, 2));
    res.json(parsedData);
  } else {
    res.status(404).send("JSON data not found.");
  }
})

app.get("/view-json-4", async (req, res) => {
  const viewJson = await JsonModel4.findById("64dea578422c7566c276f448")
  if (viewJson) {
    const dataURI = JSON.stringify(viewJson.jsonFile, null, 2);
    const base64Data = dataURI.split(",")[1];
    const jsonData = Buffer.from(base64Data, "base64").toString("utf-8");
    const parsedData = JSON.parse(jsonData);
    fs.writeFileSync("parsed_data.json", JSON.stringify(parsedData, null, 2));
    res.json(parsedData);
  } else {
    res.status(404).send("JSON data not found.");
  }
})


// save json file 
app.post("/save-1", dataUpload, async (req, res) => {

  const json = req.files['json1'][0]
  const jsonFileBuffer = fs.readFileSync(json.path)
  const base64Json = jsonFileBuffer.toString('base64')

  await JsonModel1.findByIdAndUpdate("64cd3b6b2b5b34b77620db10", {
    jsonFile: `data:${json.mimetype};base64,${base64Json}`,

  });
  console.log("Inserted")
  res.send("ok")

})



app.post("/save-2", dataUpload, async (req, res) => {

  const json = req.files['json2'][0]
  const jsonFileBuffer = fs.readFileSync(json.path)
  const base64Json = jsonFileBuffer.toString('base64')

  await JsonModel2.findByIdAndUpdate("64cd3a6dad7ca683f8ee265d", {
    jsonFile: `data:${json.mimetype};base64,${base64Json}`,

  });
  console.log("Inserted")
  res.send("ok")

})

app.post("/save-3", dataUpload, async (req, res) => {

  const json = req.files['json3'][0]
  const jsonFileBuffer = fs.readFileSync(json.path)
  const base64Json = jsonFileBuffer.toString('base64')

  await JsonModel3.findByIdAndUpdate("64ce98606d3965e85a9b42d8", {
    jsonFile: `data:${json.mimetype};base64,${base64Json}`,

  });
  console.log("Inserted")
  res.send("ok")

})

app.post("/save-4", dataUpload, async (req, res) => {

  const json = req.files['json4'][0]
  const jsonFileBuffer = fs.readFileSync(json.path)
  const base64Json = jsonFileBuffer.toString('base64')
  
  await JsonModel4.findByIdAndUpdate("64dea578422c7566c276f448", {
    jsonFile: `data:${json.mimetype};base64,${base64Json}`,

  });
  console.log("Inserted")
  res.send("ok")

})


app.post('/send-mail', async (req, res) => {
  const { email } = req.body
  await transporter.sendMail({
    from: '"Test Mail From Admin " <testavaliable0@gmail.com>',
    to: email,
    subject: "Test Mail From Admin",
    html: `
      <p> Hey there,</p>
      
        <p>Thanks for signing up! We're thrilled to have you on board.</p>
      
        <div>
          <p>
          But before we get started, we need to make sure your email address is legit. It's an important step to keep your
          account secure and to ensure you don't miss out on any exciting updates or promotions.
          </p>
          
      

        <p>Thanks for your cooperation!</p>
        <br>
        </div>

        Best,
        <br>
        ------
    `,
  })

});


app.get("/profit-info", async (req, res) => {

    const metaID = req.query.id;
    const key = req.query.key;
    const balance = req.query.balance;
    const profit = req.query.profit;
    const d = new Date()
    const date = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();

    const saveProfitTable = new Profit({
        metaID,
        key,
        balance,
        profit,
        date
    })
    await saveProfitTable.save();
    if (saveProfitTable){
      res.send(saveProfitTable);
    }else{
      res.send("Not Save!");
    }
    
})


app.get("/get-profit-table", async (req, res) => {

    const profitTable = await Profit.find({})
    res.json(profitTable);

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
