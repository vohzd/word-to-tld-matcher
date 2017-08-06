const express         = require("express");
const cors            = require("cors");
const app             = express();
const bodyParser      = require("body-parser");


app.use(cors({
  origin: "*"
}));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hello")
});

app.get("/parseFile", (req, res) => {
  res.send("No file");
})

app.post("/parseFile", (req, res) => {

  /*
  console.log(req.body);
  res.json(req.body, "file.json");

  */
  console.log("blarg");
  console.log(req.body);

  //res.sendStatus(200);
  res.json(req.body);
});


app.listen(3000, () => {
  console.log("yep");
});
