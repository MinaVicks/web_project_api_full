const mongoose = require('mongoose');
const Joi = require('joi');


const cardJoiSchema = Joi.object({
  title: Joi.string().min(2).max(30),
  link: Joi.string().uri().pattern(/\.(jpg|jpeg|png|gif)$/i),
  owner: Joi.string().min(2).max(39),
});

const cardSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9]+([\/\w\.\-_~:\/?#\[\]@!$&'()*+,;=]*)#?$/.test(
          v
        );
      },
      message: (props) => `${props.value} no es una URL de avatar válida!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "likes",
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  Card: mongoose.model('Card', cardSchema),
  cardJoiSchema
};