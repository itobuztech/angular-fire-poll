import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Poll, PollAnswer } from '../interface/poll.interface';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private itemsCollection: AngularFirestoreCollection<Poll>;
  private pollAnswerCollection: AngularFirestoreCollection<PollAnswer>;
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.itemsCollection = afs.collection<Poll>('polls');
    this.pollAnswerCollection = afs.collection<PollAnswer>('pollanswer');
  }

  getPolls() {
    return this.itemsCollection.valueChanges();
  }

  createPoll(poll: Poll) {
    poll['id'] = poll['id'] ?  poll['id'] : this.afs.createId();
    this.itemsCollection.doc(poll['id']).set(poll);
  }

  getById(id: string) {
    return this.afs.collection('polls', ref => ref.where('id', '==', id)).valueChanges();
  }

  createPollAnswer(answer: PollAnswer) {
    answer['answerId'] = answer['answerId'] ?  answer['answerId'] : this.afs.createId();
    this.pollAnswerCollection.doc(answer['answerId']).set(answer);
  }

  getAnswer(id: string) {
    return this.afs.collection('pollanswer', ref => ref.where('answerId', '==', id)).valueChanges();
  }

  getAllAnswerByPollId(id: string) {
    return this.afs.collection('pollanswer', ref => ref.where('pollid', '==', id)).valueChanges();
  }

  getuser() {
    return this.afAuth.user;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
