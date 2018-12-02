import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PollService } from '../../services/poll.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {
  subs: Array<Subscription> = [];
  constructor(
    private router: Router,
    public pollService: PollService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.pollService.getuser().subscribe(user => {
        if (user) {
          this.router.navigate(['/list']);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
