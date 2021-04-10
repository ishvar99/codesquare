import { Types } from '../action-types';
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

const reducer  = (state:CellsState=intialState,action:Action):CellsState=>{
 switch(action.type){
  case Types.MOVE_CELL:{
   return state;
  }
  case Types.INSERT_CELL_BEFORE:{
   return state;
  }
  case Types.DELETE_CELL:{
   return state;
  }
  case Types.UPDATE_CELL:{
   return state;
  }
  default:{
   return state;
  }
 }
}

export default reducer;