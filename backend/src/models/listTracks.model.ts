import { Schema, model } from 'mongoose'
import { ListTrack } from '~/type'

const listTrackSchema = new Schema<ListTrack>(
  {
    category: { type: String },
    title: {
      type: String,
      required: true,
      default: 'playlist'
    },
    photo: {
      path: String,
      fileName: String
    },
    background: {
      path: String,
      fileName: String
    },
    description: {
      path: String
    },
    list: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
      default: []
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Artist'
    },
    slug: {
      type: String
    },
    listens: {
      type: Number,
      default: 0
    },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      defaut: 0
    }
  },
  { timestamps: true }
)

const ListTrackModel = model<ListTrack>(
  'ListTrack',
  listTrackSchema
)

export default ListTrackModel
