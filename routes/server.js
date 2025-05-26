import express from "express";
import fs from "fs";
import MenuController from "../controllers/menuController.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/menus", MenuController.getAllMenus);
app.post("/menus", MenuController.createMenu);
app.put("/menus/:id", MenuController.updateMenu)
app.delete("/menus/:id", MenuController.deleteMenu)

app.listen(port, () => {
    console.log(`server lagi jalan di http://localhost:${port}`);
})