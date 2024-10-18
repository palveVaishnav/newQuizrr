export interface googleUser {
    id: string
    name: string
    email: string
    picture: string
}


export interface userType {
    id: string,
    providerId?: string,
    email: string,
    name: string,
    picture: string,
    packs?: string[],
    attempts: string[],
}