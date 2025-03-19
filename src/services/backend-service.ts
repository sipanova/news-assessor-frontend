import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { endpoints } from '../environments/endpoints';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Sends a CSV file to the backend for processing.
   * @param fileData - FormData containing the uploaded CSV file.
   * @returns Observable of the API response.
   */
  process(fileData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoints.process}`, fileData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Calls the FastAPI health check endpoint.
   * @returns Observable of the API response.
   */
  health(): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoints.health}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors gracefully.
   * @param error - HTTP error response.
   * @returns Observable throwing an error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
