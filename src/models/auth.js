const bcrypt = require('bcrypt-as-promised')
const userModel = require('./users')

function login(email, password){
  let user
  return userModel.getUserByEmail(email)
  .then(function(data){
    console.log(data);
    if(!data) throw { status: 400, message: "Bad Request"}
    
    user = data
    return bcrypt.compare(password, data.hashed_password)
  })
  .catch(bcrypt.MISMATCH_ERROR, function(){
    console.log("catch mismatch");
    throw { status: 401, message: "Unauthorized"}
  })
  .then(function(){
    delete user.hashed_password
    return user
  })
}

module.exports = {
  login
}
