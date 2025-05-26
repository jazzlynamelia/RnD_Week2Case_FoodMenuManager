import fs from "fs";
let menus = JSON.parse(fs.readFileSync("./menus.json", "utf-8"));

export default class MenuController {
    static getAllMenus(req, res){
        return res.json(menus);
    }
    
    static createMenu(req, res){
        const { name, description, price, type } = req.body;

        if(!name || !description || !price || !type){
            return res.status(400).json({ error: "Semua field wajib diisi!" });
        }

        const validTypes = ["Lunch Set", "Drink", "Dessert"];
        if(!validTypes.includes(type)){
            return res.status(400).json({ error:"Menu type tidak valid!" });
        }

        const newId = menus.length ? menus[menus.length - 1].id + 1 : 1;
        const newMenu = { id: newId, name, description, price, type };
        menus.push(newMenu);
    
        fs.writeFile("./menus.json", JSON.stringify(menus, null, 2), (err) => {
            if(err) return res.status(500).json(err);
            return res.json({ message: "Menu berhasil ditambahkan!", data: newMenu });
        })
    }

    static updateMenu(req, res){
        const id = Number(req.params.id);
        const index = menus.findIndex(menu => menu.id === id);

        if(index === -1) return res.status(404).json({ error: "Menu tidak ditemukan!" });

        const {name, description, price, type } = req.body;

        if(!name || !description || !price || !type){
            return res.status(400).json({ error: "Semua field wajib diisi!" });
        }

        const validTypes = ["Lunch Set", "Drink", "Dessert"];
        if(!validTypes.includes(type)){
            return res.status(400).json({ error:"Menu type tidak valid!" });
        }

        menus[index] = { id, name, description, price, type };
    
        fs.writeFile("./menus.json", JSON.stringify(menus, null, 2), (err) => {
            if(err) return res.status(500).json(err);
            return res.json({ message: "Menu berhasil diupdate!", data: menus[index] });
        })
    }

    static deleteMenu(req, res){
        const id = Number(req.params.id);
        const index = menus.findIndex(menu => menu.id === id);

        if(index === -1) return res.status(404).json({ error: "Menu tidak ditemukan!" });

        const deleted = menus.splice(index, 1)[0];
    
        fs.writeFile("./menus.json", JSON.stringify(menus, null, 2), (err) => {
            if(err) return res.status(500).json(err);
            return res.json({ message: `Menu '${deleted.name}' berhasil dihapus` });
        })
    }
}