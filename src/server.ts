import express from 'express';
import {db, PORT} from "./configurations/appConfig.ts";
import { bookRouter } from "./routers/bookRouter.ts";
import { errorHandler } from "./errorHandler/errorHandler.ts";
import mongoose from "mongoose";

export const initMongo = async () => {
  await mongoose.connect(db);
  console.log("MongoDB Connected");
};