import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private modalService: NgbModal, private translateService: TranslateService) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = this.translateService.instant('common-components.button.validate'),
    btnCancelText: string =  this.translateService.instant('common-components.button.close')): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: 'md' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }
}
