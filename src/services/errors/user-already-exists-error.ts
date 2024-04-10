export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User with the same email already exist')
  }
}
