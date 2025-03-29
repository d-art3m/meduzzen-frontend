import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz-item',
  imports: [FormsModule, ModalComponent, LoadingComponent],
  templateUrl: './quiz-item.component.html',
  styleUrl: './quiz-item.component.scss',
})
export class QuizItemComponent implements OnInit {
  quiz: Quiz | null = null;
  error: string | null = null;
  loading: boolean = false;
  userAnswers: { [questionId: string]: string } = {};
  correctAnswers: number = 0;
  score: number = 0;
  showResultsModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.quizService.getQuizById(id).subscribe({
        next: (res: any) => {
          this.quiz = res.detail;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = err.error?.detail?.error || err.message;
          this.loading = false;
        },
      });
    }
  }

  onAnswerSelect(questionId: string | undefined, selectedAnswer: string): void {
    if (questionId) {
      this.userAnswers[questionId] = selectedAnswer;
    }
  }

  submitQuiz(): void {
    if (!this.quiz?.questions) {
      return;
    }

    this.correctAnswers = 0;
    for (const question of this.quiz.questions) {
      if (this.userAnswers[question.id!] === question.correctAnswer) {
        this.correctAnswers++;
      }
    }
    this.score = parseFloat(((this.correctAnswers / this.quiz.questions.length) * 100).toFixed(2));
    
    this.showResultsModal = true;
  }

  closeResultsModal(): void {
    this.showResultsModal = false;
    this.location.back();
  }
}
