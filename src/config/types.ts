export type UserType = {
    _id: string;
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

export const Division: string[] = [
    'administrator',
    'receptionist',
    'doctor',
    'pharmacist',
    'logistic',
    'cashier'
];

export const Polyclinic: string[] = [
    'THT',
    'Mata',
    'Gigi',
    'Jantung'
];