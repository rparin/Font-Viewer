import { TestBed } from "@angular/core/testing";
import { FontDbService } from "../font-db.service";

describe("FontDbService", () => {
  let service: FontDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontDbService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
