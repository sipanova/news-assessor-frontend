import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BackendService } from '../services/backend-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,  // Standalone component,
  imports: [RouterOutlet, CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
  title = 'SwissRep';
  selectedOption = 'GPT-4o'; // Default selected value
  dropdownOptions = ['GPT-4o', 'Llama-3.2-3B-Instruct']; // Dropdown values
  // userEmail: string = '';
  loading = false; // Track loading state
  timer = '00:00'; 
  private seconds = 0;
  private intervalId: any;

  private backendService = inject(BackendService);  // Inject ApiService

  ngOnInit() {
    this.backendService.health().subscribe(response => {
      console.log('Init health check:', response);
    });
  }

  process_HandleClick(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('No file uploaded. Please upload a CSV file first.');
      return;
    }
  
    const file = fileInput.files[0];
  
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please upload a valid CSV file.');
      fileInput.value = ''; // Reset file input
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', this.selectedOption); 

    console.log('LLM:', this.selectedOption);
    this.loading = true;
    this.startTimer();
    this.backendService.process(formData).subscribe({
      next: (response) => {
        console.log('File processed successfully:', response);
        fileInput.value = '';
      },
      error: (error) => {
        console.error('Error processing file:', error);
        alert('An error occurred while processing the file.');
        fileInput.value = '';
        this.loading = false; 
        this.stopTimer()
      },
      complete: () => {
        this.loading = false; 
        this.stopTimer()
      }
    });

  }

  removeFile_HandleClick(fileInput: HTMLInputElement) {
    fileInput.value = ''; // Reset file input
    console.log('File input reset.');
  }
  test_HandleClick() {
    this.backendService.health().subscribe(response => {
      console.log('Health check on button click, response: ', response);
    });
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

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  startTimer() {
    this.seconds = 0;
    this.timer = '00:00'; 
    this.intervalId = setInterval(() => {
      this.seconds++;
      const minutes = Math.floor(this.seconds / 60);
      const secs = this.seconds % 60;
      this.timer = this.formatTime(minutes, secs);
    }, 1000);
  }

  formatTime(minutes: number, seconds: number): string {
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}



