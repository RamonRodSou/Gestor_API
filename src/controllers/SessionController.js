import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import UserModel from '../models/User';
import authConfig from '../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    try {
      await schema.validate(req.body);
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado!' });
      }

      const isPasswordValid = await user.checkPassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        authConfig.JWT_SECRET,
        { expiresIn: authConfig.expiresIn }
      );

      return res.json({
        UserModel: {
          registrationNumber: user.registrationNumber,
          firstName: user.firstName,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new SessionController();
