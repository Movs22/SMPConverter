/*
    Place the contents of the SMP inventory config file (inventory.yml) into /inventory.yml.
    After running the code, a new file named inventory-new.yml will show up, containing all player's inventories converted to 1.19.3 item IDs.
*/

const fs = require("fs")
const yaml = require('js-yaml');
const ids = require("./ids.json")
let inv = fs.readFileSync(__dirname + "/inventory.yml", {encoding:'utf8', flag:'r'})
let data = yaml.load(inv);

function convert(inv, i, uuid) {
    if(!inv) return ""
    pinv = inv.split("†")
    let rinv = ""
    let rinv2 = ""
    for(let i = 0; i < pinv.length; i++) {
        rinv = pinv[i].split("@")
        if(rinv[1]) {
            console.log(rinv)
            rinv2 = rinv2 + "@w•" + rinv[1].split("•")[1] + "@m•" + ids["i" + rinv[2].split("•")[1] + "d"] + (rinv.slice(2, rinv.length)).join("@") + "†"
        }
    }
    console.log("Converted data " + i + " of " + uuid + " (" + (pinv.length - 1) + " items)")
    return rinv2
}

Object.keys(data).forEach(function(k){
    let d = data[k]
    if(d) {
    if(d.Survival) {
        d.Survival.Inventory ? d.Survival.Inventory = "4†e†" + convert(( d.Survival.Inventory.split("4†e†")[1]), "Inventory", k ) : null
        d.Survival.Armor ? d.Survival.Armor = "4†e†" + convert(( d.Survival.Armor.split("4†e†")[1]), "Armor", k ) : null
        if(d.Survival.EnderChest) {
            d.Survival.EnderChest = "3†e†" + convert(( d.Survival.EnderChest.split("3†e†")[1]), "EnderChest", k )
        } 
    } else {
        console.log("Skipping " + k)
    }
} else {
    console.log("Skipping " + k)
}

});
fs.writeFileSync(__dirname + "/inventory-new.yml", yaml.dump(data, {lineWidth: -1}), 'utf8')
console.log("Converted data of " + Object.keys(data).length + " players.")
