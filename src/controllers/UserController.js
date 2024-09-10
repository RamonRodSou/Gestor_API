
import * as yup from 'yup';
import bcrypt from 'bcryptjs'; 
import UserModel from '../models/User';

class UserController {
  async store(req, res) {
    const {
      registrationDate, firstName, lastName, email,
      phone, cpf, birthDate, maritalStatus, marriageDate, isBaptized,
      baptismDate, father, mother, role, position, password, 
    } = req.body;

    const schema = yup.object().shape({
      registrationDate: yup.date().required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.number().required(),
      cpf: yup.number().required(),
      birthDate: yup.date().required(),
      maritalStatus: yup.object().shape({
        id: yup.number().required(),
        description: yup.string().required()
      }).required(),
      marriageDate: yup.date().nullable(),
      isBaptized: yup.boolean().required(),
      baptismDate: yup.date().nullable(),
      father: yup.string().required(),
      mother: yup.string().required(),
      role: yup.object().shape({
        id: yup.number().required(),
        role: yup.string().required()
      }).required(),
      position: yup.object().shape({
        id: yup.number().required(),
        position: yup.string().required()
      }).required(),
      password: yup.string().required()

    });

    try {

      await schema.validate(req.body);

      const password_hash = await bcrypt.hash(password, 8);
      const lastUser = await UserModel.findOne().sort({ registrationNumber: -1 });
      const newRegistrationNumber = lastUser ? lastUser.registrationNumber + 1 : 100000;
      let user = await UserModel.findOne({ email });

      if (!user) {
        user = await UserModel.create({
          registrationNumber: newRegistrationNumber, registrationDate, firstName, lastName, email,
          phone, cpf, birthDate, maritalStatus, marriageDate, isBaptized,
          baptismDate, father, mother, role, position, password_hash 
        });
      }

      return res.json({
        registrationNumber: user.registrationNumber,
        firstName: user.firstName,
        email: user.email
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const users = await UserModel.find();
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      registrationDate, firstName, lastName, email,
      phone, cpf, birthDate, maritalStatus, marriageDate, isBaptized,
      baptismDate, father, mother, role, position, password
    } = req.body;

    const schema = yup.object().shape({
      registrationDate: yup.date().required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.number().required(),
      cpf: yup.number().required(),
      birthDate: yup.date().required(),
      maritalStatus: yup.object().shape({
        id: yup.number().required(),
        description: yup.string().required()
      }).required(),
      marriageDate: yup.date().nullable(),
      isBaptized: yup.boolean().required(),
      baptismDate: yup.date().nullable(),
      father: yup.string().required(),
      mother: yup.string().required(),
      role: yup.object().shape({
        id: yup.number().required(),
        role: yup.string().required()
      }).required(),
      position: yup.object().shape({
        id: yup.number().required(),
        position: yup.string().required()
      }).required(),
      password: yup.string().required()
    });

    try {
      await schema.validate(req.body);

      const user = await UserModel.findByIdAndUpdate(id, {
        registrationNumber, registrationDate, firstName, lastName, email,
        phone, cpf, birthDate, maritalStatus, marriageDate, isBaptized,
        baptismDate, father, mother, role, position, password
      }, { new: true });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
