import { Injectable, Type } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseModalComponent } from "../components/interface/base-modal.component";
import { ModalContent } from "../interfaces/can-show-in-modal.interface";
import { Observable, take } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public constructor(
    private modalService: NgbModal,
  ) {}

  public openModal<T extends ModalContent>(
    options: ModalOptions<T>
  ): Observable<void> {
    const modalRef = this.modalService.open(
      BaseModalComponent,
      { ariaLabelledBy: options.title + ' Modal',

      },
    );

    modalRef.componentInstance.options = options;

    // Wrap the submit event in an observable that completes after the first emission
    return new Observable<void>(subscriber => {
      const sub = modalRef.componentInstance.submit
        .pipe(take(1))
        .subscribe({
          next: () => {
            subscriber.next();
            subscriber.complete(); // Complete after first emission
          },
          error: (err: any) => subscriber.error(err),
        });

      // Clean up if the subscriber unsubscribes before submit
      return () => sub.unsubscribe();
    });
  }
}

export interface ModalOptions<T extends ModalContent> {
    title: string,
    contentComponent: Type<T>,
    submitBtnText?: string,
    inputs?: any, // TODO: type
}