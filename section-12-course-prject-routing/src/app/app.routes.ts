import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,

    children: [
      { path: '', component: RecipeStartComponent },
      { path: ':id', component: RecipeDetailComponent },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: '/recipes' },
];
