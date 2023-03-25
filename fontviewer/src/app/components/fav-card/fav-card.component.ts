import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FontDbService } from "../../services/font-db/font-db.service";

@Component({
  selector: "app-fav-card",
  templateUrl: "./fav-card.component.html",
  styleUrls: ["./fav-card.component.css"],
})
export class FavCardComponent {
  @Input() fontName: string;
  @Input() lastItem: boolean;
  @Output() clickDelEvent = new EventEmitter<string>();

  constructor(private fontDbService: FontDbService) {}

  delFav() {
    this.fontDbService.deleteFav(this.fontName).then(() => {
      this.clickDelEvent.emit(this.fontName);
    });
  }
}
