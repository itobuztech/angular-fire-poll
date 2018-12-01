import { Component, OnInit } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { Poll } from 'src/app/interface/poll.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  polls: Poll[] = [];
  constructor(
    private pollService: PollService
  ) { }

  ngOnInit() {
    this.pollService.getPolls().subscribe(polls => {
      this.polls = polls;
      console.log('polls', polls);
    });
  }

}
