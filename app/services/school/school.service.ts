import { Injectable } from 'angular2/core';

import {Http} from 'angular2/http';
import {ModelService} from "../../support/model.service";
import {AppConfig} from "../../app.config";

@Injectable()
export class SchoolService extends ModelService {
    constructor( config: AppConfig,  http: Http) {
        super('rest/karateschool/school', config, http);
    }
}
