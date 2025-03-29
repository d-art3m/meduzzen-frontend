import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { QuizCreateComponent } from '../../quizzes/quiz-create/quiz-create.component';
import { QuizEditComponent } from '../../quizzes/quiz-edit/quiz-edit.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-company-quiz-list',
  imports: [
    ModalComponent,
    RouterLink,
    QuizCreateComponent,
    QuizEditComponent,
    LoadingComponent,
    PaginationComponent,
  ],
  templateUrl: './company-quiz-list.component.html',
  styleUrl: './company-quiz-list.component.scss',
})
export class CompanyQuizListComponent implements OnInit {
  @Input() companyId!: string;
  @Input() isOwner!: boolean;

  quizzes: Quiz[] = [];
  loading: boolean = false;
  error: string = '';
  isEditModalOpen: boolean = false;
  isCreateQuizModalOpen: boolean = false;
  selectedQuiz: Quiz | null = null;
  totalQuizzes: number = 0;
  currentPage: number = 1;
  limit: number = 10;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.loading = true;
    this.quizService.getQuizzesByCompanyId(this.companyId, this.currentPage, this.limit).subscribe({
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

  openEditModal(quiz: Quiz): void {
    this.selectedQuiz = quiz;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedQuiz = null;
  }

  openCreateQuizModal(): void {
    this.isCreateQuizModalOpen = true;
  }

  closeCreateQuizModal(): void {
    this.isCreateQuizModalOpen = false;
  }

  handleQuizCreated(newQuiz: Quiz): void {
    this.quizzes.push(newQuiz);
    this.closeCreateQuizModal();
  }

  handleQuizUpdated(updatedQuiz: Quiz): void {
    const index = this.quizzes.findIndex((quiz) => quiz.id === updatedQuiz.id);
    if (index !== -1) {
      this.quizzes[index] = updatedQuiz;
    }
    this.closeEditModal();
  }

  handleQuizDeleted(quizId: string): void {
    this.quizzes = this.quizzes.filter((quiz) => quiz.id !== quizId);
    this.closeEditModal();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadQuizzes();
  }
}
