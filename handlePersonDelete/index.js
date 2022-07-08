// third party library
const dynamoose = require('dynamoose');

// create schema
const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  age: String,
  city: String
});

// create model
const peopleModel = dynamoose.model('lab18-table', peopleSchema);

exports.handler = async (event) => {
  console.log(event.queryStringParameters);

  let response = {};

  let {id} = event.queryStringParameters;

  try {
    let person = await peopleModel.delete({'id': id});
    response.statusCode = 200;
    response.body = JSON.stringify(person);

  } catch(e){
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};
