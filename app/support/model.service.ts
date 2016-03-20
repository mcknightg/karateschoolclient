import {Http, Response, URLSearchParams, ConnectionBackend } from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Inject} from "angular2/core";
import {AppConfig} from "../app.config";
import {Headers} from "angular2/http";


export class Criteria{
    field:string;
    operator:string;
    value:any;
    constructor(field:string, operator:string, value:any){
        this.field = field;
        this.operator = operator;
        this.value = value;
    }
    public static CriteriaFactory(field:string, operator:string, value:any){
        return new Criteria(field,operator,value);
    }
}

export class CwQuery{
    rows: number = 50;
    pageNumber: number = 1;
    sortOrder: string = 'ASC';
    sortIndex: string = 'id';
    totalPages: number = 0;
    totalRecords: number = 0;
    criteria:Criteria[] = [];

    public static Service(){
        return new CwQuery();
    }
    protected add(criteria:Criteria){
        this.criteria.push(criteria);
        return this;
    }
    limit(rows:number){
        this.rows = rows;
        return this;
    }
    descending(){
        this.sortOrder = 'DESC';
        return this;
    }
    ascending(){
        this.sortIndex = 'ASC';
        return this;
    }
    page(page:number){
        this.pageNumber = page;
        return this;
    }
    cn(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'cn', value));
    }

    icn(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'icn', value));
    }

    bw(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'bw', value));
    }
    or(){
        return this;
    }
    and(){
        return this;
    }
    ew(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'ew', value));
    }

    eq(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'eq', value));
    }

    ne(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'ne', value));
    }

    nc(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'nc', value));
    }

    en(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'en', value));
    }

    bn(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'bn', value));
    }

    gt(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'gt', value));
    }

    ge(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'ge', value));
    }

    lt(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'lt', value));
    }

    le(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'le', value));
    }

    isIn(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'in', value));
    }

    nn(field, value) {
        return this.add(Criteria.CriteriaFactory(field, 'nn', value));
    }
    searchParams() : URLSearchParams{
        let searchParms =  new URLSearchParams();
        searchParms.set('sord',this.sortOrder);
        searchParms.set('page',String(this.pageNumber));
        searchParms.set('rows',String(this.rows));
        searchParms.set('sidx',this.sortIndex);
        for(let critera of this.criteria){
            searchParms.append('searchField',critera.field);
            searchParms.append('searchOper',critera.operator);
            searchParms.append('searchString',critera.value);
        }

        return searchParms;
    }
}


export class ModelService {
    private config: AppConfig;
    private http: Http;

    private endpoint: string = "";
    constructor(endpoint: string,  config: AppConfig,  http: Http) {
        this.config = config;
        this.http = http;
        this.endpoint = endpoint;
    }

    find(qry:CwQuery){
        return this.search(qry.searchParams());
    }
    search(searchParams: URLSearchParams) {
        return this.http
            .get(this.config.base + this.endpoint, {search: searchParams})
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    list() {
        let url = this.config.base + this.endpoint + "?rows=50";
        console.log(url);
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    save(object: any) {
        let url = this.config.base + this.endpoint;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url,
            JSON.stringify(object),
            {headers: headers})
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    get(id: string) {
        let url = this.config.base + this.endpoint + "/" + id;
        return this.http
            .get(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    remove(id: string) {
        let url = this.config.base + this.endpoint + "/" + id;
        return this.http
            .delete(url)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.log(error);
        return Observable.create(observer => observer.complete());
    }

}
