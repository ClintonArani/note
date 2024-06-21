export interface user{
    id: string,
    FirstName: string,
    LastName: string,
    phone_number:string,
    email: string,
    password: string,
    profileImage?:string,
    bio?:string,
    location?:string,
    d_b_o?:string,
    role?:string,
    createdAt?:string
}

export interface login_details{
    email:string,
    password:string
}

export interface token_details{
    id:string,
    FirstName:string,
    LastName:string,
    email:string,
    role:string
}