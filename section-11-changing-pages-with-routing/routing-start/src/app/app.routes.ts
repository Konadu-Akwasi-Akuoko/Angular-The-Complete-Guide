import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';

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
    path: 'users/:id/:name',
    component: UserComponent,
  },
  {
    path: 'servers',
    component: ServersComponent,
  },
  {
    path: 'servers/:id/edit',
    component: EditServerComponent,
  },
];
