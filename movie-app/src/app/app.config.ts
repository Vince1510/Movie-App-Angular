import { provideHttpClient } from '@angular/common/http'; // Import the provideHttpClient

// Define your app configuration
export const appConfig = {
  providers: [
    provideHttpClient(), // Provide HttpClient globally
  ],
};
