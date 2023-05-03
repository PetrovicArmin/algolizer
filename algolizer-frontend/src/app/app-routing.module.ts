import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BubbleSortComponent } from './components/pages/bubble-sort/bubble-sort.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';
import { MergeSortComponent } from './components/pages/merge-sort/merge-sort.component';
import { InsertionSortComponent } from './components/pages/insertion-sort/insertion-sort.component';
import { QuickSortComponent } from './components/pages/quick-sort/quick-sort.component';
import { SelectionSortComponent } from './components/pages/selection-sort/selection-sort.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'bubble-sort', component: BubbleSortComponent},
  {path: 'quiz', component: QuizComponent},
  {path: 'merge-sort', component: MergeSortComponent},
  {path: 'insertion-sort', component: InsertionSortComponent},
  {path: 'quick-sort', component: QuickSortComponent},
  {path: 'selection-sort', component: SelectionSortComponent},
  {path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
