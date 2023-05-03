import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  applicationName: string = "Algolizer ETF";
  version: string = "1.0.0";

  constructor(
    public router: Router
  ){}

  ngOnInit(): void {
    
  }

  showStatistics() {
    this.router.navigate(['statistics']);
  }
}
