import { ERole, ECategory } from '~/constants/enum'

interface DImage {
  path: string
  fileName: string
}

interface DLink {
  name?: string
  path?: string
}

interface DAuthor {
  _id: string
  username: string
  avatar: DImage
}

interface DAuth {
  _id: string
  email: string
  password?: string
  role?: string
  idRole?: ERole | DArtist | DUser
}

interface DArtist extends DAuthor {
  auth: string | DAuth
  slug: string
  background: DImage
}
interface DUser extends DAuthor {}

interface DListTrack {
  _id?: string
  category?: ECategory
  title?: string
  description?: string
  photo?: DImage
  background?: string
  author?: DAuthor
  authorRole?: ERole
  slug?: string
  likes?: []
  list?: []
  listens?: number
}

interface DTrack {
  _id?: string
  title?: string
  photo?: DImage
  source?: DImage
  duration?: number
  album?: DListTrack
  artist?: DArtist[]
  author?: string
  authorRole?: ERole
  lyrics?: string
  slug?: string
  listens?: number
  likes?: []
  updatedAt?: string
}

interface DBios {
  photos: DImage[]
  birthday?: string
  content?: string
  links?: DLink[]
}
