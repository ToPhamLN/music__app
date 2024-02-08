import { Schema, model, Types } from 'mongoose'
import { PlayList } from '~/type'

const playListSchema = new Schema<PlayList>(
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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Artist'
    }
  },
  { timestamps: true }
)

const PlayListModel = model<PlayList>('PlayList', playListSchema)

export default PlayListModel
