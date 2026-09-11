<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <CameraComponent @photo-captured="addPhoto" />

      <PhotoGalleryComponent :photos="photos" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";

import { onMounted, ref } from "vue";

import CameraComponent from "../Components/CameraComponent.vue";
import PhotoGalleryComponent from "../Components/PhotoGalleryComponent.vue";

import {
  ref as firebaseRef,
  push,
  onValue,
} from "firebase/database";

import { database } from "../firebase";

const photos = ref<string[]>([]);

// Convert Blob URL to Base64
const convertToBase64 = async (blobUrl: string): Promise<string> => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result as string);
    };

    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
};

// Save photo to Firebase Realtime Database
const addPhoto = async (photo: string) => {
  try {
    console.log("Converting photo to Base64...");

    const base64Image = await convertToBase64(photo);

    console.log("Base64 conversion successful");

    const photosRef = firebaseRef(database, "photos");

    await push(photosRef, {
      imageUrl: base64Image,
      createdAt: Date.now(),
    });

    console.log("Photo saved to Firebase!");
  } catch (error) {
    console.error("Failed to save photo:", error);
  }
};

// Load photos from Firebase
onMounted(() => {
  const photosRef = firebaseRef(database, "photos");

  onValue(photosRef, (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      photos.value = [];
      return;
    }

    photos.value = Object.values(data)
      .sort(
        (a: any, b: any) =>
          b.createdAt - a.createdAt
      )
      .map((photo: any) => photo.imageUrl);

    console.log("Photos loaded from Firebase!");
  });
});
</script>