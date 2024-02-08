import { Schema, model, Types } from 'mongoose'
import { Artist } from '~/type'

const artistSchema = new Schema<Artist>(
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
    backGround: {
      path: {
        type: String
      },
      fileName: {
        type: String
      }
    },
    slug: {
      type: String
    }
  },
  { timestamps: true }
)

const ArtistModel = model<Artist>('Artist', artistSchema)

export default ArtistModel
