import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GithubAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { addDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

export class IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  photo: string;
  constructor(
    id: number,
    name: string,
    email: string,
    phone: string,
    photo: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.photo = photo;
  }
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  authState: any = null;
  authA: AngularFireAuth;
  loading: boolean = false;
  loadingState: boolean = true;
  constructor(
    public firestore: Firestore,
    public auth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {
    this.authA = auth;
    this.auth.authState.subscribe((value) => {
      this.authState = value;
      this.loadingState = false;
    });
  }
  isLoaded() {
    return this.authState != null;
  }
  isAuthenticated(): boolean {
    if (!this.isLoaded()) return false;
    return this.authState.uid !== null;
  }
  userData(): IUser | null {
    if (!this.isAuthenticated) {
      return null;
    }
    return new IUser(
      this.authState.uid,
      this.authState.displayName,
      this.authState.email,
      this.authState.phoneNumber,
      this.authState.photoURL
    );
  }
  logout = async () => {
    this.auth.signOut().then(() => {
      this.snackBar.open('Succesufully logged out!', 'Close', {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
      });
    });
  };
  loginWithGoogle = async () => {
    let user;
    this.loading = true;
    try {
      user = await this.auth?.signInWithPopup(new GoogleAuthProvider());
      this.snackBar.open(
        'Succesufully logged in with your Google account: ' + user.user?.email,
        'Close',
        {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
        }
      );
    } catch (err) {
      alert(err);
    } finally {
      let userid = user?.user?.uid;
      if (userid !== undefined) {
        let document = doc(this.firestore, 'users', userid);
        await setDoc(document, {
          uid: userid,
          name: user?.user?.displayName,
          photo: user?.user?.photoURL,
          email: user?.user?.email,
        });
      }
      this.loading = false;
    }
  };
  loginWithGithub = async () => {
    let user;
    this.loading = true;
    try {
      user = await this.auth?.signInWithPopup(new GithubAuthProvider());
      this.snackBar.open(
        'Succesufully logged in with your GitHub account: ' + user.user?.email,
        'Close',
        {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
        }
      );
    } catch (err) {
      alert(err);
    } finally {
      let userid = user?.user?.uid;
      if (userid !== undefined) {
        let document = doc(this.firestore, 'users', userid);
        await setDoc(document, {
          uid: userid,
          name: user?.user?.displayName,
          photo: user?.user?.photoURL,
          email: user?.user?.email,
        });
      }
      this.loading = false;
    }
  };
}
