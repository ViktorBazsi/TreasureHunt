-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Treasure" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "hint" TEXT,
    "answer" TEXT,
    "correctAns" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Treasure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserTreasureProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "treasureId" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserTreasureProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gift" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserTreasureProgress_userId_treasureId_key" ON "public"."UserTreasureProgress"("userId", "treasureId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "public"."Company"("email");

-- AddForeignKey
ALTER TABLE "public"."Treasure" ADD CONSTRAINT "Treasure_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserTreasureProgress" ADD CONSTRAINT "UserTreasureProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserTreasureProgress" ADD CONSTRAINT "UserTreasureProgress_treasureId_fkey" FOREIGN KEY ("treasureId") REFERENCES "public"."Treasure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
