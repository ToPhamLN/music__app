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
  _id: Types.ObjectId
  name?: string
  avatar?: Image
  wishList?: Types.ObjectId[]
  recentlyList?: Types.ObjectId[]
  auth?: Types.ObjectId
  following: Types.ObjectId[]
  slug?: string
}
interface Artist extends Document {
  _id: Types.ObjectId
  name?: string
  avatar?: Image
  backGround?: Image
  auth?: Types.ObjectId
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

interface Album extends Document {
  _id: Types.ObjectId
  title: string
  list: Types.ObjectId[]
  artist: Types.ObjectId
  listens: number
  slug?: string
}

interface PlayList extends Document {
  _id: Types.ObjectId
  title: string
  list: Types.ObjectId[]
  user: Types.ObjectId
}

interface JwtPayload {
  authId: Types.ObjectId
  isAdmin: boolean
}

declare module 'express' {
  interface Request {
    auth?: AuthModel | null | undefined
  }
}
