const userService = require("../../service/authService");
const _ = require('lodash')
const Joi = require('joi');


module.exports.login = async (req, res) => {
  try { 
   const schema = Joi.object({
    password: Joi.string().required(), 
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                    .required()
      })

   const validationResult = schema.validate(req.body)
   const UserStatus = await userService.UserStatus(req.body)
 
   if(UserStatus == "Blocked"){
       return res.send({status: false , message: "User is blocked"})
   }else if(UserStatus == "InActive"){
       return res.send({status: false , message: "User is InActive"})
   }else if(!_.isEmpty(validationResult.error)){
    return res.send({
      status: false,
      message: `${validationResult.error.details[0].message}`
    })
}
   else {
      const response = await userService.login(req.body);
   
      if (!_.isEmpty(response)) {
        return res.json({
          status: true,
          message: "Logged in Successfully",
          response: response
        });
      }

    }
      
  } catch (err) {
    console.log(err);
  }
  return res.json({ status: false, message: "Invalid credentials!" });
};

