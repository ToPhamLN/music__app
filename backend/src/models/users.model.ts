import { Schema, model, Types } from 'mongoose'
import { User } from '~/type'

const userSchema = new Schema<User>(
  {
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
    slug: {
      type: String
    },
    wishList: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
      default: []
    },
    recentlyTrack: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
      default: []
    }
  },
  { timestamps: true }
)

const UserModel = model('User', userSchema)

export default UserModel
