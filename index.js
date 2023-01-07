/*
    Place the contents of the SMP inventory config file (inventory.yml) into /inventory.yml.
    After running the code, a new file named inventory-new.yml will show up, containing all player's inventories converted to 1.19.3 item IDs.
*/

const fs = require("fs")
const ids = require("./ids.json")
let inv = fs.readFileSync(__dirname + "/inventory.yml", {encoding:'utf8', flag:'r'})
inv = inv.split("\n")
for(let a = 0; a < inv.length; a+=17) {
    if(inv[i+1].includes("Survival:")) {
        pinv = inv[a+3].split("Inventory: 4†e†")[1] //player inv
        einv = inv[a+7].split("EnderChest: 3†e†")[1] //echest
        ainv = inv[a+4].split("Armor: 4†e†")[1] //armor
        pinv = pinv.split("†")
        pinv2 = ""
        /*
        goes to all item ids and converts from a 1.19.2 id to a 1.19.3 id (check /files/[version]/X_X.yml)
        */
        for(let i = 0; i < pinv.length; i++) {
            pinva = pinv[i].split("@")
            if(pinva[1]) {
                pinv2 = pinv2 + "@w•" + pinva[1].split("•")[1] + "@m•" + ids["i" + pinva[2].split("•")[1] + "d"] + pinva.slice(0, 2).join("@") + "†"
            }
        }
        console.log("Converted inventory of " +inv[a] + " (" + (pinv.length - 1) + " items)")
        einv = einv.split("†")
        einv2 = ""
        for(let i = 0; i < einv.length; i++) {
            einva = einv[i].split("@")
            if(einva[1]) {
                einv2 = einv2 + "@w•" + einva[1].split("•")[1] + "@m•" + ids["i" + einva[2].split("•")[1] + "d"] + einva.slice(0, 2).join("@") + "†"
            }
        }
        console.log("Converted echest inventory of " +inv[a] + " (" + (einv.length - 1) + " items)") + "†"
        ainv = ainv.split("†")
        ainv2 = ""
        for(let i = 0; i < ainv.length; i++) {
            ainva = ainv[i].split("@")
            if(ainva[1]) {
                ainv2 = ainv2 + "@w•" + ainva[1].split("•")[1] + "@m•" + ids["i" + ainva[2].split("•")[1] + "d"] + ainva.slice(0, 2).join("@") + "†"
            }
        }
        console.log("Converted armor inventory of " +inv[a] + " (" + (ainv.length - 1) + " items)")
        inv[a+3] = inv[a+3].replaceAll(pinv.join("†"), pinv2)
        inv[a+4] = inv[a+4].replaceAll(ainv.join("†"), ainv2)
        inv[a+7] = inv[a+7].replaceAll(einv.join("†"), einv2)
        console.log("Saved new inventories of " + inv[a])
        console.log("==========================")
    } else {
        if(inv[i+16]) console.log("Failed to convert inventory of: " + inv[a])
    }
}
fs.writeFileSync(__dirname + "/inventory-new.yml", inv.join("\n"))
console.log("Converted data of " + Math.round(inv.length/17) + " players.")
