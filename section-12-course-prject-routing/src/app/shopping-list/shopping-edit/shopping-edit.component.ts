import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping-service.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  constructor(private shoppingService: ShoppingService) {}

  @ViewChild('nameInput') nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInputRef: ElementRef<HTMLInputElement>;

  onAddClick() {
    this.shoppingService.addToIngredient(
      new Ingredient(
        this.nameInputRef.nativeElement.value,
        Number(this.amountInputRef.nativeElement.value)
      )
    );
  }
}
