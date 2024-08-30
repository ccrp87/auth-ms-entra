import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

/*bootstrapApplication(AppModule, appConfig).catch((err) =>
  console.error(err)
);*/



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
