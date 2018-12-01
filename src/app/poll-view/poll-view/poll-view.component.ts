import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap, filter, combineAll, mergeMap, mergeAll, concatAll } from 'rxjs/operators';
import { PollService  } from '../../services/poll.service';
import { Poll, PollAnswer } from 'src/app/interface/poll.interface';
import { Observable, forkJoin } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss']
})
export class PollViewComponent implements OnInit {
  poll: Poll;
  userPollForm: FormGroup;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pollService: PollService
  ) { }

  ngOnInit() {
    this.userPollForm = this.formBuilder.group({
      pollid: [''],
      answer: [''],
      answerId: ['']
    });

    const obsArr = [
      this.pollService.getuser(),
      this.activatedRoute.params
    ];
    this.pollService.getuser()
    .pipe(switchMap(user => {
      this.user = user;
      return this.activatedRoute.params;
    })).subscribe(params => {
      this.userPollForm.get('pollid').patchValue(params.id);
      this.userPollForm.get('answerId').patchValue(`${params.id}-${this.user.uid}`);
      this.pollService.getById(params.id).subscribe((poll: Poll[]) => {
        this.poll = poll[0];
      });
      this.pollService.getAnswer(`${params.id}-${this.user.uid}`).subscribe((answer: PollAnswer[]) => {
        if (answer[0]) {
          this.userPollForm.get('answer').patchValue(answer[0].answer);
        }
      });
    });
  }

 submitPoll() {
  this.pollService.createPollAnswer(this.userPollForm.value);
 }

}
