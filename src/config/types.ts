export type UserType = {
    uid: string;
    name: string;
    division: string;
    polyclinic?: string;
    phone: string;
    photo?: string;
    email?: string;
}

export type UserAccount = UserType & {
    password: string;
}