import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PollService } from './services/poll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user;
  constructor(
    private router: Router,
    public pollService: PollService
  ) {
    this.pollService.getuser().subscribe(user => {
      if (!user) {
        this.router.navigate(['/welcome']);
      }
      this.user = user;
    });
  }
}
