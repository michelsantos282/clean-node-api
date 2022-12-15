import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should Return 400 if no name is provided', () => {
    // System under test ( Classe sendo testada)
    const sut = new SignUpController()
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
    expect(httpResponse.body).toEqual(new Error('Missing Param: name'))
  })
})
