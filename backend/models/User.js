const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: false}
    ,versionKey: false
  }
);

userSchema.virtual('tasks', {
  ref: "Task",
  localField: "_id",
  foreignField: "userId",
  justOne: true
})

const User = mongoose.model("User", userSchema)

module.exports = User