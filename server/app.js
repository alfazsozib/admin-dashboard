const AuthModel = require('./Schema/Model')
const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 8080




app.use(cors())
app.use(bodyParser.json());
app.use(express.json({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true , parameterLimit:1000000, limit:"50mb"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))



// Connect to MongoDB
mongoose.connect('mongodb+srv://alfazsozib:nfbV8dRnOkisfNgX@auth.wg7tkxc.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));


app.post('/send-data',async (req, res) => {
    let { name, password, date } = req.body
    console.log(name, password, date)
    date = new Date(date)
    const saveData = new AuthModel({
      name,
      password,
      date
    })
    saveData.save()
    res.json({message:"OK"})
})



app.get("/get-data",async(req,res)=>{
  const allData =await AuthModel.find({})
  res.json(allData)
})



app.post('/remove-data',async(req,res)=>{
  const resultToDelete = req.body.id 
  if (resultToDelete) await  AuthModel.findByIdAndDelete(resultToDelete)
  try{
    res.send("success");
  }catch(e){res.send(e)}
  console.log("Deleted")
})


app.get('/query-data', async(req, res) => {
  const password = req.query.key
  const name = req.query.name
  console.log(password,"Key")
  const dateNow = new Date()
  const findData = await AuthModel.findOne({password,name})
  if (findData){
      const date = findData.date
      if (date>dateNow){
        res.json({message:"True"})
      } 
      else res.json({message:"False"})
  }
  else{
    res.json({message: findData})
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
