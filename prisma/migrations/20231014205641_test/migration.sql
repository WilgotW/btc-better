-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(80),
    "email" VARCHAR(80),
    "password" VARCHAR(80),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
