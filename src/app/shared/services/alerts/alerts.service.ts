import { Injectable } from '@angular/core';

// External Libraries
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  timeDefaultAlert:number = 5000;

  constructor() { }

  showAlert(title:string, isSuccess:boolean, timer?:number) {

    let iconAlert:any = 'success';
    isSuccess === true ? iconAlert = 'success' : iconAlert = 'error';
    !timer ? timer = this.timeDefaultAlert : timer;
  
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: iconAlert,
      title
    })
  }
  
  showAlertWithConfirmation(message:string, btnText:string) {
  
    const Toast = Swal.mixin({
      html:
      `
        <h2>
          Do you want to delete ${btnText === 'entry' ? 'Earning' : 'Expense'}: ${message}?
        </h2>
        
        <p style="font-size: 1.25rem; padding: 0.25rem 0;">
          You will not be able to revert this!
        </p>
      `,
      showCancelButton: true,
      allowOutsideClick: true,
      allowEscapeKey: true,
      confirmButtonText: `Yes, delete ${btnText === 'entry' ? 'Earning' : 'Expense'}`,
      confirmButtonColor: btnText === 'entry' ? '#25b1c3' : '#d22824',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    });
  
    let respAlert = Toast.fire().then(res => res['value'] === true ? true : false);
    return respAlert;
  }

  showAlertError(title:string, err:any) {
    Swal.fire({
      title,
      text: err.message,
      icon: 'error',
    });
  }

}