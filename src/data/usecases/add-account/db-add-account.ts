import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAcountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAcountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAcountRepository = addAcountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)

    return await this.addAcountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
  }
}
