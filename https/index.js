const https = require("https");
const fs = require("fs");

const options = {
  hostname: "shane-fretwell.netlify.app",
  port: 443,
  path: "/education",
  method: "GET",
};

const request = https.request(options, (res) => {
  let chunkCount = 0;
  let responseBody = "";
  res.setEncoding("UTF-8");
  res.on("data", chunk => {
    console.log("----chunk", chunk.length);
    responseBody += chunk;
    chunkCount++;
  })
  res.on("end", () => {
    fs.writeFile("education.html", responseBody, err => {
      if (err) {
        throw err;
      }
    })
    console.log("file downloaded");
  })
})

request.end();
