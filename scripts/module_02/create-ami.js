// Imports
const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({ profile: 'edu' });
AWS.config.update({ credentials, region: 'us-east-1' });

// Declare local variables
const ec2 = new AWS.EC2();

createImage('i-0a0389e6867fc0379', 'hamsterImage')
  .then(() => console.log('Complete'))

function createImage(seedInstanceId, imageName) {
  const params = {
    InstanceId: seedInstanceId,
    Name: imageName,
  };
  return new Promise((resolve, reject) => {
    ec2.createImage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        ec2.createTags({
          Resources: [data.ImageId],
          Tags: [
            {
              Key: 'App',
              Value: 'Pluralsight'
            },
            {
              Key: 'Course',
              Value: 'AWS Developer: Designing and Developing'
            }
          ]
        }, (err, data) => {
          if (!err) console.log('TAGGED');
        });
        resolve(data);
      }
    });
  });
}
