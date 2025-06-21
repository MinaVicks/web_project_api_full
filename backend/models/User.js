import { Schema, model } from 'mongoose';


const userSchema = new Schema({
   email: {
    type: String,
    required: true,
    unique: true,
  },
    password: {
    type: String,
    required: true,
    select: false,
  },
  name:{
    type:String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 40,
    
  },
  about:{
    type:String,
    default: 'Explorador',
    minlength: 2,
    maxlength: 40,
  },
  avatar:{
    type:String,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v); }, 
      message: props => `${props.value} is not a valid URL!`
    }
  }

},{ timestamps: true });

export const User = model('user', userSchema);
