import { Component, OnInit } from '@angular/core';
import { quiz_statistics } from '../../../app.helpers';
import { ProblemType, QuizResults, QuizTableRow } from '../../../app.models';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit{
  displayedColumns: string[] = ['algorithm_name', 'number_of_users', 'number_of_finished_quizes', 'avg_correct_answers', 'avg_number_of_points'];
  problemTypes: string[] = Object.values(ProblemType);
  rows: QuizTableRow[] = [];

  ngOnInit(): void {
    console.log("Moji podaci koje sam povukao sa 'bekenda' su: ");
    console.log("Veličina niza: " + quiz_statistics.length);
    console.log(JSON.stringify(quiz_statistics));

    for (let problemType of this.problemTypes) {
      this.rows.push(this.createTableRow(quiz_statistics, problemType));
    }
  }

  createTableRow(statistics: QuizResults[], algorithmType: string): QuizTableRow {
    let quizTableRow: QuizTableRow = {
      algorithm_name: algorithmType,
      avg_correct_answers: "",
      avg_number_of_points: "",
      number_of_finished_quizes: "",
      number_of_users: ""
    };

    let number_of_finished_quizes = 0;
    let number_of_users = 0;
    let avg_correct_answers = 0;
    let avg_number_of_points = 0;
    let users = new Set();
    let num_of_questions = 0;
    let max_points = 0;

    for (let quiz of statistics) {
      if (quiz.algorithm_name == algorithmType) {
        number_of_finished_quizes++;
        users.add(quiz.user_id);
        avg_correct_answers += quiz.correct_answers;
        avg_number_of_points += quiz.earned_points;
        num_of_questions = quiz.num_of_questions;
        max_points = quiz.max_points;
      }
    }

    avg_correct_answers /= number_of_finished_quizes;
    avg_number_of_points /= number_of_finished_quizes;

    number_of_users = users.size;

    quizTableRow.avg_correct_answers = avg_correct_answers.toString() + " of " + num_of_questions.toString() + " (" + Math.round((avg_correct_answers/num_of_questions)*100.0)  + " %)";
    quizTableRow.avg_number_of_points = avg_number_of_points.toString() + " of " + max_points.toString() + " (" + Math.round((avg_number_of_points/max_points)*100.0) + "% )";

    quizTableRow.number_of_finished_quizes = number_of_finished_quizes.toString();
    quizTableRow.number_of_users = number_of_users.toString();

    return quizTableRow;
  }
}
