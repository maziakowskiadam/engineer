import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { CounterState } from './store/states/counter.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppConfigModule } from './app-config.module';
import { ApiDataService } from './services/api-data.service';
import { HttpClientModule } from '@angular/common/http';
import { states } from './store/store';

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
        NgxsReduxDevtoolsPluginModule.forRoot(),
        HttpClientModule
    ],
    providers: [
        ApiDataService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
