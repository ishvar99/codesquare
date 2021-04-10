import { Types } from '../action-types'
import {MoveCellAction,UpdateCellAction,DeleteCellAction,InsertCellBeforeAction} from '../actions'
import {CellTypes, Direction} from '../cell'
export const moveCell = (id:string,direction:Direction):MoveCellAction=>{
 return {
  type:Types.MOVE_CELL,
 payload: {
  id,
  direction
  }
 }
}
export const updateCell = (id:string, content:string):UpdateCellAction=>{
return {
 type:Types.UPDATE_CELL,
 payload: {
  id,
  content
  }
}
}
export const insertCellBefore=(id:string, type:CellTypes):InsertCellBeforeAction=>{
 return { 
  type:Types.INSERT_CELL_BEFORE,
 payload: {
  id,
  type
  }
 }
}
export const deleteCell  = (id:string):DeleteCellAction=>{
 return {
  type:Types.DELETE_CELL,
 payload:id
 }
}