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

const reducer  = produce((state:CellsState=intialState,action:Action):void=>{
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
   const {id}=action.payload;
   const cell: Cell ={
    content:'',
    type:action.payload.type,
    id: Math.random().toString(36).substr(2,5)
   }
   state.data[cell.id]=cell;
   const foundIndex = state.order.findIndex((i)=>i===id);
   if(foundIndex<0){
    state.order.push(cell.id);
   }
   else{
    state.order.splice(foundIndex,0,cell.id)
   }
   return;
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
 }
},intialState)

export default reducer;