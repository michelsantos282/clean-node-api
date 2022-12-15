import { SignUpController } from './signup'
import { MissingParamError } from '../errors/missing-param-error'

const makeSut = (): SignUpController => {
  return new SignUpController()
}

describe('SignUp Controller', () => {
  test('Should Return 400 if no name is provided', () => {
    // System under test ( Classe sendo testada)
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    // Para comparar objetos devemos usar toEqual
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Should Return 400 if no email is provided', () => {
    // System under test ( Classe sendo testada)
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    // Para comparar objetos devemos usar toEqual
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
  test('Should Return 400 if no password is provided', () => {
    // System under test ( Classe sendo testada)
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    // Para comparar objetos devemos usar toEqual
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
  test('Should Return 400 if no password confirmation is provided', () => {
    // System under test ( Classe sendo testada)
    const sut = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    // Para comparar objetos devemos usar toEqual
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })
})
