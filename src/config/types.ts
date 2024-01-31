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

export interface PatientType {
    nik: string;
    name: string;
    birthPlace: string;
    birthDate: string;
    sex: string;
    blood: string | null;
    address: string;
    religion: string;
    married: string;
    job: string | null;
    citizenship: string;
    phone: string;
    bpjs: string | null;
    parent: string;
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