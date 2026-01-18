import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { DealService } from '../../services/deal.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Deal } from '../../model/deal.model';

@Component({
  selector: 'app-deal-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './deal-detail.component.html',
  styleUrls: ['./deal-detail.component.scss']
})
export class DealDetailComponent implements OnInit {

  deal!: Deal;
  dealId!: string;

  isAdmin = false;

  // ✅ Edit basic fields
  editDealType = '';
  editSector = '';
  editSummary = '';

  // Notes
  noteInput = '';

  // Admin only sensitive
  dealValueInput: number | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dealService: DealService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    this.dealId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.dealId) return;

    this.loadDeal();
  }

  loadDeal(): void {
    this.dealService.getDealById(this.dealId).subscribe({
      next: (res) => {
        this.deal = res;

        // Fill edit inputs
        this.editDealType = this.deal.dealType || '';
        this.editSector = this.deal.sector || '';
        this.editSummary = this.deal.summary || '';

        // Admin sensitive preload
        if (this.isAdmin) {
          this.dealValueInput = (this.deal as any).dealValue ?? null;
        }
      },
      error: (error) => {
        console.error('Error loading deal:', error);
      }
    });
  }

  // ✅ USER/ADMIN update basic fields (PUT)
  onSaveBasicDetails(): void {
    const payload: Partial<Deal> = {
      dealType: this.editDealType,
      sector: this.editSector,
      summary: this.editSummary
    };

    this.dealService.updateDeal(this.dealId, payload).subscribe({
      next: () => {
        alert('Deal updated');
        this.loadDeal();
      },
      error: (error) => {
        console.error('Error updating deal:', error);
        alert('Failed to update deal');
      }
    });
  }

  // ✅ Stage update (PATCH)
  onStageChange(newStage: string): void {
    this.dealService.updateStage(this.dealId, newStage).subscribe({
      next: () => this.loadDeal(),
      error: (error) => {
        console.error('Error updating stage:', error);
        alert('Failed to update stage');
      }
    });
  }

  // ✅ Add note
  onAddNote(): void {
    if (!this.noteInput.trim()) {
      alert('Note cannot be empty');
      return;
    }

    this.dealService.addNote(this.dealId, this.noteInput).subscribe({
      next: () => {
        this.noteInput = '';
        this.loadDeal();
      },
      error: (error) => {
        console.error('Error adding note:', error);
        alert('Failed to add note');
      }
    });
  }

  // ✅ ADMIN only: update deal value
  onUpdateDealValue(): void {
    if (!this.isAdmin) return;

    if (this.dealValueInput === null || this.dealValueInput === undefined) {
      alert('Please enter deal value');
      return;
    }

    this.dealService.updateDealValue(this.dealId, this.dealValueInput).subscribe({
      next: () => {
        alert('Deal value updated');
        this.loadDeal();
      },
      error: (error) => {
        console.error('Error updating deal value:', error);
        alert('Failed to update deal value');
      }
    });
  }

  // ✅ ADMIN only: delete deal
  onDeleteDeal(): void {
    if (!this.isAdmin) return;

    const ok = confirm('Are you sure you want to delete this deal?');
    if (!ok) return;

    this.dealService.deleteDeal(this.dealId).subscribe({
      next: () => {
        alert('Deal deleted');
        this.router.navigate(['/deals']);
      },
      error: (error) => {
        console.error('Error deleting deal:', error);
        alert('Failed to delete deal');
      }
    });
  }
}
