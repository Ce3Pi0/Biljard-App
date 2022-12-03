export type methodType = "POST" | "PUT" | "GET" | "DELETE"


export interface fetchReturn{
    data: JSON|null,
    err: string|null,
    loading: boolean
}

export interface fetchInfo {
    method: methodType,
    headers: Headers,
    body: BodyInit | undefined,
    redirect: 'follow' | undefined,
    signal: AbortSignal | undefined 
}

export interface TableElementTemplate{
    type: string|null,
    id: number,
    name: string,
    price: number,
    user_id: number
    start_time: string | null,
    end_time: string | null
}

export interface UserLogin {
    username: string,
    password: string
}

export interface UserChange {
    username:string,
    old_password:string,
    new_password:string
}

export interface UserRegister{
    name: string,
    username: string,
    password: string 
}

