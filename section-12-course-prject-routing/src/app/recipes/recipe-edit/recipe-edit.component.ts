import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      let recipeDetails = this.recipeService.getRecipe(id);

      // If the recipe does not exist, redirect to the recipes page
      if (!recipeDetails) {
        this.router.navigate(['/recipes']);
      }
    });
  }
}
