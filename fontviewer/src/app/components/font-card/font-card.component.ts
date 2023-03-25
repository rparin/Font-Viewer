import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { FontDbService } from "../../services/font-db/font-db.service";

@Component({
  selector: "app-font-card",
  templateUrl: "./font-card.component.html",
  styleUrls: ["./font-card.component.css"],
})
export class FontCardComponent implements OnChanges {
  @Input() fontClass: string;
  @Input() fontStyle: string;
  @Input() fontText: string = "Insert Text";
  @Input() singleView: boolean;
  @Input() favList: string[];
  @Output() clickFavEvent = new EventEmitter<string>();
  @Output() clickDelEvent = new EventEmitter<string>();
  fontName: string;
  clicked: boolean;

  constructor(private fontDbService: FontDbService) {}

  ngOnChanges() {
    this.fontName = this.getFontName();
    this.checkFaved();
  }

  checkFaved() {
    if (this.favList) {
      this.clicked = this.favList.includes(this.fontName);
    }
    return this.clicked;
  }

  getFontName(): string {
    if (this.fontClass) {
      return this.fontClass.replace("font-", "");
    }
    return "";
  }

  markFav() {
    if (this.clicked) {
      this.clicked = false;
      this.fontDbService.deleteFav(this.fontName).then(() => {
        this.clickDelEvent.emit(this.fontName);
      });
    } else {
      this.clicked = true;
      this.fontDbService.addFavFont(this.fontName).then(() => {
        this.clickFavEvent.emit(this.fontName);
      });
    }
  }
}
