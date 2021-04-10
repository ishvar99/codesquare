import {Types} from '../action-types'
import {CellTypes} from '../cell';
interface MoveCellAction{
 type:Types.MOVE_CELL,
 payload: {
  id: string,
  direction: 'up'|'down'
 }
}
interface DeleteCellAction{
 type:Types.DELETE_CELL,
 payload:string
}
interface InsertCellBeforeAction{
 type:Types.INSERT_CELL_BEFORE,
 payload:{
  id:string,
  type:CellTypes
 }
}
interface UpdateCellAction{ 
 type:Types.UPDATE_CELL,
 payload:{
  id:string,
  content: string
 }
}
export type Action =MoveCellAction|DeleteCellAction|InsertCellBeforeAction|UpdateCellAction