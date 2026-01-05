import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThirdPartyToastyServiceService } from '../../services/third-partytoast.service';

@Component({
  selector: 'app-send-code',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.css'
})
export class SendCodeComponent implements OnInit {
  email = '';
  newPassword = '';
  code = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ThirdPartyToastyServiceService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  submit(form: NgForm) {
    if (form.invalid) return;
    this.authService.resetPasswordWithCode(form.value.email, form.value.newPassword, form.value.code).subscribe({
      next: (res) => {
        console.log('Password reset successfully', res);
        this.toastr.toasterSuccess('Password reset successfully!', 'Success');
        this.router.navigate(['/auth']);
        form.resetForm();
      },
      error: (err) => {
        console.error('Password reset failed', err);
        this.toastr.toasterError(err.error?.message || 'Password reset failed. Check console.');
      }
    });
  }
}
