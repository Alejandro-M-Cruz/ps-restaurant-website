import QueryPromiseFactory from "./QueryPromiseFactory.js";

export default class MenuDAO {
    static setConnection(connection) {
        if (this.connection) return
        this.connection = connection
        this.queryPromiseFactory = new QueryPromiseFactory(connection)
    }

    static getAllMenuSections = () => this.queryPromiseFactory.create("SELECT * FROM menu_sections")

    static updateMenuSection = (id, menuSection) =>
        this.queryPromiseFactory.create("UPDATE menu_sections SET ? WHERE id = ?", [menuSection, id])

    static addMenuSection = menuSection => 
        this.queryPromiseFactory.create("INSERT INTO menu_sections SET ?", menuSection) 

    static deleteMenuSection = id => {
        this.deleteMenuItemsBySectionId(id)
        this.queryPromiseFactory.create("DELETE FROM menu_sections WHERE id = ?", [id])
    }

    static getAllMenuItems = () => this.queryPromiseFactory.create("SELECT * FROM menu_items")
    
    static getMenuItemsBySectionId = sectionId => 
        this.queryPromiseFactory.create("SELECT * FROM menu_items WHERE section_id = ?", [sectionId])

    static deleteMenuItemsBySectionId = sectionId =>
        this.queryPromiseFactory.create("DELETE FROM menu_items WHERE section_id = ?", [sectionId])
    
    static addMenuItem = menuItem => this.queryPromiseFactory.create("INSERT INTO menu_items SET ?", menuItem)

    static deleteMenuItem = id => this.queryPromiseFactory.create("DELETE FROM menu_items WHERE id = ?", [id])

    static updateMenuItem = (id, menuItem) => 
        this.queryPromiseFactory.create("UPDATE menu_items SET ? WHERE id = ?", [menuItem, id])
}