import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyToastyServiceService {

  constructor(private toastrService: ToastrService) { }
  toasterError(msg?: any, title?: any){
    this.toastrService.error(title ? title: 'Error', msg ? msg : 'Error!', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    })
  }
  toasterSuccess(title?: any, msg?: any){
    this.toastrService.success(title ? title: 'We Done', msg ? msg: 'Success!', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    });
  }
}
