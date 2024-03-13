import { Schema, model } from 'mongoose'
import { Auth } from '~/type'

const authSchema = new Schema<Auth>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String
    }
  },
  { timestamps: true }
)

const AuthModel = model<Auth>('Auth', authSchema)
export default AuthModel
