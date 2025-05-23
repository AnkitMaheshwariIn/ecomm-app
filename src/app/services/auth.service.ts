import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { User } from '../models/user.model';

// Direct Firebase SDK imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, Auth, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, Firestore, onSnapshot } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();
  
  private auth: Auth;
  private firestore: Firestore;
  
  constructor(private router: Router) {
    // Initialize Firebase directly
    const app = initializeApp(environment.firebase);
    this.auth = getAuth(app);
    this.firestore = getFirestore(app);
    
    // Create user$ observable that respects security rules
    onAuthStateChanged(this.auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log('User is authenticated:', firebaseUser.uid);
        // Only attempt to get the user document if authenticated
        try {
          const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            this.userSubject.next(userDocSnap.data() as User);
          } else {
            // If user document doesn't exist yet, return basic user info
            const basicUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || '',
              isAdmin: false
            } as User;
            this.userSubject.next(basicUserData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Still provide basic user info even if Firestore fetch fails
          const basicUserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            isAdmin: false
          } as User;
          this.userSubject.next(basicUserData);
        }
      } else {
        console.log('No authenticated user');
        this.userSubject.next(null);
      }
    });
  }

  async googleSignIn(): Promise<boolean> {
    try {
      console.log('Starting Google sign-in process...');
      const provider = new GoogleAuthProvider();
      
      // Keep it simple with minimal configuration
      console.log('Calling signInWithPopup...');
      const result = await signInWithPopup(this.auth, provider);
      
      if (!result || !result.user) {
        console.warn('No user returned from authentication');
        return false;
      }
      
      console.log('User authenticated:', result.user.uid);
      
      try {
        // Only after authentication, try to create/update user document
        // This respects the security rule: allow create: if isAuthenticated() && request.auth.uid == userId
        const userData = {
          uid: result.user.uid,
          email: result.user.email || '',
          displayName: result.user.displayName || '',
          photoURL: result.user.photoURL || '',
          lastLogin: new Date().toISOString()
          // Note: We don't set isAdmin here as per your security rules
          // Only existing admins can set other users as admins
        };
        
        console.log('Updating user data in Firestore:', userData);
        
        // Use the Firestore service properly
        const userDocRef = doc(this.firestore, `users/${result.user.uid}`);
        await setDoc(userDocRef, userData, { merge: true });
        console.log('User data updated successfully in Firestore');
      } catch (error) {
        // If Firestore operation fails, log it but continue with authentication
        console.error('Error updating user data, but continuing:', error);
        
        // Log more details about the error
        const firestoreError = error as any;
        if (firestoreError && firestoreError.code) {
          console.error('Error code:', firestoreError.code);
        }
        if (firestoreError && firestoreError.message) {
          console.error('Error message:', firestoreError.message);
        }
      }
      
      // Navigate to home page
      console.log('Navigating to home page...');
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
      return true;
    } catch (error: any) {
      console.error('Error during Google sign in:', error);
      if (error.code) console.error('Error code:', error.code);
      if (error.message) console.error('Error message:', error.message);
      return false;
    }
  }

  async signOut() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  // Check if user is admin based on the User model
  isAdmin(user: User | null): boolean {
    return user?.isAdmin || false;
  }

  // Set a user as admin
  async setUserAsAdmin(userId: string, isAdmin: boolean = true): Promise<void> {
    try {
      console.log(`Setting user ${userId} admin status to ${isAdmin}`);
      const userDocRef = doc(this.firestore, `users/${userId}`);
      await updateDoc(userDocRef, { isAdmin });
      console.log(`User ${userId} admin status set to ${isAdmin}`);
    } catch (error) {
      console.error('Error updating admin status:', error);
      throw error;
    }
  }

  // Get current user ID
  async getCurrentUserId(): Promise<string | null> {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }
}
