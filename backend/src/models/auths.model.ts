import { Schema, model, Types } from 'mongoose'
import { Auth } from '~/type'

const authSchema = new Schema<Auth>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId()
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) =>
          value.length >= 8 && value.length <= 16,
        message: 'Password must be between 8 and 16 characters'
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const AuthModel = model<Auth>('Auth', authSchema)
export default AuthModel
