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

## Navigating with router links

```HTML
<a routerLink="/" routerLinkActive="active" ariaCurrentWhenActive="page">Home</a>
```

In Angular, routerLink, routerLinkActive, and ariaCurrentWhenActive are directives used for handling routing and accessibility on the client side, without contacting the server.

1. `routerLink`: This directive tells the router where to navigate when the link is clicked. In your example, `routerLink="/"`, it means that when the link is clicked, the router will navigate to the root route ("/").

2. `routerLinkActive`: This directive adds a CSS class to the element when the associated route is active. In your example, `routerLinkActive="active"`, it means that when the "/" route is active, the "active" CSS class will be added to the anchor tag. This is typically used to highlight the currently active link in a navigation menu.

3. `ariaCurrentWhenActive`: This is an accessibility attribute that indicates whether the current item in a set of items is the current active item. In your example, `ariaCurrentWhenActive="page"` means that when the "/" route is active, the `aria-current` attribute of the anchor tag will be set to "page". This helps screen readers understand which page is currently being viewed.

## Understanding navigation paths

In Angular's routing, the `routerLink` directive can be used with both absolute and relative paths, and they affect navigation differently:

1. **Absolute Paths**: An absolute path always refers to the root of the application. It starts with a forward slash (`/`). When you use an absolute path with `routerLink`, no matter where you are in the application, clicking the link will navigate to the specified path from the root. For example, `routerLink="/users"` will always navigate to the `/users` route, regardless of the current location in the app.

   ```html
   <a routerLink="/users">Users</a>
   ```

2. **Relative Paths**: A relative path does not start with a forward slash and is relative to the current route. When you use a relative path with `routerLink`, the navigation will be relative to the current URL in the browser's address bar. For example, if you are currently on `/users` and have a link with `routerLink="details"`, clicking the link will navigate to `/users/details`.

   ```html
   <a routerLink="details">User Details</a>
   ```

To use relative paths, you often need to provide additional information to the `RouterLink` directive to let it know what to be relative to. This is typically done by using the `relativeTo` property of the `ActivatedRoute` in the component class.

Here's an example of how you might use relative navigation in a component class:

```typescript
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-example',
  template: `
    <a [routerLink]="['./details']" [relativeTo]="route">User Details</a>
  `
})
export class ExampleComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
}
```

In this example, the `routerLink` is set to navigate to `./details` relative to the current active route, which is provided by injecting `ActivatedRoute` into the constructor and then binding it to the `relativeTo` input of the `routerLink`. All in all we can say that Angular supports how we move around in Linux (something like `../ and even ./`).

## Styling active router links

```HTML
<li
  role="presentation"
  routerLinkActive="active"
  [routerLinkActiveOptions]="{ exact: true }">
  <a routerLink="/" ariaCurrentWhenActive="page">Home</a>
</li>
```

1. `routerLinkActive`: This directive adds a CSS class to the element when the associated route is active. In your example, `routerLinkActive="active"`, it means that when the "/" route is active, the "active" CSS class will be added to the anchor tag. This is typically used to highlight the currently active link in a navigation menu.

2. `routerLinkActiveOptions`: This directive allows you to configure the behavior of `routerLinkActive`. In your example, `[routerLinkActiveOptions]="{ exact: true }"` means that the "active" class will only be applied when the route is exactly matched. Without `{ exact: true }`, the "active" class would also be applied when the route is a child route. For example, without `{ exact: true }`, if the current route was "/users/1", the "active" class would still be applied because "/users" is a parent route of "/users/1". But with `{ exact: true }`, the "active" class would only be applied when the current route is exactly "/".

As for your second question, `routerLinkActive` and `routerLinkActiveOptions` are using property binding. Property binding in Angular is denoted by square brackets `[]`. Here, you're binding the `routerLinkActive` directive to the string "active", and the `routerLinkActiveOptions` directive to the object `{ exact: true }`. This is not string interpolation or event binding. String interpolation would look like `{{ expression }}`, and event binding would look like `(eventName)="statement"`.

## Navigating programmatically

