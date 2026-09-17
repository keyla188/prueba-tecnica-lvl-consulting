import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

const CLOUD_NAME = 'dvmng7jc7';
const UPLOAD_PRESET = 'lvl_consulting_unsigned';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

interface CloudinaryUploadResponse {
  secure_url: string;
}

@Injectable({ providedIn: 'root' })
export class ImageUploadService {
  private readonly http = inject(HttpClient);

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    return this.http
      .post<CloudinaryUploadResponse>(UPLOAD_URL, formData)
      .pipe(map((response) => response.secure_url));
  }
}
