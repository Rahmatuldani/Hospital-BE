import mongoose, { Schema } from 'mongoose';
import { UserAccount, UserType } from '../config/types';

const UserSchema: Schema = new Schema<UserAccount>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    polyclinic: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const User = mongoose.model<UserType | UserAccount>('User', UserSchema);

export default User;