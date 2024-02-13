import mongoose, { Document, Schema } from 'mongoose';
import { PatientType } from '../config/types';

const PatientSchema: Schema = new Schema<PatientType & Document>({
    nik: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthPlace: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    blood: {
        type: String || null,
        default: null
    },
    address: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    married: {
        type: String,
        required: true
    },
    job: {
        type: String || null,
        default: null
    },
    citizenship: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bpjs: {
        type: String || null,
        default: null
    },
    parent: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const Patient = mongoose.model<PatientType & Document>('Patient', PatientSchema);

export default Patient;