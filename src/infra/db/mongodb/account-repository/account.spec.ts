import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'
import getenv from 'getenv'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(getenv('MONGO_URL'))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }
  test('Should return an account on success', async () => {
    const sut = makeSut()

    const accountData = ({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })

    const account = await sut.add(accountData)

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })
})
