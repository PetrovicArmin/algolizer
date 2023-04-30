import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ProblemType } from 'src/app/app.models';

@Component({
  selector: 'app-dashboard',
  animations: [
    trigger('insertRemoveRecommendations', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  myControl: FormControl = new FormControl();
  problemTypes: string[] = Object.values(ProblemType);
  filteredOptions: Observable<string[]> = new Observable<string[]>;
  problemType: string = "";

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  _filter(value: string): string[] {
    const filterValue = value.trim().toLowerCase();
    return this.problemTypes.filter(option => option.toLowerCase().includes(filterValue));
  }

  onStartLearning() {
    console.log(this.problemType);
    switch(this.problemType) {
      case 'Bubble sort algorithm': 
        this.router.navigate(['/bubble-sort']);
        break;
      case 'Merge sort algorithm':
        this.router.navigate(['/merge-sort']);
        break;
      case 'Insertion sort algorithm':
        this.router.navigate(['insertion-sort']);
        break;
      default:
        this.router.navigate(['/ostali-algoritmi']);
    }
  }
}
