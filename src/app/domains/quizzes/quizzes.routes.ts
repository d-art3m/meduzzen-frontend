import { Routes } from '@angular/router';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizItemComponent } from './quiz-item/quiz-item.component';

export const routes: Routes = [
  { path: '', component: QuizListComponent },
  { path: ':id', component: QuizItemComponent },
];