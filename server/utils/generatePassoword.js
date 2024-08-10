import crypto from 'crypto'

export function generatePassword(length){
    return crypto.randomBytes(length).toString('hex');
}
