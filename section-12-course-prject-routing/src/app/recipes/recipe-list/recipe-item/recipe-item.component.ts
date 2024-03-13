import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../recipe-service.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input() recipe: Recipe;

  onSelected(recipe: Recipe) {
    this.recipeService.selectedRecipe.emit(recipe);
    this.router.navigate([recipe.id], { relativeTo: this.route });
  }
}
