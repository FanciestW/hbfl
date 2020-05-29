// Imports
const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({ profile: 'edu' });
AWS.config.update({ credentials, region: 'us-east-1' });

// Declare local variables
const ec2 = new AWS.EC2();

function listInstances () {
  return new Promise((resolve, reject) => {
    ec2.describeInstances({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Reservations.reduce((i, r) => {
          return i.concat(r.Instances);
        }, []));
      }
    });
  });
}

function terminateInstance (instanceId) {
  const params = {
    InstanceIds: [
      instanceId,
    ]
  };
  return new Promise((resolve, reject) => {
    ec2.terminateInstances(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

// listInstances()
// .then(data => console.log(data));
terminateInstance('i-0de588c8174769c02')
.then(data => console.log(data))
