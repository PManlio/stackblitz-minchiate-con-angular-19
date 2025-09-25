import { Injectable } from '@angular/core';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor() {}

  async getAllPosts() {
    const allPostsFetch = await fetch(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return (await allPostsFetch.json()) as Post[];
  }

  async getPostById(id: number): Promise<Post> {
    const postRequest = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return (await postRequest.json()) as Post;
  }
}
