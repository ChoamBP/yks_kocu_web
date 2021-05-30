import { DersModel } from "./dersModel";

export interface DerslerModel{
    _id:string;
    ayt:DersModel[];
    tyt:DersModel[];
}