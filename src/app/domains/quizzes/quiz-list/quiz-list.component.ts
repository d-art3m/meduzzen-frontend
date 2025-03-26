import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  imports: [RouterLink, PaginationComponent],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss',
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  totalQuizzes: number = 0;
  currentPage: number = 1;
  limit: number = 10;
  error: string = '';
  loading: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.loading = true;
    this.quizService.getPublicQuizzes(this.currentPage, this.limit).subscribe({
      next: (res: any) => {
        this.quizzes = res.detail.items;
        this.totalQuizzes = res.detail.total;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.detail?.error || err.message;
        this.loading = false;
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadQuizzes();
  }
}
