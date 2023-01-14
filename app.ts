import express, {json} from "express";
import dotenv from "dotenv";
import router from "./routes/routes";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(json());
app.use(router);

app.listen(PORT,() => {
	console.log("Server is now running on port", PORT);  
});