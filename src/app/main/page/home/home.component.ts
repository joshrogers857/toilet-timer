import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TimerService } from '../../../core/services/timer.service.ts';

@Component({
  standalone: false,
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public elapsedTime$;

  get timerInProgress(): boolean {
    return this.timer.isRunning();
  }

  public constructor(
    private timer: TimerService,
  ) {
    this.elapsedTime$ = this.timer.elapsed$;
  }

  protected formGroup = new FormGroup({
    interval: new FormControl(30), // Default to 30 minutes
  });
  
  protected startTimer(): void {
    this.timer.start();
    this.formGroup.get('interval')?.disable();
  }

  protected pauseTimer(): void {
    this.timer.pause();
  }

  protected resetTimer(): void {
    this.timer.reset();
    this.formGroup.get('interval')?.enable();
  }
}
