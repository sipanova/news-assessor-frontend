import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,  // Standalone component,
  imports: [RouterOutlet, CommonModule, FormsModule]
})
export class AppComponent {
  title = 'SwissRep';
  selectedOption = 'GPT-4o'; // Default selected value
  dropdownOptions = ['GPT-4o', 'Llama-3.2-3B-Instruct']; // Dropdown values

  handleClick() {
    console.log("Button clicked!");
  }

  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length === 1) {
      const file = input.files[0];
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        alert('Please upload a valid CSV file.');
        input.value = ''; // Reset file input
        return;
      }
      console.log('Uploaded file:', file.name);
    } else {
      alert('Please upload only one CSV file.');
      input.value = ''; // Reset file input
    }
  }
}



