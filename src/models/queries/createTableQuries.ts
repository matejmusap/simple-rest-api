export const createUsersTable = `
                          CREATE TABLE "public"."users" (
                              "id" character varying(20) NOT NULL,
                              "username" character varying(255) NOT NULL,
                              "email" character varying(255) NOT NULL,
                              "password" character varying(255) NOT NULL,
                              "admin" boolean DEFAULT false,
                              "blocked" boolean DEFAULT false,
                              CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
                              CONSTRAINT "users_id_key" UNIQUE ("id"),
                              CONSTRAINT "users_username_key" UNIQUE ("username"),
                              CONSTRAINT "users_email_key" UNIQUE ("email")
                          ) WITH (oids = false);`;

export const createPostsTable = `
                        CREATE SEQUENCE "posts_id_seq" INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

                        CREATE TABLE "public"."posts" (
                          "id" integer DEFAULT nextval('"posts_id_seq"') NOT NULL,
                          "userId" character varying(20) NOT NULL,
                          "title" character varying(255) NOT NULL,
                          "content" character varying(255) NOT NULL,
                          "createdTime" character varying(255) NOT NULL,
                          CONSTRAINT "posts_pkey" PRIMARY KEY ("id"),
                          CONSTRAINT "posts_id_key" UNIQUE ("id"),
                          CONSTRAINT "posts_title_key" UNIQUE ("title"),
                          CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE NOT DEFERRABLE
                        ) WITH (oids = false);`;

export const createCommentsTable = `
                          CREATE SEQUENCE "comments_id_seq" INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;
  
                          CREATE TABLE "public"."comments" (
                            "id" integer DEFAULT nextval('"comments_id_seq"') NOT NULL,
                            "content" character varying(255) NOT NULL,
                            "userId" character varying(255) NOT NULL,
                            "postId" integer NOT NULL,
                            "createOrEditTime" character varying(255) NOT NULL,
                            CONSTRAINT "comments_pkey" PRIMARY KEY ("id"),
                            CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE NOT DEFERRABLE,
                            CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES posts(id) ON UPDATE CASCADE NOT DEFERRABLE
                          ) WITH (oids = false);`;

export const createPostHistoryTable = `
                          CREATE SEQUENCE "postHistory_id_seq" INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;
  
                          CREATE TABLE "public"."postHistory" (
                            "id" integer DEFAULT nextval('"postHistory_id_seq"') NOT NULL,
                            "userId" character varying(255) NOT NULL,
                            "postId" integer NOT NULL,
                            "lastEditTime" character varying(255) NOT NULL,
                            "oldContent" character varying(255) NOT NULL,
                            CONSTRAINT "postHistory_pkey" PRIMARY KEY ("id"),
                            CONSTRAINT "postHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE NOT DEFERRABLE,
                            CONSTRAINT "postHistory_postId_fkey" FOREIGN KEY ("postId") REFERENCES posts(id) ON UPDATE CASCADE NOT DEFERRABLE
                          ) WITH (oids = false);`;

export const createCollaboratorsTable = `
                        CREATE SEQUENCE "collaborators_id_seq" INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

                          CREATE TABLE "public"."collaborators" (
                            "id" integer DEFAULT nextval('"collaborators_id_seq"') NOT NULL,
                            "userId" character varying(20) NOT NULL,
                            "collaboratorId" character varying(20) NOT NULL,
                            CONSTRAINT "collaborators_pkey" PRIMARY KEY ("id"),
                            CONSTRAINT "collaborators_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE NOT DEFERRABLE,
                            CONSTRAINT "collaborators_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES users(id) ON UPDATE CASCADE NOT DEFERRABLE
                          ) WITH (oids = false);`;
