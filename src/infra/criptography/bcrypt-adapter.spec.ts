import { BcrypAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hashed_password'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcrypAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('valid_password')

    expect(hashSpy).toHaveBeenCalledWith('valid_password', 12)
  })
  test('Should return a hash on success', async () => {
    const salt = 12
    const sut = new BcrypAdapter(salt)

    const hash = await sut.encrypt('valid_password')

    expect(hash).toBe('hashed_password')
  })
})
