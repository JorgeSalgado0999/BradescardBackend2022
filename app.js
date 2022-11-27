import express from "express";

import {Agent} from "./models/Agent.js";
import {Partner} from "./models/Partner.js";
import {Store} from "./models/Store.js";
import {Review} from "./models/Review.js";

import partnersRoutes from "./routes/partners.routes.js";
import storesRoutes from "./routes/stores.routes.js";

const app = express();

//middlewares
app.use(express.json());

await Agent.sync();
await Partner.sync();
await Store.sync();
await Review.sync();

app.use(partnersRoutes);
app.use(storesRoutes);

export default app;
