import { Component } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.eatingwell.com/thmb/Z30Dnoxft_c8dwJzKakVpJuuqJA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/creamy-garlic-skillet-chicken-with-spinach-7fb96b8ced6b4075b61b01d5d308f73b.jpg'
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://www.eatingwell.com/thmb/Z30Dnoxft_c8dwJzKakVpJuuqJA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/creamy-garlic-skillet-chicken-with-spinach-7fb96b8ced6b4075b61b01d5d308f73b.jpg'
    ),
  ];
}
