import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  constructor() {
    console.log('constructor called!');
  }

  @ViewChild('heading', { static: true }) header: ElementRef<HTMLElement>;
  // @Input('srvElement') element: { type: string; name: string; content: string };
  @Input() name: string;
  @ContentChild('contentParagraph', { static: true })
  paragraph: ElementRef<HTMLElement>;

  ngOnInit() {
    console.log('ngOnInit called!');
    console.log(
      'This is the header content ' + this.header.nativeElement.textContent
    );
    console.log(
      'This is the paragraph content ' +
        this.paragraph.nativeElement.textContent
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngDoCheck() {
    console.log('ngDoCheck called!');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
    console.log(
      'This is the paragraph content ' +
        this.paragraph.nativeElement.textContent
    );
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
    console.log(
      'This is the header content ' + this.header.nativeElement.textContent
    );
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }
}
