import { Action } from '../actions';
import {Cell} from '../cell'

interface CellsState{
 loading:boolean;
 error:string|null,
 order:string[],
 data:{
  [key:string]:Cell
 }
}
const intialState: CellsState={
 loading: false,
 error:null,
 order:[],
 data:{}
}

const reducer  = (state:CellsState=intialState,action:Action)=>{
 
 return state;
}

export default reducer;