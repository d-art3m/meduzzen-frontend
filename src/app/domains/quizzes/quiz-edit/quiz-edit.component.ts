import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz, QuizQuestion } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './quiz-edit.component.html',
  styleUrl: './quiz-edit.component.scss',
})
export class QuizEditComponent implements OnInit {
  @Input() quiz!: Quiz;
  @Output() update = new EventEmitter<Quiz>();
  @Output() cancel = new EventEmitter<void>();
  @Output() deleteQuiz = new EventEmitter<void>();

  quizForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private quizService: QuizService) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.quizForm.patchValue({
      title: this.quiz.title,
      description: this.quiz.description,
    });
    this.setQuestions(this.quiz.questions);
  }

  setQuestions(questions: QuizQuestion[]): void {
    const questionsFG = questions.map((question: QuizQuestion) =>
      this.fb.group({
        question: [question.question, Validators.required],
        answerOptions: this.fb.array(question.answerOptions),
        correctAnswer: [question.correctAnswer, Validators.required],
      })
    );
    const questionFormArray = this.fb.array(questionsFG);
    this.quizForm.setControl('questions', questionFormArray);
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
    if (this.quizForm.valid) {
      const quizData = this.quizForm.value;
      this.quizService.updateQuiz(this.quiz.id!, quizData).subscribe({
        next: (res: any) => {
          this.update.emit(res.detail);
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

  onDelete(): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizService.deleteQuiz(this.quiz.id!).subscribe({
        next: () => {
          this.deleteQuiz.emit();
        },
        error: (err: any) => {
          this.error = err.error?.detail?.error || err.message;
        },
      });
    }
  }
}
