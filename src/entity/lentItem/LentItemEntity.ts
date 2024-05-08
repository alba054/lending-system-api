import { ItemEntity } from "../item/ItemEntity";
import { StudentEntity } from "../student/StudentEntity";

export class LentItemEntity {
  private _id?: string | undefined;
  private _lendStartTime!: number;
  private _lendEndTime!: number;
  private _description?: string | undefined;
  private _returnTime?: number | undefined;
  private _roomName?: string | undefined;
  private _itemId!: string;
  private _studentId!: string;
  private _student?: StudentEntity | undefined;
  private _item?: ItemEntity | undefined;

  constructor(
    lendStartTime: number,
    lendEndtime: number,
    itemId: string,
    studentId: string,
    args?: {
      id?: string;
      description?: string;
      returnTime?: number;
      roomName?: string;
      item?: ItemEntity;
      student?: StudentEntity;
    }
  ) {
    this.lendEndTime = lendEndtime;
    this.lendStartTime = lendStartTime;
    this.itemId = itemId;
    this.studentId = studentId;
    this.id = args?.id;
    this.description = args?.description;
    this.returnTime = args?.returnTime;
    this.roomName = args?.roomName;
    this.item = args?.item;
    this.student = args?.student;
  }

  public get item(): ItemEntity | undefined {
    return this._item;
  }
  public set item(value: ItemEntity | undefined) {
    this._item = value;
  }

  public get student(): StudentEntity | undefined {
    return this._student;
  }
  public set student(value: StudentEntity | undefined) {
    this._student = value;
  }

  public get studentId(): string {
    return this._studentId;
  }
  public set studentId(value: string) {
    this._studentId = value;
  }

  public get itemId(): string {
    return this._itemId;
  }
  public set itemId(value: string) {
    this._itemId = value;
  }

  public get roomName(): string | undefined {
    return this._roomName;
  }
  public set roomName(value: string | undefined) {
    this._roomName = value;
  }

  public get returnTime(): number | undefined {
    return this._returnTime;
  }
  public set returnTime(value: number | undefined) {
    this._returnTime = value;
  }

  public get description(): string | undefined {
    return this._description;
  }
  public set description(value: string | undefined) {
    this._description = value;
  }

  public get lendEndTime(): number {
    return this._lendEndTime;
  }
  public set lendEndTime(value: number) {
    this._lendEndTime = value;
  }

  public get lendStartTime(): number {
    return this._lendStartTime;
  }
  public set lendStartTime(value: number) {
    this._lendStartTime = value;
  }

  public get id(): string | undefined {
    return this._id;
  }
  public set id(value: string | undefined) {
    this._id = value;
  }
}
