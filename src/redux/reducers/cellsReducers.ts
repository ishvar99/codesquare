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
   const {id, direction}=action.payload;
   const index  = state.order.findIndex((i)=>i===id)
   const targetIndex =direction==='up'?index-1:index+1;
   if(targetIndex<0 || targetIndex>state.order.length-1){
   return;
   }
   state.order[index]=state.order[targetIndex]
   state.order[targetIndex]=action.payload.id
   return;
  }
  case Types.INSERT_CELL_BEFORE:{
   return state;
  }
  case Types.DELETE_CELL:{
   const id=action.payload;
   delete state.data[id];
   state.order=state.order.filter((e)=>e!==id); // remove cell from order array
   return;
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