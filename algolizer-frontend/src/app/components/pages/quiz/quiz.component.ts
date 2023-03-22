import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/app.models';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{
  quiz?: Quiz;
  answers: string[] = [];

  constructor(
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.uiService.quizSubject().subscribe(quizValue => this.quiz = quizValue);
  }


  onSubmit(): void {
    //ovdje obrađujemo odgovore, napravimo modal koji pokazuje šta je tačno odgovoreno, a šta pogrešno,
    // i dajemo mogućnost da se ide na opciju statistika
    //na pocijama statistika ćemo imat mock vrijednosti u tabeli koja predstavlja statistiku!
  }
}
