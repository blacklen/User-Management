const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const db = require("mongoose");
const ObjectId = db.Schema.Types.ObjectId;

const userModel = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(value) {
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regex.test(value);
        },
        message: "{VALUE} is not a valid email address!"
      }
    },
    fullName: {type: String,required: true},
    active: { type: Boolean, default: true },
    listFriend: [
      {type: ObjectId, ref: "users"}
    ],
    listEvent : [
      {
        name: {type: String, default: ""},
        friends: [
          {
            friend: {type: ObjectId,  ref: "users"},
            paid: {
              type: Number, default: 0,
            },
            attend: [
              {type: ObjectId, ref: "users"}
            ],
            mustPay: {type: Number,default: 0},
            debt: [
              {type: ObjectId, ref: "users"}
            ],
            done: {type: Boolean, default: false}
          }
        ]
      }
    ]

  },
  { timestamps: { createdAt: "createdAt" } }
);

userModel.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt
    .genSalt(12)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});

module.exports = mongoose.model("users", userModel);
