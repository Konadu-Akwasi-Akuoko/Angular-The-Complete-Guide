import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}

  selectedRecipe: Recipe;

  ngOnInit(): void {
    this.recipeService.selectedRecipe.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
