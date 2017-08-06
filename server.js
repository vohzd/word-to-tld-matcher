const express         = require("express");
const cors            = require("cors");
const app             = express();
const bodyParser      = require("body-parser");
const csv             = require("csv");
const fs              = require("fs");
/*
  EXPRESS STUFF
  */

app.use(cors({
  origin: "*"
}));

app.use(bodyParser.json({limit: '5mb'}));

app.get("/", (req, res) => {
  res.send("Hello")
});

app.get("/parseFile", (req, res) => {
  res.send("No file");
})

app.post("/parseFile", (req, res) => {
  parseFile(req.body);
  res.json(formattedOutput);
});

app.listen(3000, () => {
  console.log("yep");
});

/*
  FILE I/O STUFF
  */

let listOfTLDs = null;
let resultsArray = [];
let formattedOutput = {}

function parseAllTLDs(){
  fs.readFile("./files/tlds.csv", {
    encoding: "utf-8"
  }, (err, csvData) => {
    if (err){
      console.log(err);
    }
    csv.parse(csvData, (err, parsedData) => {
      listOfTLDs = parsedData;
    });
  })

};

function parseFile(words){
  listOfTLDs.forEach((tld, tldIteration) => {

    if (!tld[0]) return false;
    /// aa, az
    // create a blank array for the results to live in.
    formattedOutput[tld[0]] = [];
    words.forEach((word, wordIteration) => {

      if (!word) return false;
      // aarvard, aachtung...
      let test = word.indexOf(tld[0]);
      let cropPosition = Math.abs(tld[0].length - word.length);
      if (test > 0){
        if (cropPosition === test){
          let hostName = word.slice(0, cropPosition);
          let domainName = `${hostName}.${tld[0]}`;
          formattedOutput[tld[0]].push(domainName);
        }
      }
    });
  });
}

parseAllTLDs();
