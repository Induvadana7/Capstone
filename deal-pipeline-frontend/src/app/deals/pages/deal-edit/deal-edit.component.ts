import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DealService } from '../../services/deal.service';

@Component({
  selector: 'app-deal-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule],
  templateUrl: './deal-edit.component.html',
})
export class DealEditComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dealService: DealService,
    private router: Router
  ) {}

  get dealId(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      dealType: ['', Validators.required],
      sector: ['', Validators.required],
      summary: ['', Validators.required],
    });

    this.loadDeal();
  }

  loadDeal() {
    const id = this.dealId;
    if (!id) return;

    this.dealService.getDealById(id).subscribe({
      next: (deal) => {
        this.form.patchValue({
          dealType: deal.dealType,
          sector: deal.sector,
          summary: deal.summary,
        });
      },
      error: () => alert('Failed to load deal'),
    });
  }

  goBackToDetail() {
  const id = this.dealId;
  if (!id) return;
  this.router.navigateByUrl(`/deals/${id}`);
}


  submit() {
    const id = this.dealId;
    if (!id || this.form.invalid) return;

    this.loading = true;

    this.dealService.updateDeal(id, this.form.getRawValue()).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl(`/deals/${id}`);
      },
      error: () => {
        this.loading = false;
        alert('Failed to update deal');
      },
    });
  }
}

