import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

// Encriptação do password
UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

const userModel = mongoose.model('Usuario', UserSchema);

export default userModel;
