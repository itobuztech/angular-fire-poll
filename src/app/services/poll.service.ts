import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Poll } from '../interface/poll.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private itemsCollection: AngularFirestoreCollection<Poll>;
  constructor(
    private afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<any>('polls');
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
}
