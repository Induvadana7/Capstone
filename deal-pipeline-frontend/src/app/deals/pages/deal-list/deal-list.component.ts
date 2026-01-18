import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';
import { DealService } from '../../services/deal.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Deal } from '../../model/deal.model';

@Component({
  selector: 'app-deal-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  deals: Deal[] = [];
  dataSource = new MatTableDataSource<Deal>([]);
  displayedColumns: string[] = [];

  isAdmin = false;
  searchText = '';

  constructor(
    private dealService: DealService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.setColumns();
    this.loadDeals();
  }

  setColumns(): void {
    this.displayedColumns = [
      'clientName',
      'dealType',
      'sector',
      'summary',
      'createdBy',
      'createdAt',
      'notes',
      'currentStage',
      'actions'
    ];

    if (this.isAdmin) {
      this.displayedColumns.splice(this.displayedColumns.length - 1, 0, 'dealValue');
    }
  }

  loadDeals(): void {
    this.dealService.getDeals().subscribe({
      next: (res: Deal[]) => {
        this.deals = res || [];
        this.dataSource = new MatTableDataSource(this.deals);
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = (data: Deal, filter: string) => {
          const text = filter.trim().toLowerCase();
          return (
            (data.clientName || '').toLowerCase().includes(text) ||
            (data.dealType || '').toLowerCase().includes(text) ||
            (data.sector || '').toLowerCase().includes(text) ||
            (data.summary || '').toLowerCase().includes(text) ||
            (data.currentStage || '').toLowerCase().includes(text)
          );
        };
      },
      error: (error) => {
        console.error('Failed to load deals', error);
      }
    });
  }

  applySearch(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  onCreateDeal(): void {
    this.router.navigate(['/deals/create']);
  }

  onViewDeal(deal: Deal): void {
    const dealId = (deal as any).id || (deal as any)._id;
    this.router.navigate(['/deals', dealId]);
  }

  onDeleteDeal(deal: Deal): void {
    if (!this.isAdmin) return;

    const dealId = (deal as any).id || (deal as any)._id;
    if (!dealId) return;

    const ok = confirm('Are you sure you want to delete this deal?');
    if (!ok) return;

    this.dealService.deleteDeal(dealId).subscribe({
      next: () => {
        alert('Deal deleted');
        this.loadDeals();
      },
      error: (error) => {
        console.error('Delete failed', error);
        alert('Failed to delete deal');
      }
    });
  }
}
