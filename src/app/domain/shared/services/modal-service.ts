import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {
    constructor (private ngbModal: NgbModal) {}

    open (content: any, config?: any) {
        const modal = this.ngbModal.open(content, config);
        const instance = (modal as any)._windowCmptRef.instance;
        instance.windowClass = 'custom-show';

        const fx = (modal as any)._removeModalElements.bind(modal);
        (modal as any)._removeModalElements = () => {
            instance.windowClass = '';
            setTimeout(fx, 250);
        };

        return modal;
    }
}
