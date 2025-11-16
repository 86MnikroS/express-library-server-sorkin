import express from 'express';
import { PORT } from "./configurations/appConfig.ts";
import { bookRouter } from "./routers/bookRouter.ts";
import { errorHandler } from "./errorHandler/errorHandler.ts";
import mongoose from "mongoose";

export const initMongo = async () => {
  const db = 'mongodb+srv://sorkinmihail_db_user:2wQJ9mbrwTndXxnw@cluster0.0k2kaeu.mongodb.net/?appName=Cluster0';
  await mongoose.connect(db);
  console.log("MongoDB Connected");
};