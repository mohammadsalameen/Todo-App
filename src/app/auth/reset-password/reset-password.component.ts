import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ThirdPartyToastyServiceService) {}

  submit(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    this.authService.sendResetCode(form.value.email).subscribe({
      next: (res) => {
        console.log('Reset code sent successfully', res);
        this.toastr.toasterSuccess('Reset code sent to your email!', 'Success');
        this.router.navigate(['/auth/send-code'], { queryParams: { email: form.value.email } });
        form.resetForm();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to send reset code', err);
        this.toastr.toasterError(err.error?.message || 'Failed to send reset code. Check console.');
        this.isLoading = false;
      }
    });
  }
}
