import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DealsRoutingModule } from './deals-routing.module';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



// ✅ Correct component imports (based on your folders)
import { DealListComponent } from './pages/deal-list/deal-list.component';
import { DealDetailComponent } from './pages/deal-detail/deal-detail.component';
import { DealCreateComponent } from './pages/deal-create/deal-create.component';

@NgModule({
  declarations: [
    DealListComponent,
    DealDetailComponent,
    DealCreateComponent
  ],
  imports: [
    CommonModule,
    DealsRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class DealsModule {}
