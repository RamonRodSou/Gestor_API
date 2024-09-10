import jwt from 'jsonwebtoken'
import User from "../models/User"
import * as yup from 'yup'

class SessionController {

  async store(req, res) {

    const { name, email, password } = req.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    })

    let user = await User.findOne({ name, email, password })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Email ou Senha Invalido!' })
    }

    // verifica se o usuario já existe
    if (!user) user = await User.create({ name, email, password })

    return res.json(user)
  }
}

export default new SessionController()