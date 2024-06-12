import crypto from 'crypto-js';


export function encryptText(text) {
   const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
   const iv = Buffer.from(process.env.IV_KEY, "hex");

    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    let encryptedData = encrypted.toString("hex");
    return encryptedData;
  }
  
  export function decryptText(text) {
    const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
    const iv = Buffer.from(process.env.IV_KEY, "hex");
    if (text === null || typeof text === "undefined") return text;
    let encryptedText = Buffer.from(text, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
  