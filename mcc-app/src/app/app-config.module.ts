import { InjectionToken, NgModule } from '@angular/core';

export class AppConfig {
    apiUrl: string;
    identityUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const DefaultAppConfig: AppConfig = {
    apiUrl: 'http://localhost:8081',
    identityUrl: 'http://localhost:5000'
};

@NgModule({
    providers: [
        {
            provide: APP_CONFIG,
            useValue: DefaultAppConfig
        }
    ]
})
export class AppConfigModule {}


