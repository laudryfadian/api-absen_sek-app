const User = require("../modules/user/user_model");

module.exports = {
  //changing value isAbsen for all user
  absenSchedule: async () => {
    await User.updateMany({isAbsen: false});
    return true;
    
  }
}