import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe 1',
      'This is simply a test This is simply a test This is simply a test This is simply a test This is simply a test This is simply a test This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
    ),
    new Recipe(
      'A Test Recipe 2',
      'This is simply a test 2 This is simply a test 2 This is simply a test 2 This is simply a test 2 This is simply a test 2 This is simply a test 2',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
    ),
    new Recipe(
      'A Test Recipe 3',
      'This is simply a test 3 This is simply a test 2 This is simply a test 2 This is simply a test 2 This is simply a test 2 This is simply a test 2',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
    ),
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  getRecipes = () => {
    return this.recipes.slice();
  };
}
