import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deal-admin-actions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deal-admin-actions.component.html',
})
export class DealAdminActionsComponent {
  @Input() dealValue?: number;
  @Output() updateValue = new EventEmitter<number>();
  @Output() deleteDeal = new EventEmitter<void>();

  valueInput?: number;

  ngOnInit() {
    this.valueInput = this.dealValue;
  }

  saveValue() {
    if (this.valueInput == null) return;
    this.updateValue.emit(Number(this.valueInput));
  }

  delete() {
    if (confirm('Are you sure you want to delete this deal?')) {
      this.deleteDeal.emit();
    }
  }
}

