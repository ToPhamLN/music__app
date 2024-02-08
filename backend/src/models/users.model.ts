import { Schema, model, Types } from 'mongoose'
import { User } from '~/type'

const userSchema = new Schema<User>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId()
    },
    name: {
      type: String
    },
    avatar: {
      path: {
        type: String
      },
      fileName: {
        type: String
      }
    },
    auth: {
      type: Schema.Types.ObjectId,
      ref: 'Auth'
    },
    wishList: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
      default: []
    },
    recentlyPlayed: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
      default: []
    },
    slug: {
      type: String
    }
  },
  { timestamps: true }
)

const UserModel = model('User', userSchema)

export default UserModel
