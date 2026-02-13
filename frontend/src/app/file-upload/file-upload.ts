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
    
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    console.log('File Name:', file.name);
    console.log('File Size (bytes):', file.size);
    console.log('File Type:', file.type);
  }
}
