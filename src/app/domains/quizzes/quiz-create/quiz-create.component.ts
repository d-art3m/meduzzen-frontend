import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-create',
  imports: [ReactiveFormsModule],
  templateUrl: './quiz-create.component.html',
  styleUrl: './quiz-create.component.scss',
})
export class QuizCreateComponent {
  @Input() companyId: string | null = null;
  @Output() quizCreated = new EventEmitter<Quiz>();
  @Output() cancel = new EventEmitter<void>();

  quizForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private quizService: QuizService) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      questions: this.fb.array([this.createQuestion()]),
    });
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answerOptions: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
      correctAnswer: ['', Validators.required],
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  getAnswerOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('answerOptions') as FormArray;
  }

  onSubmit(): void {
    if (this.quizForm.valid && this.companyId) {
      const quizData = this.quizForm.value;
      this.quizService
        .createQuiz({ ...quizData, companyId: this.companyId })
        .subscribe({
          next: (res: any) => {
            this.quizCreated.emit(res.detail);
          },
          error: (err: any) => {
            this.error = err.error?.detail?.error || err.message;
          },
        });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
