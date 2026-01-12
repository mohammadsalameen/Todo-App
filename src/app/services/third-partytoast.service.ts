import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
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
  toasterWarning(msg?: any, title?: any){
    this.toastrService.warning(title ? title: 'warning', msg ? msg : 'warning!', {
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
  confirmDelete(title: string = 'Are you sure?', text: string = 'You won\'t be able to revert this!'): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      return result.isConfirmed;
    });
  }

}
