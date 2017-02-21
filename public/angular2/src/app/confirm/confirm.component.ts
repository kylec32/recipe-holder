import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({  selector: 'confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent extends DialogComponent {

  constructor(dialogService: DialogService) { 
    super(dialogService);
  }

  confirm() {
    this.result = true;
    this.close();
  }

}
