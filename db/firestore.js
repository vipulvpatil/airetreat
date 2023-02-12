import { initializeApp, applicationDefault, cert } from "firebase-admin/app"
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore"

const firestoreDb = () => {
  if (!global.firestoreDb) {
    console.log("Creating new firestoreDb")
    
    global.firestoreDb = newFirestoreDb()
  }
  return global.firestoreDb
}

const newFirestoreDb = () => {
  const serviceAccountString = decodeFromBase64(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64)
  const serviceAccount = JSON.parse(serviceAccountString)
  
  initializeApp({
    credential: cert(serviceAccount)
  });
  
  return getFirestore()
}

const decodeFromBase64 = (str) => {
  const decoded = Buffer.from(str, "base64").toString("ascii")
  return Buffer.from(decoded)
}

export default firestoreDb
