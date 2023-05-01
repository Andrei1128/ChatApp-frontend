import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent implements OnInit {
  videoGrid: any;
  myVideo: any;

  constructor(private socket: Socket) {}

  ngOnInit(): void {
    this.videoGrid = document.getElementById('video-grid');
    this.myVideo = document.createElement('video');
    this.myVideo.muted = true;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        this.addVideoStream(this.myVideo, stream);
      });
  }
  addVideoStream(video: any, stream: any) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play();
    });
    this.videoGrid.append(video);
  }
}
