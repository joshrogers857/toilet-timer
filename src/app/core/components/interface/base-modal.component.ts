import { AfterViewInit, Component, ComponentRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from "@angular/core";
import { ModalOptions } from "../../services/modal.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalContent } from "../../interfaces/can-show-in-modal.interface";

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  standalone: false,
})
export class BaseModalComponent<T extends ModalContent> implements AfterViewInit {
    @Input() options!: ModalOptions<T>;
    @Output() submit = new EventEmitter();
    
    @ViewChild('container', { read: ViewContainerRef })
    public container!: ViewContainerRef;

    public componentRef!: ComponentRef<T>;

    public ngAfterViewInit(): void {
        this.componentRef = this.container.createComponent(this.options.contentComponent);
        
        // Loop over the keys of the inputs object
        Object.keys(this.options.inputs).forEach(key => {
            // @ts-ignore: dynamic property
            this.componentRef.instance[key] = this.options.inputs[key];
        });

        // Trigger change detection so bindings update
        this.componentRef.changeDetectorRef.detectChanges();
    }
    
    constructor(
        public activeModal: NgbActiveModal,
    ) {}

    public onSubmit(): void {
        this.componentRef.instance.onSubmit();
        this.activeModal.close();
        this.submit.emit();
    }
}