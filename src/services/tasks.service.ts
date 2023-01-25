import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { collection, DocumentData } from '@firebase/firestore';
import { UUID } from 'angular2-uuid';

export const settings: MatSnackBarConfig = {
  duration: 4000,
  verticalPosition: 'bottom',
  horizontalPosition: 'left',
};

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks: {
    userid: any;
    username: any;
    photo: any;
    email: any;
    title: any;
    desc: any;
    taskuuid: any;
  }[] = [];
  loadingTask = true;
  editingTask : string | undefined;
  lastValue: DocumentData[] | undefined;
  constructor(public firestore: Firestore, public auth: AngularFireAuth) {
    this.get_col_data();
  }
  get_col_data = () => {
    const col = collection(this.firestore, 'tasks');
    const docsData = collectionData(col);
    docsData.subscribe((value) => {
      if (
        this.lastValue === undefined ||
        this.lastValue.length !== value.length
      ) {
        this.lastValue = value;
        this.make_list_data(value);
      }
    });
  };
  make_list_data = async (docs: DocumentData[]) => {
    const users: {
      userid: any;
      username: any;
      photo: any;
      email: any;
      title: any;
      desc: any;
      taskuuid: any;
    }[] = [];
    if (docs == undefined) return;
    this.loadingTask = true;
    await Promise.all(
      docs.map(async (d) => {
        let data = d;
        try {
          let userDoc = await getDoc(
            doc(this.firestore, 'users', data['user'])
          );
          let userData = userDoc.data();
          if (userData === undefined) return;
          let map = {
            userid: userData['uid'],
            username: userData['name'],
            photo: userData['photo'],
            email: userData['email'],
            title: data['title'],
            desc: data['desc'],
            taskuuid: data['taskuuid'],
          };
          users.push(map);
          return;
        } catch (err) {
          return;
        }
      })
    );
    this.tasks = users;
    this.loadingTask = false;
    return users;
  };
  deleteTask = async (taskuuid: string) => {
    if (!taskuuid) return { error: true, err_msg: 'Task uuid is invalid!' };
    let doca = doc(this.firestore, 'tasks', taskuuid);
    await deleteDoc(doca);
    return { error: false };
  };
  addTask = async (userid: number, title: string, desc: string) => {
    if (!title || title.length <= 0 || title.trim().length <= 0) {
      return { error: true, err_msg: 'Task title is invalid!' };
    }
    let uuid = UUID.UUID();
    let doca = doc(this.firestore, 'tasks', uuid);
    await setDoc(doca, {
      user: userid,
      title: title,
      desc: desc,
      taskuuid: uuid,
    });
    return { error: false, taskuuid: uuid };
  };
}
