import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment';

// Optional: If you want to use an API service
import { BackendService } from './services/backend-service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // You can provide your ApiService here if you want to use it directly
    BackendService,
    { provide: 'API_URL', useValue: environment.apiUrl }  // Inject API URL using the environment
  ]
}).catch(err => console.error(err));
