export interface signUpResponse {
    headers: Headers
    status: number
    statusText: string
    url: string
    ok: boolean
    name: string
    message: string
    error: Error
  }
  
  export interface Headers {
    headers: Headers2
    normalizedNames: NormalizedNames
    lazyUpdate: any
  }
  
  export interface Headers2 {}
  
  export interface NormalizedNames {}
  
  export interface Error {
    statusMsg: string
    message: string
  }
  