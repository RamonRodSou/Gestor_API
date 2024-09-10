import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  registrationNumber: { type: Number, required: true },
  registrationDate: { type: Date, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  cpf: { type: Number, required: true },
  birthDate: { type: Date, required: true },
  maritalStatus: {
    id: { type: Number, required: true },
    description: { type: String, required: true }
  },
  marriageDate: { type: Date, default: null },
  isBaptized: { type: Boolean, required: true }, 
  baptismDate: { type: Date, default: null },
  father: { type: String, required: true },
  mother: { type: String, required: true },
  role: {
    id: { type: Number, required: true },
    role: { type: String, required: true }
  },
  position: {
    id: { type: Number, required: true },
    position: { type: String, required: true }
  },
  password_hash: { type: String, required: true }

});

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password_hash);
}

const UserModel = model('User', UserSchema);

export default UserModel;
