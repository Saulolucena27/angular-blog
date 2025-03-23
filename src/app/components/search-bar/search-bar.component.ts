import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search-container">
      <input
        type="text"
        placeholder="Pesquisar artigos..."
        [(ngModel)]="searchTerm"
        (input)="onSearch()"
        class="search-input"
      />
    </div>
  `,
  styles: [
    `
      .search-container {
        margin: 20px auto;
        max-width: 600px;
        width: 100%;
      }

      .search-input {
        width: 100%;
        padding: 12px 20px;
        border: 2px solid #ddd;
        border-radius: 25px;
        font-size: 16px;
        transition: all 0.3s ease;
        outline: none;
      }

      .search-input:focus {
        border-color: #808080;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class SearchBarComponent implements OnInit {
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private blogService: BlogService) {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.blogService.searchPosts(term).subscribe((results) => {
          console.log('Resultados da pesquisa:', results);
          // Aqui você pode emitir os resultados para o componente pai
        });
      });
  }

  ngOnInit(): void {}

  onSearch(): void {
    this.searchSubject.next(this.searchTerm);
  }
}
