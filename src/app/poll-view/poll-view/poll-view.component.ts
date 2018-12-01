import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, filter } from 'rxjs/operators';
import { PollService  } from '../../services/poll.service';
import { Poll } from 'src/app/interface/poll.interface';

@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss']
})
export class PollViewComponent implements OnInit {
  poll: Poll;
  constructor(
    private activatedRoute: ActivatedRoute,
    private pollService: PollService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(
      filter(params => params['id']),
      switchMap(params => this.pollService.getById(params.id)))
    .subscribe((data: any) => {
      console.log(data);
        this.poll = data[0];
    });
  }

}
