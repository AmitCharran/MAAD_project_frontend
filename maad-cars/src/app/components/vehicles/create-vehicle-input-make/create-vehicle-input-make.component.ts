import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MakeService } from '../../../services/make.service';
import { Make } from '../../../models/make';

@Component({
  selector: 'app-create-vehicle-input-make',
  template: `<div>
                  <h3>Search for Make:</h3>
                  <input id="makeName" type="text" [(ngModel)]="inputMake.name">
                  <button (click)="findMake()">Search</button>
                  <aside *ngIf="failedToFind===true">No make of that name was found!</aside>
                </div>
  `,
  styleUrls: ['./create-vehicle-input-make.component.css']
})
export class CreateVehicleInputMakeComponent implements OnInit {
  foundMake?: Make;
  @Output() makeEmitter = new EventEmitter<Make>();
  inputMake: Make = {
    make_id : 0,
    name : ""
  };
  failedToFind: boolean = false;
  makes: Make[] = [];

  constructor(
    private makeService: MakeService
  ) { }

  ngOnInit(): void {
     this.makeService.getMakes()
      .subscribe((makes) => this.makes = makes);

  }

  async findMake(): Promise<void> {
    await this.ngOnInit();
    if (this.inputMake.name) {
      this.foundMake = this.makes.find((make: Make) => {
        return make?.name?.toLowerCase() === this.inputMake?.name?.toLowerCase();
      });
    }
    if (!this.foundMake) {
      this.failedToFind = true;
    } else {
      this.failedToFind = false;
      console.log(this.foundMake);
      this.returnMake(this.foundMake);
    }
  }

  returnMake(value: Make) {
    console.log(`Emitted: ${this.foundMake}`);
    this.makeEmitter.emit(value);
  }
}
