import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/app.models';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{
  quiz: Quiz = {} as Quiz;
  answers: string[] = [];
  answered: boolean = false;

  constructor(
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.uiService.quizSubject().subscribe(quizValue => this.quiz = quizValue);
  }


  onSubmit(): void {
    this.answered = true;
    this.quiz.earnedPoints = 0;

    for (let question of this.quiz?.questions) {
      if (question.answer == question.userInput) {
        question.correct = true;
        this.quiz.earnedPoints += question.points;
      }
    }

    this.uiService.toggleQuiz(this.quiz);
  }

  totalPoints() {
    let total = 0;

    for (let question of this.quiz.questions) {
      total += question.points;
    }

    return total;
  }

  goToStatistics() {
      console.log("Otišao sam na statistics page!");
  }
}
