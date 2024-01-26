import mongoose from 'mongoose';
import app from './app';

const db = mongoose.connect(`${app.db_host}/${app.db_name}`);

export default db;