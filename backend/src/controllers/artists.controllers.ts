import { Response, Request, NextFunction } from 'express'
import { ArtistModel } from '~/models'
import { v2 as cloudinary } from 'cloudinary'
import { convertSlug } from '~/utils/helper'
