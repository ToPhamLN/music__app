import { Schema, model } from 'mongoose'

const artistSchema = new Schema<IArtist>(
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
    background: {
      path: {
        type: String
      },
      fileName: {
        type: String
      }
    },
    auth: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
      required: true,
      unique: true
    },
    slug: {
      type: String
    }
  },
  { timestamps: true }
)

const ArtistModel = model<IArtist>('Artist', artistSchema)

export default ArtistModel
