// model is exported as a function
// db instance is passed in as the parameter
module.exports = db => {
  // creating a user db model
  // a db model is a definition of what a particular
  // data type is going to look like

  // db.createModel takes in 3 parameters (1 is optional)
  // createModel(modelName, modelSchema, modelOptions)
  // modelName - the name of the db table/collection the records will be stored in
  // modelSchema - the shape/definition of what the data will look like
  // modelOptions - alternate settings to change the behavior of how our data
  // is validated, saved or queried.
  let User = db.createModel("User", {
    email: db.type.string().required(),
    password: db.type.string().required()
  });

  // return the model from the function
  return User;
};
