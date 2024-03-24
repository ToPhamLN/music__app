import { Schema, model } from 'mongoose'

const userSchema = new Schema<IUser>(
  {
    username: {
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
    wishTrack: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
      default: []
    },
    wishList: {
      type: [{ type: Schema.Types.ObjectId, ref: 'ListTrack' }],
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
