# Routing

In a single-page app, you change what the user sees by showing or hiding portions of the display that correspond to particular components, rather than going out to the server to get a new page. As users perform application tasks, they need to move between the different views that you have defined.

To handle the navigation from one view to the next, you use the Angular Router. The Router enables navigation by interpreting a browser URL as an instruction to change the view.

## Why do we need a router?

In Angular, a router is essential for several reasons:

1. **Single Page Application (SPA)**: Angular is primarily used to build SPAs. In an SPA, all necessary code (HTML, JavaScript, CSS) is retrieved with a single page load, or the necessary resources are dynamically loaded as needed, usually in response to user actions. The router allows us to manage navigation between different views without refreshing the page.

2. **Navigation**: The router enables navigation between different components in your application. Each route is associated with a component, and when the route is activated, the associated component is displayed.

3. **Deep Linking**: Deep linking allows users to link directly to specific content within your app. The router handles parsing the URL and loading the appropriate component.

4. **Code Organization**: The router helps keep your code organized. By associating routes with components, you can easily understand what component is responsible for what part of your app.

5. **Parameterized Routes**: The router supports parameterized routes, allowing you to pass data through the URL. This is useful for things like passing IDs to detail views.

6. **Nested Routes**: The router supports nested routes, which is useful for creating complex navigation structures.

7. **Route Guards**: Route guards are interfaces which can tell the router whether or not it should allow navigation to a requested route. They can be used to prevent unauthorized access to certain routes.

8. **Lazy Loading**: Lazy loading is a design pattern that delays the initialization of an object until it is needed. In Angular, you can use lazy loading to load JavaScript components asynchronously when a specific route is activated. This can significantly improve performance for larger apps.

## Setting up and loading routes

In Angular, routing is a process of navigating between different pages (or views) of an application. It's a key part of any single-page application (SPA), where all necessary code is loaded once and additional views are loaded as needed without a full page refresh.

1. **app.module.ts**: This is the main module file where you import and declare everything that your app is going to use. In your case, you've imported `RouterModule` and used `RouterModule.forRoot(appRoutes)` in the imports array. This tells Angular to use the routes defined in `appRoutes` for the root of the application.

```typescript
...
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServersService } from './servers/servers.service';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
   ...
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [ServersService],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

2. **app.routes.ts**: This file contains the routes of your application. Each route is an object with a `path` and a `component`. The `path` is the URL, and the `component` is what will be displayed when that URL is navigated to. For example, when you navigate to '/users', the `UsersComponent` will be displayed.

```typescript
import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'servers',
    component: ServersComponent,
  },
];
```

3. **app.component.html**: This is the main HTML file of your application. The `routerLink` directive is used to link to routes. When you click on a link with a `routerLink`, the router navigates to the URL and displays the component associated with that URL. The `routerLinkActive` directive is used to apply CSS classes to an HTML element when a router link it's associated with is active.

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active">
          <a
            routerLink="/"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            >Home</a
          >
        </li>
        <li role="presentation">
          <a
            routerLink="/servers"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            >Servers</a
          >
        </li>
        <li role="presentation">
          <a
            routerLink="/users"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            >Users</a
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet />
    </div>
  </div>
</div>
```

4. **`<router-outlet />`**: This is a placeholder directive that Angular dynamically fills based on the current router state. When you navigate to a route, the component for that route is placed into the `<router-outlet>`.

```html
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet />
    </div>
  </div>
```

So, in your application, when you click on 'Home', 'Servers', or 'Users' in the navigation bar, the router will navigate to the corresponding path ('/', '/servers', or '/users'), and the associated component (`HomeComponent`, `ServersComponent`, or `UsersComponent`) will be displayed in place of `<router-outlet />`.
