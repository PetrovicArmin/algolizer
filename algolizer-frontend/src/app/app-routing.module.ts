import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BubbleSortComponent } from './components/pages/bubble-sort/bubble-sort.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';
import { MergeSortComponent } from './components/pages/merge-sort/merge-sort.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'bubble-sort', component: BubbleSortComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'merge-sort', component: MergeSortComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
