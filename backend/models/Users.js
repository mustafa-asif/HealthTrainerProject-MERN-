const {Schema,model} = require("mongoose");

// Define the user schema


const userSchema = new Schema(
  {
    name: {
       type: String,
        required: true 
      },
    email: {
       type: String, 
       required: true, 
       unique: true
      },
    password: {
       type: String, 
       required: true 
      }
  }, 
  { timestamps: true }
);

const Users =model("User", userSchema);
module.exports = Users;
// module.exports = mongoose.model("User", userSchema);