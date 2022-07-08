// third party library
const dynamoose = require('dynamoose');

// create schema
const peopleSchema = new dynamoose.Schema({
  id: String,
  name: String,
  age: String,
  city: String,
});

// create model
const peopleModel = dynamoose.model('lab18-table', peopleSchema);

exports.handler = async (event) => {
  console.log(event.queryStringParameters);

  let {id, name, age, city} = event.queryStringParameters;
  let person = {id, name, age, city};

  let response = {statusCode:  null, body: null};

  try {
    let newPerson = await peopleModel.create(person)
    response.statusCode = 200;
    response.body = JSON.stringify(newPerson);

  } catch(e){
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};
