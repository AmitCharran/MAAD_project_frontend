import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModelService } from '../../../services/model.service';
import { Make } from '../../../models/make';
import { Model } from '../../../models/model';

@Component({
  selector: 'app-create-vehicle-input-model',
  template: `
  <h3>Find your vehicle's model below:</h3>

  <div>
      <form #modelForm="ngForm">
        <div *ngFor="let model of filteredModels">
          <input type="radio" 
            id="{{model.name}}" 
            [value]="selectedModel" 
            name="selectedModel" 
            required 
            (click)="selectedModel = model">
          <label class="select-model-label" for="{{model.name}}"> {{model?.name}}</label>
          </div>
      </form>
      <button (click)="selectModel()">Confirm</button>
  </div>`,
  styleUrls: ['./create-vehicle-input-model.component.css']
})
export class CreateVehicleInputModelComponent implements OnInit {
  foundModel?: Model;
  @Input() make!: Make;
  @Output() modelEmitter = new EventEmitter<Model>();
  selectedModel?: Model;
  failedToFind: boolean = false;
  models: Model[] = [];
  filteredModels: Model[] = [];

  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit(): void {
    this.modelService.getModels()
    .subscribe(models => { 
      this.models = models;
      this.filterModels();
    });
  }

  private filterModels(): void {
    for (let model of this.models) {
      if (model.make.make_id === this.make.make_id) {
        this.filteredModels.push(model);
      }
    }
  }

  selectModel(): void {
    console.log(this.selectedModel);
    this.foundModel = this.selectedModel;
    if (this.foundModel) {
      this.failedToFind = false;
      this.returnModel(this.foundModel);
    } else {
      this.failedToFind = true;
    }
  }

  returnModel(value: Model) {
    console.log(`Emitted: ${this.foundModel?.name}`);
    this.modelEmitter.emit(value);
  }
}
