// id            String  @id @default(uuid())
// lendStartTime BigInt  @db.UnsignedBigInt
// lendEndTime   BigInt  @db.UnsignedBigInt
// desription    String? @db.Text
// returnTime    BigInt  @default(0) @db.UnsignedBigInt
// roomName      String? @db.VarChar(255)
// item          Item    @relation(fields: [itemId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// itemId        String
// student       Student @relation(fields: [studentId], references: [id], onDelete: Cascade, onUpdate: Cascade)
// studentId     String

export interface IPostLentItemPayload {
  readonly lendStartTime: number;
  readonly lendEndTime: number;
  readonly description?: string;
  readonly roomName?: string;
  readonly itemId: string;
  readonly studentId: string;
}
