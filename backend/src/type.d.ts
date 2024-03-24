import { Document, Types } from 'mongoose'
import { ERole } from '~/types'

declare global {
  interface IImage {
    path?: string
    fileName?: string
  }

  interface IAuth extends Document {
    email: string
    password: string
    role?: ERole
    idRole?: Types.ObjectId
  }

  interface IUser extends Document {
    username?: string
    avatar?: IImage
    background?: IImage
    auth?: Types.ObjectId
    slug?: string
    wishTrack?: Types.ObjectId[]
    wishList?: Types.ObjectId[]
    recentlyTrack?: Types.ObjectId[]
  }
  interface IArtist extends Document {
    username: string
    avatar: IImage
    background?: IImage
    auth: Types.ObjectId
    slug?: string
  }

  interface ITrack extends Document {
    title?: string
    photo?: IImage
    source: IImage
    duration: number
    album: Types.ObjectId
    artist: Types.ObjectId[]
    author: Types.ObjectId
    authorRole: ERole
    lyrics: string
    slug?: string
    listens: number
    likes: []
  }

  interface IListTrack extends Document {
    category: string
    title: string
    photo: IImage
    background: string
    author: Types.ObjectId
    authorRole: ERole
    description: string
    list: Types.ObjectId[]
    slug: string
    listens: number
    likes: []
  }

  interface IJwtPayload {
    authId: string
    role?: ERole
  }
}

declare module 'express' {
  interface Request {
    auth?: AuthModel | null | undefined
  }
}
