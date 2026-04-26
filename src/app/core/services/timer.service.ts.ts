import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, EMPTY } from 'rxjs';
import { switchMap, scan, startWith, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
    // Controls whether timer is running
    private running$ = new BehaviorSubject<boolean>(false);

    // Holds the current elapsed time
    private time$ = new BehaviorSubject<number>(0);

    // Public observable for components
    public elapsed$ = this.running$.pipe(
        switchMap(running => {
            if (!running) return EMPTY;

            return interval(1000).pipe(
                scan((acc) => acc + 1, this.time$.value)
            );
        }),
        startWith(0),
        shareReplay(1)
    );

    public constructor() {
        // keep internal state in sync
        this.elapsed$.subscribe(value => {
            this.time$.next(value);
        });
    }

    public start(): void {
        this.running$.next(true);
    }

    public pause(): void {
        this.running$.next(false);
    }

    public reset(): void {
        this.running$.next(false);
        this.time$.next(0);
    }

    public getCurrentTime(): number {
        return this.time$.value;
    }

    public isRunning(): boolean {
        return this.running$.value;
    }
}