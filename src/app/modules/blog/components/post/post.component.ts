import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../../shared/interfaces/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() layout: 'classic' | 'full' = 'classic';
  @Input() post: Post;

  constructor() { }

}
