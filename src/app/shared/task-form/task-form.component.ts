import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Input() defaultValues: any = null;
  @Output() submitTask: EventEmitter<any> = new EventEmitter();

  submit(formData: any){
    this.submitTask.emit(formData);
  }
}