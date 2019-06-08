import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/layout/layout.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AppConfigModule } from './app-config.module';
import { ApiDataService } from './shared/services/api-data.service';
import { HttpClientModule } from '@angular/common/http';
import { states } from './store/store';
import { ApiIdentityService } from './shared/services/api-identity.service';
import { RegisterService } from './shared/services/register.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        NgbModule,
        AppConfigModule,
        NgxsModule.forRoot([
            ...states
        ]),
        NgxsStoragePluginModule.forRoot(),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        HttpClientModule
    ],
    providers: [
        ApiDataService,
        ApiIdentityService,
        RegisterService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
