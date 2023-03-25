import { Component, OnInit } from "@angular/core";
import { PredictionEvent } from "../prediction-event";
import { FontDbService } from "../services/font-db/font-db.service";
import { ElementRef, ViewChild, HostListener } from "@angular/core";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  @ViewChild("canvas", { static: true }) myCanvas!: ElementRef;
  gesture: string = "None";
  fontFile: string = "../../assets/fonts.csv";
  fontList: string[];
  favList: string[];
  fontSelected: string;
  fontSize: number = 80;
  fontWeight: string = "normal";
  fontStyle: string = "normal";
  fontIndex: number = 0;
  fontText: string = "Font Text";
  fontGalleryToggle: boolean = false;
  fontViewText: string;
  galleryItemsAmt: number;
  favItemsAmt: number;
  screenWidth: number;
  screenHeight: number;
  webcamOn: boolean = false;
  underline: boolean = false;
  strike: boolean = false;

  constructor(private fontDbService: FontDbService) {
    this.getfonts();
    this.getFav();
  }

  ngOnInit(): void {
    this.toggleFontView();
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext("2d");
    if (context) {
      this.#setCanvasSize(context);
      this.#drawLetters(context);
    }

    this.dragElement(document.getElementById("dragWindow"));
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext("2d");
    if (context) {
      this.#setCanvasSize(context);
      this.#drawLetters(context);
    }
  }

  #drawLetters(ctx: CanvasRenderingContext2D) {
    let textSet = "abcdefghijklmnopqrstuvwxyz";
    this.#drawLayer(ctx, "0.5", "15", 10, 40, textSet);
    this.#drawLayer(ctx, "0.1", "30", 10, 30, textSet);
    this.#drawLayer(ctx, "0.5", "45", 10, 40, textSet);

    // ctx.fillStyle = "white";
    // ctx.font = "40px Courier";
    // ctx.fillText("h", 10, 40);
  }

  #setCanvasSize(ctx: CanvasRenderingContext2D) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  #drawLayer(
    ctx: CanvasRenderingContext2D,
    alpha: string,
    fSize: string,
    xMin: number,
    yMin: number,
    textSet: string
  ) {
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
      ctx.font = fSize + "px Courier";
      ctx.fillText(
        textSet[this.randInt(0, textSet.length - 1)],
        this.randInt(xMin, this.screenWidth - xMin - 20),
        this.randInt(yMin, this.screenHeight - yMin)
      );
    }
  }

  pxToRem(pxValue: number) {
    return pxValue / 16.0;
  }

  randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private getfonts() {
    this.fontDbService.getFontList().then((data) => {
      this.fontList = data;
    });
  }

  getFav() {
    this.fontDbService.getFavList().then((data) => {
      this.favList = data;
    });
  }

  addFavFont(newFavFont: string) {
    if (!this.favList.includes(newFavFont)) this.favList.push(newFavFont);
  }

  delFavFont(oldFavFont: string) {
    const index = this.favList.indexOf(oldFavFont);
    if (index > -1) {
      this.favList.splice(index, 1);
    }
  }

  toggleFontView() {
    this.fontGalleryToggle = !this.fontGalleryToggle;
    if (this.fontGalleryToggle) {
      this.fontViewText = "Triple";
      this.galleryItemsAmt = 3;
    } else {
      this.fontViewText = "Single";
      this.galleryItemsAmt = 1;
    }
  }

  getFontName(): string {
    if (this.fontSelected) {
      return this.fontSelected.replace("font-", "");
    }
    return "";
  }

  prediction(event: PredictionEvent) {
    this.gesture = event.getPrediction();
    this.processHand();
  }

  processHand() {
    switch (this.gesture) {
      // next / prev page
      case "Open Hand":
        this.nextFont();
        break;
      case "Closed Hand":
        this.prevFont();
        break;

      // font inc / dec
      case "Hand Pointing":
        this.increaseFont(1);
        break;
      case "Two Hands Pointing":
        this.increaseFont(5);
        break;
      case "Hand Pinching":
        this.decreaseFont(1);
        break;
      case "Two Hands Pinching":
        this.decreaseFont(5);
        break;

      // bold / italics
      case "Two Closed Hands":
        this.boldFont();
        break;
      case "Two Open Hands":
        this.italicizeFont();
        break;

      // underline / strike
      case "One Open Hand & One Closed Hand":
        this.underlineFont();
        break;
      case "One Open Hand & One Pointing Hand":
        this.strikeFont();
        break;

      default:
        // do nothing
        break;
    }
  }

  increaseFont(i: number) {
    if (this.fontSize + i <= 192) {
      this.fontSize += i;
    }
  }

  decreaseFont(i: number) {
    if (this.fontSize - i >= 10) {
      this.fontSize -= i;
    }
  }

  boldFont() {
    if (this.fontWeight == "normal") {
      this.fontWeight = "bold";
    } else {
      this.fontWeight = "normal";
    }
  }

  italicizeFont() {
    if (this.fontStyle == "normal") {
      this.fontStyle = "italic";
    } else {
      this.fontStyle = "normal";
    }
  }

  underlineFont() {
    this.underline = !this.underline;
  }

  strikeFont() {
    this.strike = !this.strike;
  }

  getFontStyle() {
    let textDeco = "";
    if (this.underline) {
      textDeco += " underline"
    }
    if (this.strike) {
      textDeco += " line-through";
    }

    if (textDeco != "") {
      textDeco = "text-decoration:" + textDeco + ";";
    }

    return (
      "font-size:" +
      this.pxToRem(this.fontSize) +
      "rem;" +
      "font-style:" +
      this.fontStyle +
      ";" +
      "font-weight:" +
      this.fontWeight +
      ";" +
      textDeco
    );
  }

  incFontIndex() {
    if (this.fontGalleryToggle) this.fontIndex += 3;
    else this.fontIndex += 1;
  }

  decFontIndex() {
    if (this.fontGalleryToggle) this.fontIndex -= 3;
    else this.fontIndex -= 1;
  }

  nextFont() {
    this.incFontIndex();
    if (this.fontIndex > this.fontList.length - 1) this.fontIndex = 0;
    this.fontSelected = this.fontList[this.fontIndex];
  }

  prevFont() {
    this.decFontIndex();
    if (this.fontIndex < 0) {
      this.fontIndex = this.fontList.length - 1;
      if (this.fontGalleryToggle) this.fontIndex -= 1;
    }
    this.fontSelected = this.fontList[this.fontIndex];
  }

  getFont(index: number): string {
    if (this.fontList) {
      let givenIndex: number = index;
      if (givenIndex > this.fontList.length - 1) givenIndex = 0;
      return this.fontList[givenIndex];
    } else return "";
  }

  toggleWebcam() {
    const mydiv = document.getElementById("dragWindow");

    if (mydiv != null) {
      if (this.webcamOn == true) {
        mydiv.style.visibility = "hidden";
        mydiv.style.opacity == "0";
        this.webcamOn = false;
      }
      else {
        mydiv.style.visibility = "visible";
        mydiv.style.opacity = "1";
        this.webcamOn = true;
      }
    }
  }

  showInfo() {
    const hiddenInfo = document.getElementById("hidden-info");

    if (hiddenInfo != null) {
      if (hiddenInfo.style.height == "300px") hiddenInfo.style.height = "0";
      else hiddenInfo.style.height = "300px";

      if (hiddenInfo.style.opacity == "1") hiddenInfo.style.opacity = "0";
      else hiddenInfo.style.opacity = "1";
    }
  }



  // DRAGGABLE WINDOW STUFF
  dragElement(elmnt: HTMLElement | null) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt != null && document.getElementById(elmnt.id + "Header")) {
      /* if present, the header is where you move the DIV from:*/
      const elmntDoc = document.getElementById(elmnt.id + "Header");
      if (elmntDoc != null) elmntDoc.onmousedown = dragMouseDown;
    } else if (elmnt != null) {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: MouseEvent) {
      if (e != undefined) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    }

    function elementDrag(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      if (elmnt != null) {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}