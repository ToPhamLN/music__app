import { ERole, ECategory } from '~/constants/enum'

interface DImage {
  path?: string
  fileName?: string
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
}
interface DUser extends DAuthor {}

interface DListTrack {
  _id?: string
  category?: ECategory
  title?: string
  description?: string
  photo?: DImage
  background?: string
  author?: string | DAuthor
  authorRole?: ERole
  slug?: string
  likes?: []
  list?: []
  listen?: number
}
