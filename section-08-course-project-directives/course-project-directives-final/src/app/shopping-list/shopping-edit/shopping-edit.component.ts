import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInputRef: ElementRef<HTMLInputElement>;

  @Output() addToIngredient = new EventEmitter<Ingredient>();

  onAddClick() {
    this.addToIngredient.emit(
      new Ingredient(
        this.nameInputRef.nativeElement.value,
        Number(this.amountInputRef.nativeElement.value)
      )
    );
  }
}
