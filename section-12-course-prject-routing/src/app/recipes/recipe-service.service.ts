import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping-service.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private shoppingService: ShoppingService) {}

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Tasty Rice',
      'A super-tasty rice - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [new Ingredient('Rice', 1), new Ingredient('Water', 20)]
    ),
    new Recipe(
      2,
      'Big fat steak',
      'Nothing better than a big fat steak!',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Salt', 20),
        new Ingredient('Pepper', 20),
      ]
    ),
    new Recipe(
      3,
      'Spicy chicken',
      'Spicy chicken with a hint of lemon!',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('Chicken', 2),
        new Ingredient('Lemon', 2),
        new Ingredient('Pepper', 20),
      ]
    ),
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  // getRecipes = () => {
  //   return this.recipes.slice();
  // };

  public get getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe | null {
    // handle invalid id, and when the id is not in the array

    // return this.recipes.filter((recipe: Recipe) => recipe.id == id)[0];

    let detailedRecipe = this.recipes.filter(
      (recipe: Recipe) => recipe.id == id
    )[0];
    return detailedRecipe ? detailedRecipe : null;
  }

  addToIngredients(ingredient: Ingredient[]) {
    this.shoppingService.addToIngredients(ingredient);
  }
}
