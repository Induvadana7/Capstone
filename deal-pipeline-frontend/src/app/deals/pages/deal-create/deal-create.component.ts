import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DealService } from '../../services/deal.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';







@Component({
  selector: 'app-deal-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,MatCardModule,RouterModule],
  templateUrl: './deal-create.component.html',
})
export class DealCreateComponent {
  loading = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dealService: DealService,
    private router: Router
  ) {
   
    this.form = this.fb.group({
      clientName: ['', Validators.required],
      dealType: ['', Validators.required],
      sector: ['', Validators.required],
      summary: ['', Validators.required],
      currentStage: ['Prospect', Validators.required],
    });
  }

  


  submit() {
  if (this.form.invalid) return;

  this.loading = true;
  this.dealService.createDeal(this.form.getRawValue()).subscribe({
    next: () => {
      this.loading = false;
      this.router.navigateByUrl('/deals');
    },
    error: () => {
      this.loading = false;
      alert('Failed to create deal');
    },
  });
}

}


