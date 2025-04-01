import { Injectable } from "@angular/core";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, OAuthProvider, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth = getAuth();
  private db = getFirestore();

  constructor() {}

  // ✅ REGISTRO con email y contraseña
  async register(email: string, password: string, name: string, lastName: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;

    // Guardar datos en Firestore
    await setDoc(doc(this.db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name,
      lastName,
    });

    return user;
  }

  // ✅ LOGIN con email y contraseña
  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  // ✅ LOGIN con Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(this.auth, provider);
    await this.checkUserExists(userCredential.user);
    return userCredential.user;
  }

  // ✅ LOGIN con Microsoft
  async loginWithMicrosoft() {
    const provider = new OAuthProvider("microsoft.com");
    const userCredential = await signInWithPopup(this.auth, provider);
    await this.checkUserExists(userCredential.user);
    return userCredential.user;
  }

  // Cerrar sesión
  async logout() {
    return signOut(this.auth);
  }

  // Verificar si el usuario está en Firestore, si no, lo registra
  private async checkUserExists(user: any) {
    const userRef = doc(this.db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "Sin nombre",
        lastName: "No disponible",
      });
    }
  }
  async resetPassword(email: string) {
    if (!email) throw new Error('auth/invalid-email');
  
    try {
      await sendPasswordResetEmail(this.auth, email);
      return 'Correo de recuperación enviado.';
    } catch (error: any) {
      console.error('Error al enviar correo de recuperación:', error);
      throw error;
    }
  }

  async getUserData() {
    const user = this.auth.currentUser;
    if (!user) return null;
  
    const userRef = doc(this.db, "users", user.uid);
    const userDoc = await getDoc(userRef);
  
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.warn('⚠️ No se encontraron datos para este usuario en Firestore.');
      return null;
    }
  }
  
}
