declare module "express" { 
  export interface Request {
    user: User
    headers: {
      authorization: string| string[]
    }
  }

  export interface User {
    id: string
  }
}