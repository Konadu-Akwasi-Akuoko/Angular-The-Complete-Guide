import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe-service.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedRecipe = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      // console.log(id);
      this.selectedRecipe = this.recipeService.getRecipe(id);
    });

    // this.recipeService.selectedRecipe.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // });
  }

  onAddToShoppingList() {
    this.recipeService.addToIngredients(this.selectedRecipe.ingredients);
  }
}
