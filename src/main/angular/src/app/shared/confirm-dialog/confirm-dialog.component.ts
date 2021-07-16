import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public body: string;
  public active: boolean;
  public onClose: Subject<boolean>;

  constructor(private _modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public showConfirm(body: string) :void{
    this.body = body;
    this.active = true;
  }

  confirm(){
    this.active = false;
    this.onClose.next(true);
    this._modalRef.hide();
  }

  cancel(){
    this.active = false;
    this.onClose.next(false);
    this._modalRef.hide()
  }
}
