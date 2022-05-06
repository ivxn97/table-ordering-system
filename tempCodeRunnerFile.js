db.run(sql,["NEWCODE2022", "20"], (err) => {
        if (err) return console.error(err.message);
        
        console.log("A new menu item has been added");
})