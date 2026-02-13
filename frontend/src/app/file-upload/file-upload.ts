import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Sign } from 'crypto';

@Component({
  selector: 'app-file-upload',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload implements OnInit{
  progressBarValue =  signal(10);

  ngOnInit(): void {
    const interval = setInterval(() => {
    if (this.progressBarValue() >= 100) {
      clearInterval(interval);
      return;
    }

    this.progressBarValue.update(v => v + 1);
  }, 1000);
  }
}
