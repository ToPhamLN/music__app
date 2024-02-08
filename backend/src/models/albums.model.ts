import { Schema, model, Types } from 'mongoose'
import { Album } from '~/type'

const albumSchema = new Schema<Album>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId()
    },
    title: {
      type: String,
      required: true
    },
    list: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Track' }]
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Artist'
    }
  },
  { timestamps: true }
)

const AlbumModel = model<Album>('Album', albumSchema)

export default AlbumModel
