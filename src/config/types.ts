export type UserType = {
    _id: string;
    name: string;
    email: string;
    role: string;
    polyclinic?: string | null;
    phone: string;
    photo?: string;
}

export type UserAccount = UserType & {
    password: string;
}

export interface PatientType {
    nik: string;
    name: string;
    birthPlace: string;
    birthDate: string;
    gender: string;
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

export const Role: string[] = [
    'Administrator',
    'Receptionist',
    'Doctor',
    'Pharmacist',
    'Logistic',
    'Cashier'
];

export const Polyclinic: string[] = [
    'THT',
    'Mata',
    'Gigi',
    'Jantung'
];