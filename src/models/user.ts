import mongoose, { Schema } from 'mongoose';
import { UserAccount, UserType } from '../config/types';

const UserSchema: Schema = new Schema<UserAccount>({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    polyclinic: {
        type: String
    },
    phone: {
        type: String
    },
    photo: {
        type: String
    },
    email: {
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