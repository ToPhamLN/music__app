import { Document, Types } from 'mongoose'

interface Image {
  path?: string
  fileName?: string
}

interface Auth extends Document {
  email: string
  password: string
  role?: string
}

interface User extends Document {
  name?: string
  avatar?: Image
  background?: Image
  auth?: Types.ObjectId
  slug?: string
  wishList?: Types.ObjectId[]
  recentlyTrack?: Types.ObjectId[]
}
interface Artist extends Document {
  username: string
  avatar: Image
  background?: Image
  auth: Types.ObjectId
  slug?: string
}

interface Track extends Document {
  _id: Types.ObjectId
  title?: string
  image?: Image
  duration: number
  album: Album
  artist: Types.ObjectId[]
  listens: number
  slug?: string
}

interface ListTrack extends Document {
  category: string
  title: string
  photo: Image
  background: Image
  artist: Types.ObjectId
  description: string
  list: Types.ObjectId[]
  slug: string
  listens: number
  likes: []
}

interface JwtPayload {
  authId: string
  role?: boolean
}

declare module 'express' {
  interface Request {
    auth?: AuthModel | null | undefined
  }
}
