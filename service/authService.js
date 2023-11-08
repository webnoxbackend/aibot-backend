const _ = require('lodash')
const bcrypt = require("bcrypt")

module.exports.login = async (props) => {
  const { password, email} = props;

  try {
  
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("hashedpas",hashedPassword)

        const user = await global.dbConnection('app_users')
                                      .select(
                                        'app_users.authname',
                                        'app_users.password',
                                        'app_users.firstname',
                                        'app_users.lastname',
                                        )
                                      .where({ authname: email});
        const compare = await bcrypt.compare(password,user[0].password)

        console.log("compare..",compare)

        return !_.isEmpty(user) && compare ? user :  null
   
  } catch (err) {
    console.log(err);
  }
  return null;
};

module.exports.UserStatus = async (props) => {
  const { email, password } = props
  try {

      const user = await global.dbConnection('app_users').select('status').where({ authname: email, password: password });

      return !_.isEmpty(user) ? user[0].status : null

  } catch (err) {
    console.log("error", err)
  }
  return null
}
