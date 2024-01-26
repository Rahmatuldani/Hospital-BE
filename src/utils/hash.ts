import { createHmac } from 'crypto';
import app from '../config/app';

const Hash = (() => {
    function encrypt(text: string): string {
        const hash: string = createHmac(app.hash_algorithm, app.secret_key).update(text).digest('base64');
        return hash;
    }

    function decrypt(text: string, compare: string): boolean {
        return encrypt(text) === compare;
    }

    return {
        encrypt,
        decrypt
    };
})();

export default Hash;