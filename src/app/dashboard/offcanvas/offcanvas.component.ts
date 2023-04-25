import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChatService } from 'src/app/_core/services/chat.service';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
})
export class OffcanvasComponent implements OnChanges {
  @Input() profile!: any;
  showNameInput = false;
  showAboutTextarea = false;
  chat?: boolean;

  constructor(private chatService: ChatService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if ('profile' in changes) {
      if (this.profile.participants) this.chat = true;
      else this.chat = false;
    }
  }

  editInfo(elem: string) {
    const icons = document.getElementsByClassName('Edit');
    if (elem === 'name') {
      if (this.showNameInput == false)
        icons[0].classList.replace('bi-pencil-fill', 'bi-check-lg');
      else {
        icons[0].classList.replace('bi-check-lg', 'bi-pencil-fill');
        this.chatService
          .updateName(this.profile._id, this.profile.name as string)
          .subscribe();
      }
      this.showNameInput = !this.showNameInput;
    } else {
      if (this.showAboutTextarea == false)
        icons[1].classList.replace('bi-pencil-fill', 'bi-check-lg');
      else {
        icons[1].classList.replace('bi-check-lg', 'bi-pencil-fill');
        this.chatService
          .updateAbout(this.profile._id, this.profile.about as string)
          .subscribe();
      }
      this.showAboutTextarea = !this.showAboutTextarea;
    }
  }
  uploadFile(event: any) {
    const imageFile = event.target.files[0];
    if (!imageFile.type.startsWith('image/')) {
      console.error('Selected file is not an image');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            img,
            (img.width - size) / 2,
            (img.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          );
          const dataUrl = canvas.toDataURL();
          this.chatService
            .updateImage(this.profile._id, dataUrl)
            .subscribe(() => {
              this.profile.image = dataUrl;
            });
        } else {
          console.error('Failed to get canvas context');
        }
      };
    };
  }
}
