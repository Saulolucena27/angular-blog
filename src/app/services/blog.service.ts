import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  photoCover: string;
  content: string;
  author: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private posts: BlogPost[] = [
    {
      id: 1,
      title: 'Nova versão do Angular',
      description: 'Confira as novidades da última versão do Angular',
      photoCover:
        'https://miro.medium.com/max/1400/1*G_3GHx9Lq5m6LiFqWVvEEg.jpeg',
      content: 'O Angular continua evoluindo...',
      author: 'Time Angular',
      date: '2024-03-23',
    },
    {
      id: 2,
      title: 'Boas práticas em TypeScript',
      description: 'Aprenda as melhores práticas para seu código TypeScript',
      photoCover:
        'https://miro.medium.com/max/1400/1*mn6bOs7s6Qbao15PMNRyOA.png',
      content: 'TypeScript é uma linguagem que...',
      author: 'Comunidade TS',
      date: '2024-03-22',
    },
  ];

  constructor() {}

  getPosts(): Observable<BlogPost[]> {
    return of(this.posts);
  }

  getPostById(id: number): Observable<BlogPost | undefined> {
    return of(this.posts.find((post) => post.id === id));
  }

  searchPosts(query: string): Observable<BlogPost[]> {
    const searchTerm = query.toLowerCase();
    return of(
      this.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.description.toLowerCase().includes(searchTerm)
      )
    );
  }
}
