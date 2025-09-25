import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
  WritableSignal,
  OnInit,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FetchService } from './app/fetch-service';
import { Post } from './app/fetch-service';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  template: `
    <br><br>

    <div>
      postID: {{this.postId()}}
      <button (click)="incrementPostId()" >incrementa postId</button>
    </div>

    <br><br>
    il post:
    <pre>
      {{ this.singlePost() | json }}
    </pre>

    <br><br>
    
    gli altri post:
    <pre>
      {{this.allPostComputed() | json}}
    </pre>
  `,
})
export class PlaygroundComponent implements OnInit {
  ngOnInit() {
    console.log(`Almeno inizio, postId: ${this.postId()}`);
  }

  private _fetchService = inject(FetchService);

  public postId: WritableSignal<number> = signal(0);
  public post: WritableSignal<Post> = signal({} as Post);

  public set setPostId(id: number) {
    this.postId.set(id);
  }

  public incrementPostId() {
    this.postId.update((postId) => postId + 1);
  }

  public allPostComputed = computed(async () => {
    return await this._fetchService.getAllPosts();
  });

  public singlePost = linkedSignal(async () => {
    const newId = this.postId();
    return await this._fetchService.getPostById(newId);
    // oppure:
    // await this._fetchService.getPostById(newId);
    // this.post.set(post);
  });
}

bootstrapApplication(PlaygroundComponent);
