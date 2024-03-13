import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  selectedRecipe: Recipe;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      console.log(id);
    });
    this.recipeService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }

  onAddToShoppingList() {
    this.recipeService.addToIngredients(this.selectedRecipe.ingredients);
  }
}
