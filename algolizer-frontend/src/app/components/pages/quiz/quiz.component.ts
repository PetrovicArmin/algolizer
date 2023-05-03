import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/app.models';
import { UiService } from 'src/app/services/ui.service';
import { QuizResults } from '../../../app.models';
import { RandomizerService } from 'src/app/services/randomizer.service';
import { quiz_statistics } from '../../../app.helpers';
import { Router } from '@angular/router';


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
    private router: Router,
    private uiService: UiService,
    private randomizerService: RandomizerService
  ) {}

  ngOnInit(): void {
    this.uiService.quizSubject().subscribe(quizValue => this.quiz = quizValue);
  }


  onSubmit(): void {
    let numberOfCorrectAnswers: number = 0;
    let totalPoints: number  = 0;
    this.answered = true;
    this.quiz.earnedPoints = 0;
    
    for (let question of this.quiz?.questions) {
      if (question.answer == question.userInput) {
        question.correct = true;
        this.quiz.earnedPoints += question.points;
        numberOfCorrectAnswers++;
      }

      totalPoints += question.points;
    }

    const quizResults: QuizResults = {
      algorithm_name: this.quiz.type,
      user_id: this.randomizerService.randomIntFromInterval(0,2),
      num_of_questions: this.quiz?.questions.length,
      correct_answers: numberOfCorrectAnswers,
      max_points: totalPoints,
      earned_points: this.quiz.earnedPoints
    }

    quiz_statistics.push(quizResults);

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
    this.router.navigate(['statistics']);
  }
}
