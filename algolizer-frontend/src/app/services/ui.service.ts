import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Quiz } from '../app.models';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  quiz: BehaviorSubject<Quiz> = new BehaviorSubject({} as Quiz);

  constructor() { }

  quizSubject(): Observable<Quiz> {
    return this.quiz.asObservable();
  }

  toggleQuiz(quizInformation: Quiz): void {
    this.quiz.next(quizInformation);
  }
}
