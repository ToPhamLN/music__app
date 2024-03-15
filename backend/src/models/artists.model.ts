import { Schema, model } from 'mongoose'
import { Artist } from '~/type'

const artistSchema = new Schema<Artist>(
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
      ref: 'Auth'
    },
    slug: {
      type: String
    }
  },
  { timestamps: true }
)

const ArtistModel = model<Artist>('Artist', artistSchema)

export default ArtistModel
