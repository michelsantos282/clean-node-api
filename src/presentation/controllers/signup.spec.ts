import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../errors'
import { EmailValidator } from '../protocols'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  // Stub é um dos tipos de duble de teste
  // Pegamos uma função e damos um retorno chumbado pra ela
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      /**
      * Sempre iniciar os mocks com valores positivos para não influenciar nos demais testes
      * E no lugar que quiser que ele falhe, moque o valor para ele falhar
      */
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Should Return 400 if no name is provided', () => {
    // System under test ( Classe sendo testada)
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
  test('Should Return 400 if an invalid email is provided', () => {
    // System under test ( Classe sendo testada)
    const { sut, emailValidatorStub } = makeSut()

    // Usando o jest para alterar o valor do retorno da função
    // mockando um valor
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    // Para comparar objetos devemos usar toEqual
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })
  test('Should Return 400 if password confirmation failed', () => {
    // System under test ( Classe sendo testada)
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    // Para comparar objetos devemos usar toEqual
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
  })
  test('Should call email validator with correct email', () => {
    // System under test ( Classe sendo testada)
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    sut.handle(httpRequest)
    // Nesse teste o metodo isValid deve ser chamado com o parametro correto
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })
  test('Should Return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
