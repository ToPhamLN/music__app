import { Schema, model, Types } from 'mongoose'
import { Track } from '~/type'

const trackSchema = new Schema<Track>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId()
    },
    title: {
      type: String,
      required: true
    },
    image: {
      path: {
        type: String
      },
      fileName: {
        type: String
      }
    },
    duration: {
      type: Number
    },
    album: { type: Schema.Types.ObjectId, ref: 'Album' },
    artist: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Artist' }]
    },
    slug: {
      type: String
    }
  },
  { timestamps: true }
)

const TrackModel = model<Track>('Track', trackSchema)
export default TrackModel
