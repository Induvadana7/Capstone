import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DealNote } from '../../model/deal.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-deal-notes',
  standalone: true,
  imports: [CommonModule, FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './deal-notes.component.html',
})
export class DealNotesComponent {
  @Input() notes: DealNote[] = [];
  @Output() add = new EventEmitter<string>();

  noteText = '';

  submitNote() {
    if (!this.noteText.trim()) return;
    this.add.emit(this.noteText.trim());
    this.noteText = '';
  }
}

