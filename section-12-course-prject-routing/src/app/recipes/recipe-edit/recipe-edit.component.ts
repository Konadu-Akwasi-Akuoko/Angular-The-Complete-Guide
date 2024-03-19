import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  private id: number;
  public editMode: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = null;
    this.editMode = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      // Check and see if the id is not null, if it is not null, then we are in edit mode, otherwise we are in new mode
      this.editMode = this.id != null;
    });
  }
}
