import { BcrypAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcrypAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('valid_password')

    expect(hashSpy).toHaveBeenCalledWith('valid_password', 12)
  })
})
