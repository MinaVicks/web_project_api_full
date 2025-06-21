import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
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

export const Card = model('Card', cardSchema);