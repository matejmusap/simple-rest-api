export const createUsersTable = `
                          CREATE TABLE "public"."users" (
                              "id" character varying(20) NOT NULL,
                              "username" character varying(255) NOT NULL,
                              "email" character varying(255) NOT NULL,
                              "password" character varying(255) NOT NULL,
                              "admin" boolean DEFAULT false,
                              "blocked" boolean DEFAULT false,
                              "createdAt" timestamptz NOT NULL,
                              "updatedAt" timestamptz NOT NULL,
                              "deletedAt" timestamptz,
                              CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
                              CONSTRAINT "users_id_key" UNIQUE ("id")
                          ) WITH (oids = false);`;

export const createPostsTable = `
                        CREATE SEQUENCE "posts_id_seq" INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

                        CREATE TABLE "public"."posts" (
                          "id" integer DEFAULT nextval('"posts_id_seq"') NOT NULL,
                          "userId" character varying(20) NOT NULL,
                          "title" character varying(255) NOT NULL,
                          "content" character varying(255) NOT NULL,
                          "createdTime" character varying(255) NOT NULL,
                          "collaboraters" TEXT [],
                          "history" jsonb,
                          "createdAt" timestamptz NOT NULL,
                          "updatedAt" timestamptz NOT NULL,
                          "deletedAt" timestamptz,
                          CONSTRAINT "posts_pkey" PRIMARY KEY ("id"),
                          CONSTRAINT "posts_id_key" UNIQUE ("id"),
                          CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE NOT DEFERRABLE
                        ) WITH (oids = false);`;

export const createCommentsTable = `
                          CREATE SEQUENCE "comments_id_seq" INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;
  
                          CREATE TABLE "public"."comments" (
                            "id" integer DEFAULT nextval('"comments_id_seq"') NOT NULL,
                            "content" character varying(255) NOT NULL,
                            "userId" character varying(255) NOT NULL,
                            "postId" integer NOT NULL,
                            "createdAt" timestamptz NOT NULL,
                            "updatedAt" timestamptz NOT NULL,
                            "deletedAt" timestamptz,
                            CONSTRAINT "comments_pkey" PRIMARY KEY ("id"),
                            CONSTRAINT "users_id_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE,
                            CONSTRAINT "posts_id_fkey" FOREIGN KEY ("postId") REFERENCES posts(id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE
                          ) WITH (oids = false);`;
