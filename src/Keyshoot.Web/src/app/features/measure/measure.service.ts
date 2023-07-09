import { Injectable, inject } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AuthService } from '../../core/services/auth.service';
import { HUBS_URL } from '../../core/tokens/hub-url.token';
import {
  Measure,
  MeasureFinished,
  MeasureOptions,
} from './models';
import {
  BehaviorSubject,
  Observable,
  interval,
  map,
  skip,
  takeWhile,
  withLatestFrom,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FinishedMeasureModalComponent } from './finished-measure-modal/finished-measure-modal.component';
import { MEASURE_PLACEHOLDER } from './measure-placeholder.const';

@Injectable()
export class MeasureService {
  private authService = inject(AuthService);
  private measureUrl = `${inject(HUBS_URL)}/measure`;
  private dialog = inject(MatDialog);
  private hubConnection: HubConnection | null = null;
  private measureSource = new BehaviorSubject<Measure>(MEASURE_PLACEHOLDER);

  measure$: Observable<Measure> = this.measureSource.asObservable();
  timer$: Observable<number> = this.initTimer();

  start(): Promise<void> {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.measureUrl, {
        accessTokenFactory: () => this.authService.token,
      })
      .build();

    this.hubConnection.on('ReceiveMeasureStarted', (measure: Measure) => {
      this.measureSource.next(measure);
    });

    this.hubConnection.on('ReceiveMeasureUpdated', (measure: Measure) =>
      this.measureSource.next(measure)
    );

    this.hubConnection.on(
      'ReceiveMeasureFinished',
      (measure: MeasureFinished) => {
        this.dialog.open(FinishedMeasureModalComponent, {
          data: measure,
          autoFocus: false,
        });
      }
    );

    return this.hubConnection.start();
  }

  stop(): void {
    this.hubConnection?.stop();
  }

  createMeasure(options: MeasureOptions): Promise<unknown> {
    return this.hubConnection!.invoke('CreateMeasure', options).catch((err) =>
      console.error(err)
    );
  }

  updateMeasure(input: string): void {
    this.hubConnection!.invoke('UpdateMeasure', input);
  }

  private initTimer() {
    return interval(100).pipe(
      withLatestFrom(this.measure$.pipe(skip(1))),
      takeWhile(([_, measure]) => new Date() < new Date(measure!.endTime)),
      map(([_, measure]) => {
        const end = new Date(measure!.endTime).getTime();
        const now = new Date().getTime();
        const time = Math.round((end - now) / 1000);
        return time;
      })
    );
  }
}
