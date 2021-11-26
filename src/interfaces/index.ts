export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  allowPasswordChange: boolean
}

export interface Player {
  id: number
  name: string
  number: number
  nationality: string
  age: number
  position: string
}
