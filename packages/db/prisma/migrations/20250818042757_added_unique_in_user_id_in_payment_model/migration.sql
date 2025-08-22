/*
  Warnings:

  - A unique constraint covering the columns `[User_Id]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payments_User_Id_key" ON "Payments"("User_Id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_id_key" ON "UserInfo"("id");
