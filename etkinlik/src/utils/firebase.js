import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getStorage, ref, deleteObject } from "firebase/storage";

export const adminLogin = async (username, password) => {
  try {
    const docRef = doc(db, "admin", "super");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.username === username && data.password === password) {
        return { success: true, message: "Giriş başarılı" };
      }
    }
    return { success: false, message: "Kullanıcı adı ya da şifre hatalı" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "Kullanıcı adı ya da şifre hatalı" };
  }
};

export const addActivity = async (form) => {
  try {
    const docRef = collection(db, "activities");
    await addDoc(docRef, {
      ...form,
      createdAt: new Date().toISOString(),
    });

    return { success: true, message: "Etkinlik eklendi" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "Etkinlik eklenemedi" };
  }
};

export const getAllActivities = async () => {
  const activities = [];
  try {
    const docRef = collection(db, "activities");
    const docSnap = await getDocs(docRef);

    docSnap.forEach((doc) => {
      activities.push({ ...doc.data(), id: doc.id });
    });

    activities.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return { success: true, activities };
  } catch (error) {
    console.log(error.message);
    return { success: false, activities };
  }
};

export const deleteActivity = async (id, image) => {
  try {
    const docRef = doc(db, "activities", id);

    if (image) {
      const storage = getStorage();
      const imageRef = ref(storage, image);
      await deleteObject(imageRef);
    }

    await deleteDoc(docRef);
    return { success: true, message: "Etkinlik silindi" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "Etkinlik silinemedi" };
  }
};

export const updateActivity = async (id, form) => {
  try {
    const docRef = doc(db, "activities", id);
    await setDoc(docRef, form, { merge: true });

    return { success: true, message: "Etkinlik güncellendi" };
  } catch (error) {
    console.log(error.message);
    return { success: false, message: "Etkinlik güncellenemedi" };
  }
};
