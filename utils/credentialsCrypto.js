const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 32;
const KEY_LENGTH = 32;

function getEncryptionKey() {
  const key = process.env.CREDENTIALS_ENCRYPTION_KEY;
  if (key && key.length >= 32) {
    return Buffer.from(key.slice(0, 32), 'utf8');
  }
  const fallback = process.env.SESSION_SECRET || 'seecog-credentials-default-key-change-me';
  return crypto.scryptSync(fallback, 'credentials-salt', KEY_LENGTH);
}

function encrypt(plaintext) {
  if (!plaintext) return null;
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
}

function decrypt(encryptedData) {
  if (!encryptedData) return '';
  const key = getEncryptionKey();
  const parts = encryptedData.split(':');
  if (parts.length !== 3) return '';
  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encrypted = parts[2];
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}

module.exports = { encrypt, decrypt };
