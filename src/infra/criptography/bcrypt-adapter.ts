import { Encrypter } from '../../data/protocols/encrypter'
import { hash } from 'bcrypt'

export class BcrypAdapter implements Encrypter {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    return await hash(value, this.salt)
  }
}
