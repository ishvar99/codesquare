import { Types } from '../action-types';
import { Action } from '../actions';
import {Cell} from '../cell'
import produce from 'immer'
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

const reducer  = produce((state:CellsState=intialState,action:Action):CellsState|void=>{
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
   const {id,content}=action.payload
   state.data[id].content=content;
   return;
   // return {
   //  ...state,
   //  data:{
   //   ...state.data,
   //   [id]:{
   //    ...state.data[id],
   //    content:content
   //   }
   //  }
   // };
  }
  default:{
   return state;
  }
 }
})

export default reducer;