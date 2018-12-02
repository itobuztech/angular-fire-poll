import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { PollService } from './poll.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  isLogin: Subject<boolean> = new Subject();
  constructor(private pollService: PollService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.pollService.getuser().pipe(take(1))
    .subscribe(user => {
      if (user) {
        return this.isLogin.next(true);
      } else {
        return this.isLogin.next(false);
      }
    });

    return this.isLogin;
  }
}
