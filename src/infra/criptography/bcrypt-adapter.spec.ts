import { BcrypAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashed_password'))
  }
}))

const salt = 12
const makeSut = (): BcrypAdapter => {
  return new BcrypAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('valid_password')

    expect(hashSpy).toHaveBeenCalledWith('valid_password', 12)
  })
  test('Should return a hash on success', async () => {
    const sut = makeSut()

    const hash = await sut.encrypt('valid_password')

    expect(hash).toBe('hashed_password')
  })
})
