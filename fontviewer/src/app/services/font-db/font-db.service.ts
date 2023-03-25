import { Injectable } from "@angular/core";
import {
  Firestore,
  collectionData,
  collection,
  docData,
  doc,
  addDoc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "@angular/fire/firestore";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class FontDbService {
  constructor(private firestore: Firestore, private http: HttpClient) {}

  private readFontList() {
    return new Promise((resolve, reject) => {
      let fontCSV: string = "../../../assets/fonts.csv";

      this.http.get(fontCSV, { responseType: "text" }).subscribe((data) => {
        if (data) return resolve(data.split("\r\n"));
        else return reject("invalid data");
      });
    });
  }

  getFontData() {
    const fontDataRef = collection(this.firestore, "fontData");
    return collectionData(fontDataRef, { idField: "id" });
  }

  getFontDataById(id: string, idValue: boolean = false) {
    const fontDataRef = doc(this.firestore, `fontData/${id}`);
    if (idValue) return docData(fontDataRef, { idField: "id" });
    else return docData(fontDataRef);
  }

  getFonts() {
    return this.getFontDataById("fontList");
  }

  getFontFavs() {
    return this.getFontDataById("fontFavs");
  }

  async getFontList() {
    const fontDataRef = doc(this.firestore, "fontData", "fontList");
    let docSnap = await getDoc(fontDataRef);
    if (docSnap.exists()) return docSnap.data().fonts;
    else {
      let fontCSV: string = "../../../assets/fonts.csv";
      let fontList = await this.readFontList();

      this.http.get(fontCSV, { responseType: "text" }).subscribe((data) => {
        fontList = data.split("\r\n");
      });
      await setDoc(doc(this.firestore, "fontData", "fontList"), {
        fonts: fontList,
      });
      await setDoc(doc(this.firestore, "fontData", "fontFavs"), {
        fonts: [],
      });
      return fontList;
    }
  }

  async getFavList(): Promise<string[]> {
    const fontDataRef = doc(this.firestore, "fontData", "fontFavs");
    let docSnap = await getDoc(fontDataRef);
    if (docSnap.exists()) return docSnap.data().fonts;
    else return [];
  }

  async addFavFont(fontName: string) {
    const fontDataRef = doc(this.firestore, "fontData", "fontFavs");
    let docSnap = await getDoc(fontDataRef);
    if (docSnap.exists()) {
      let newFavs: string[] = docSnap.data().fonts;
      if (!newFavs.includes(fontName)) {
        newFavs.push(fontName);
        updateDoc(fontDataRef, {
          fonts: newFavs,
        });
      }
    }
  }

  async deleteFav(fontName: string) {
    const fontDataRef = doc(this.firestore, "fontData", "fontFavs");
    let docSnap = await getDoc(fontDataRef);
    if (docSnap.exists()) {
      let newFavs: string[] = docSnap.data().fonts;
      if (newFavs.includes(fontName)) {
        newFavs.splice(newFavs.indexOf(fontName), 1);
      }

      updateDoc(fontDataRef, {
        fonts: newFavs,
      });
    }
  }
}
