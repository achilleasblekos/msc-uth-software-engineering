import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {async, firstValueFrom} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() recipeId?: string; // ID της συνταγής που παίρνει από το γονικό component
  @Input() stepId?: string;
  @Input() flag?: string;
  uploadForm: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  images: { id: number; url: string; path: string }[] = [];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar // Προστέθηκε MatSnackBar
  ) {
    this.uploadForm = this.formBuilder.group({
      image: [null]
    });
  }

  async ngOnInit(): Promise<void> {
    console.log("recipeId", this.recipeId)
    console.log("stepId", this.stepId)
    if (this.flag === "isStep") {
      console.log('Loading step images for stepId:', this.stepId);
      await this.loadStepImages();
    }
    if (this.flag === "isRecipe") {
      await this.loadRecipeImages();
      console.log('Checking if steps exist for recipeId:', this.recipeId);
    }
  }


  async loadRecipeImages(): Promise<void> {
    if (this.recipeId) {
      const endpoint = `${environment.apiUrl}/recipes/${this.recipeId}/images`;
      try {
        const images = await firstValueFrom(
          this.http.get<{ id: number; path: string }[]>(endpoint)
        );
        // Φιλτράρουμε εικόνες χωρίς stepId
        this.images = images
          .filter((image) => !image.path.includes('/steps/')) // Εξαίρεση εικόνων που ανήκουν σε steps
          .map((image) => ({
            id: image.id,
            path: image.path,
            url: `${environment.apiUrl}/${image.path}`
          }));
        console.log('Recipe Images:', this.images);
      } catch (err) {
        console.error('Failed to load recipe images:', err);
        this.snackBar.open('Αποτυχία φόρτωσης εικόνων συνταγής.', 'Κλείσιμο', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    }
  }


  async loadStepImages(): Promise<void> {
    if (this.stepId) {
      const endpoint = `${environment.apiUrl}/steps/recipes/${this.recipeId}/steps/${this.stepId}/images`;
      try {
        const images = await firstValueFrom(
          this.http.get<{ id: number; path: string }[]>(endpoint)
        );
        this.images = images.map((image) => ({
          id: image.id,
          path: image.path,
          url: `${environment.apiUrl}/${image.path}`
        }));
        console.log('Step Images:', this.images);
      } catch (err) {
        console.error('Failed to load step images:', err);
        this.snackBar.open('Αποτυχία φόρτωσης εικόνων βήματος.', 'Κλείσιμο', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    }
  }


  async onDeleteImage(imageId: number, index: number): Promise<void> {
    let endpoint = '';

    if (this.stepId) {
      endpoint = `${environment.apiUrl}/steps/${this.recipeId}/${this.stepId}/images/${imageId}`;
    } else if (this.recipeId) {
      endpoint = `${environment.apiUrl}/recipes/${this.recipeId}/image/${imageId}`;
    } else {
      this.snackBar.open('Λείπει το Recipe ή το Step ID.', 'Κλείσιμο', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    try {
      await firstValueFrom(this.http.delete(endpoint, { responseType: 'text' }));
      this.snackBar.open('Η εικόνα διαγράφηκε επιτυχώς!', 'Κλείσιμο', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.images.splice(index, 1);
    } catch (err) {
      console.error('Error deleting image:', err);
      this.snackBar.open('Αποτυχία διαγραφής της εικόνας.', 'Κλείσιμο', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0];
      this.uploadForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async onUpload(): Promise<void> {
    const formData = new FormData();
    const file = this.uploadForm.get('image')?.value;

    // Ελέγχουμε αν υπάρχει αρχείο εικόνας
    if (!file) {
      this.snackBar.open('Παρακαλώ επιλέξτε ένα αρχείο.', 'Κλείσιμο', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    formData.append('file', file);

    let endpoint = '';

    // Έλεγχος αν υπάρχει το recipeId
    if (!this.recipeId) {
      this.snackBar.open('Δημιουργείστε πρώτα την συνταγή.', 'Κλείσιμο', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    // Διαχείριση του endpoint με βάση το flag
    if (this.flag === 'isStep') {
      // Αν το flag είναι isStep, τότε χρησιμοποιούμε το stepId
      if (!this.stepId) {
        this.snackBar.open('Δημιουργείστε πρώτα το βήμα.', 'Κλείσιμο', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        return;
      }
      endpoint = `${environment.apiUrl}/steps/recipes/${this.recipeId}/steps/${this.stepId}/images`;
    } else if (this.flag === 'isRecipe') {
      // Αν το flag είναι isRecipe, τότε χρησιμοποιούμε μόνο το recipeId
      endpoint = `${environment.apiUrl}/recipes/${this.recipeId}/images`;
    } else {
      console.log('Μη έγκυρο flag.');
      return;
    }

    // Αποστολή φωτογραφίας
    try {
      const response = await firstValueFrom(
        this.http.post<{ id: number; filePath: string }>(endpoint, formData)
      );
      this.snackBar.open('Η εικόνα ανέβηκε επιτυχώς!', 'Κλείσιμο', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.images.push({
        id: response.id,
        path: response.filePath,
        url: `${environment.apiUrl}/${response.filePath}`
      });
      this.uploadForm.reset();
      this.previewUrl = null;
    } catch (err) {
      console.error('Error uploading image:', err);
      this.snackBar.open('Αποτυχία ανάρτησης της εικόνας.', 'Κλείσιμο', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  }


}