You can use dependency injection and the Router service to navigate to routes programmatically. To do so you need to inject the `Router` service and use it to navigate to the other routes programmatically:

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 constructor(private router: Router) {}

 ngOnInit() {}

 onLoadServers() {
    this.router.navigate(['/servers']);
 }
}
```

In the `onLoadServers()` method, `this.router.navigate(['/servers']);` is used to navigate to the '/servers' route. The `navigate()` method of the `Router` service takes an array of commands that represent the segments of the target URL. In this case, `['/servers']` represents the '/servers' route.

This method is called when the "Load Servers" button is clicked in your `@home.component.html` file:

```html
<button (click)="onLoadServers()" class="btn btn-primary">Load Servers</button>
```

So, when the button is clicked, the `onLoadServers()` method is executed, and the application navigates to the '/servers' route.

## Using relatives path programmatically

You can also use relative paths with the `router.navigate()` function. To do this, you need to provide additional information to the `Router` service to let it know what to be relative to. This is typically done by using the `relativeTo` option of the `NavigationExtras` object that you pass to the `navigate()` method.

Here's an example of how you might use relative navigation:

```typescript
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-example',
 template: `
    <a (click)="goToDetails()">Go to User Details</a>
 `
})
export class ExampleComponent {
 constructor(private route: ActivatedRoute, private router: Router) {}

 goToDetails() {
    this.router.navigate(['details'], { relativeTo: this.route });
 }
}
```

In this example, the `goToDetails()` method navigates to the 'details' route relative to the current active route. The `relativeTo` option is set to `this.route`, which is an instance of `ActivatedRoute`. This tells the `Router` service to calculate the target URL based on the current active route.

Please note that the `relativeTo` option expects an instance of `ActivatedRoute`, not a string. So, you cannot use `relativeTo` with a string path like `'../details'`. Instead, you would need to navigate to the parent route first, and then navigate to the child route.

## Passing parameters to routes

In Angular, route parameters are defined in the route configuration. They are specified as part of the path in the route definition. Route parameters are prefixed with a colon `:`.

In your `@app.routes.ts` file, you have already set up route parameters for the `UserComponent` route:

```typescript
{
 path: 'users/:id/:name',
 component: UserComponent,
}
```

In this route definition, `:id` and `:name` are route parameters. They represent dynamic values that will be part of the actual URL. For example, if you navigate to `/users/1/John`, `1` will be the value of the `id` parameter and `John` will be the value of the `name` parameter.

These route parameters can be accessed in your `UserComponent` using the `ActivatedRoute` service. Here's an example:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-user',
 templateUrl: './user.component.html',
 styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
 user: { id: number; name: string } = { id: 0, name: '' };

 constructor(private route: ActivatedRoute) {}

 ngOnInit() {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.name = this.route.snapshot.paramMap.get('name');
 }
}
```

In this example, `this.route.snapshot.paramMap.get('id')` and `this.route.snapshot.paramMap.get('name')` are used to get the values of the `id` and `name` route parameters.

## Fetching route parameters

In Angular, you can access route parameters in a component by injecting the `ActivatedRoute` service in the component's constructor. Then, you can use the `snapshot.paramMap.get()` method to get the value of a specific route parameter.

Here's an example of how you can do this in your `UsersComponent`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-users',
 templateUrl: './users.component.html',
 styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
 ];

 constructor(private route: ActivatedRoute) {}

 ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
 }
}
```

In this example, `this.route.snapshot.paramMap.get('id')` is used to get the value of the `id` route parameter. Replace `'id'` with the name of the route parameter you want to access.

Please note that this will only work if the `id` parameter is defined in your routing configuration. For example, in your `app.routes.ts` file, you might have something like this:

```typescript
{
 path: 'users/:id',
 component: UsersComponent,
}
```

In this case, `:id` is a route parameter, and its value can be accessed in the `UsersComponent` as shown above.

## Fetching route parameters reactively

The `route.params.subscribe()` function in Angular allows you to react to changes in route parameters. Whenever a route parameter changes, the callback function you provide to `subscribe()` will be executed.

Here's how you can use it in your `UsersComponent`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-users',
 templateUrl: './users.component.html',
 styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 user: { id: number; name: string } = { id: 0, name: '' };
 
 users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
 ];

 constructor(private route: ActivatedRoute) {}

 ngOnInit() {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.name = this.route.snapshot.paramMap.get('name');
    
    this.route.params.subscribe(params => {
        let id = params['id'];
        console.log(id);
        // You can now use the updated id to perform actions based on the new route parameter
   
        this.user.id = Number(params['id']);
        this.user.name = params['name'];
    });
 }
}
```

In this example, `this.route.params.subscribe()` is used to subscribe to changes in route parameters. The callback function takes a `params` object as an argument, which contains all the current route parameters. You can then use `params['id']` to get the value of the `id` route parameter.

Please note that this will only work if the `id` parameter is defined in your routing configuration. For example, in your `app.routes.ts` file, you might have something like this:

```typescript
{
 path: 'users/:id',
 component: UsersComponent,
}
```

In this case, `:id` is a route parameter, and its value can be accessed in the `UsersComponent` as shown above.
