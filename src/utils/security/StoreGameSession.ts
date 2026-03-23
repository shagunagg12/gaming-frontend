// Constants for IndexedDB
const DB_NAME = "gameSessionsDB";
const STORE_NAME = "sessions";
const DB_VERSION = 1;

// Type definitions
interface EncryptedData {
  iv: number[];
  ciphertext: number[];
}

interface StoredSession {
  sessionId: string;
  encryptedData: EncryptedData;
}

/**
 * Open or create the IndexedDB database.
 * @returns {Promise<IDBDatabase>}
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "sessionId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Generate an AES-GCM key from a password and a salt using PBKDF2.
 * @param password - The passphrase for deriving the key.
 * @param saltStr - A unique salt string.
 * @returns {Promise<CryptoKey>}
 */
async function generateKey(password: string, saltStr: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const salt = encoder.encode(saltStr);
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypt data using AES-GCM.
 * @param data - The data to encrypt (will be JSON-stringified).
 * @param key - The AES-GCM key.
 * @returns {Promise<EncryptedData>} - An object containing the IV and ciphertext.
 */
async function encryptData(data: any, key: CryptoKey): Promise<EncryptedData> {
  const encoder = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
  const encodedData = encoder.encode(JSON.stringify(data));
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encodedData
  );

  return {
    iv: Array.from(iv),
    ciphertext: Array.from(new Uint8Array(encryptedBuffer)),
  };
}

/**
 * Decrypt data using AES-GCM.
 * @param encryptedData - Object with IV and ciphertext arrays.
 * @param key - The AES-GCM key.
 * @returns {Promise<any>} - The decrypted data.
 */
async function decryptData(encryptedData: EncryptedData, key: CryptoKey): Promise<any> {
  const { iv, ciphertext } = encryptedData;
  const ivArray = new Uint8Array(iv);
  const ciphertextArray = new Uint8Array(ciphertext);
  
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivArray },
    key,
    ciphertextArray
  );

  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(decryptedBuffer));
}


/**
 * Save a game session securely in IndexedDB.
 * @param sessionId - Unique identifier for the game session.
 * @param sessionData - The game session data to save.
 * @param password - Passphrase for encrypting the data.
 * @returns {Promise<void>}
 */
export async function saveGameSession(sessionId: string, sessionData: any, password: string): Promise<void> {
  console.log("Saving game session...", sessionId, sessionData);
  
  const db = await openDatabase();
  const saltStr = "unique-app-salt";
  const key = await generateKey(password, saltStr);
  const encrypted = await encryptData(sessionData, key);

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const item: StoredSession = { sessionId, encryptedData: encrypted };
    const request = store.put(item);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieve and decrypt a game session from IndexedDB.
 * @param sessionId - The game session identifier.
 * @param password - Passphrase used to encrypt the data.
 * @returns {Promise<any | null>} - The decrypted session data, or null if not found.
 */
export async function getGameSession(sessionId: string, password: string): Promise<any | null> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(sessionId);

    request.onsuccess = async () => {
      if (!request.result) return resolve(null);
      try {
        const saltStr = "unique-app-salt";
        const key = await generateKey(password, saltStr);
        const decrypted = await decryptData(request.result.encryptedData, key);
        resolve(decrypted);
      } catch (err) {
        reject(err);
      }
    };
    
    request.onerror = () => reject(request.error);
  });
}

/**
 * Delete a game session from IndexedDB.
 * @param sessionId - The identifier of the session to delete.
 * @returns {Promise<void>}
 */
export async function deleteGameSession(sessionId: string): Promise<void> {
  const db = await openDatabase();
  
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(sessionId);
      console.log("Deleting game session...", sessionId);
      
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteAllGameSessions(): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function EncryptedGameId(data: any, password: string): Promise<EncryptedData> {
  const saltStr = "unique-app-salt"; 
  const key = await generateKey(password, saltStr);
  return await encryptData(data, key);
}

export async function DecryptedGameId(encryptedData: EncryptedData, password: string): Promise<any> {
  const saltStr = "unique-app-salt";
  const key = await generateKey(password, saltStr);
  return await decryptData(encryptedData, key)
}
