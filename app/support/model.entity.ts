
import {Input} from "angular2/core";
import {RouteParams} from "angular2/router";
import {ModelService} from "./model.service";


export class ModelEntity {

  @Input() modelData: any = {};

  modelList: any =[];

  protected routeParams: RouteParams;
  protected service: ModelService;

  constructor( routeParams: RouteParams, service: ModelService){
    this.routeParams = routeParams;
    this.service = service;
  }
  modelDataChanged(){
    console.log(this.modelData);
  }
  ngOnInit() {
    let id = this.routeParams.get('id');
    if(id){
      this.service.get(id).subscribe((json: any) => {
        this.modelData = json ;
        this.modelDataChanged();
      });
    }
  }

  list(){
    this.service.list().subscribe(json => {
      this.modelList = json.rows;
      this.logData(json);
    });
  }

  back(){
    window.history.back();
  }

  saveAnExit() {
    this.save();
    this.back();
  }

  save() {
    this.service.save(this.modelData).subscribe((json: any) => {
      this.modelData = json ;
      console.log(json);
    });
  }

  logData(data: any) {
    console.log(data);
  }
}
