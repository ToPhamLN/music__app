import mongoose, { ConnectOptions } from 'mongoose'

export const connect = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(
      process.env.MONGOOSE_URL as string,
      {} as ConnectOptions
    )
    console.log('Connect database successfully!!!')
  } catch (error) {
    console.log('Connect database failure!!!')
  }
}
