import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    min: 18,
    max: 65,
    required: true,
  },

  favouriteFoods: {
    type: [String],
    //enum: ["Pizza", "Burger", "Fries", "Chocolate", "Ice cream"]
  }
})

const User = mongoose.model("User", userSchema);

export default User;