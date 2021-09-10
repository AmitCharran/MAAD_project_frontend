import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MakeService } from '../../../services/make.service';
import { Make } from '../../../models/make';
import { Model } from 'src/app/models/model';
import { CachingService } from 'src/app/services/caching.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-create-vehicle-input-make',
  template: `
              <div>
                <h3>Search for Make:</h3>
                <input id="makeName" type="text" [(ngModel)]="inputMake.name">
                <button (click)="findMake()">Search</button>
                <aside *ngIf="failedToFind">No make of that name was found!</aside>
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
  apiMakes: Make[] = [];

  constructor(
    private makeService: MakeService,
    private cachingService: CachingService,
    private modelService: ModelService
  ) { }

  ngOnInit(): void {
  }

  async getMakesFromDatabase() {
    return this.makeService.getMakes()
    .toPromise();
  }

  async findMake(): Promise<void> {
    this.inputMake.name = this.inputMake.name.toUpperCase();
    this.makes = await this.getMakesFromDatabase();
    for (let make of this.makes) {
      if (make.name === this.inputMake.name) {
        this.foundMake = make;
        this.returnMake(this.foundMake);
        return;
      }
    }
    this.apiMakes = await this.getMakesFromApi();
    for (let make of this.apiMakes) {
      if (make.name === this.inputMake.name) {
        this.foundMake = await this.insertNewfoundMake(make);
        this.returnMake(this.foundMake);
        return;
      }
    }
  }

  async getMakesFromApi() {
    return this.cachingService.getApiAllMakes();
  }

  async insertNewfoundMake(make: Make) {
    var insertedMake = await this.makeService.addMake(make).toPromise();
    var newModels: Model[] = await this.cachingService.getApiAllModelsByMake(make.make_id, insertedMake);
    await this.modelService.addModels(newModels).toPromise();
    return insertedMake;
  }

  returnMake(value: Make) {
    console.log(`Emitted: ${this.foundMake}`);
    this.makeEmitter.emit(value);
  }
}
