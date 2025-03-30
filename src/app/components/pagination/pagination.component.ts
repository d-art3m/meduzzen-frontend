import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems!: number;
  @Input() limit: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  totalPages: number = 1;
  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['limit'] || changes['currentPage']) {
      this.totalPages = Math.ceil(this.totalItems / this.limit);
      this.updatePageLinks();
    }
  }

  updatePageLinks(): void {
    let start = Math.max(2, this.currentPage - 1);
    let end = Math.min(this.totalPages - 1, this.currentPage + 1);

    this.pages = [
      1,
      ...(start > 2 ? [-1] : []),
      ...Array.from({ length: end - start + 1 }, (_, i) => start + i),
      ...(end < this.totalPages - 1 ? [-1] : []),
      this.totalPages,
    ];
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  isCurrentPage(page: number): boolean {
    return page === this.currentPage;
  }
}
