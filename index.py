#
#    Place the contents of the SMP inventory config file (inventory.yml) into /inventory.yml.
#    After running the code, a new file named inventory-new.yml will show up, containing all player's inventories converted to 1.19.3 item IDs.
#

import json
import math
from yaml import load, dump
from yaml import Loader, Dumper


ids = json.load(open("ids.json"))
invf = open("inventory.yml")
inv = load(invf.read(), Loader=Loader)
invf.close()
f = open("inventory-new.yml",'a+')

def convert(inv, a, uuid):
    if not inv: 
        return ""
    pinv = inv.split("†")
    rinv = ""
    rinv2 = ""
    for i in range(len(pinv) - 1):
        rinv = pinv[i].split("@")
        if(rinv[1]):
            rinv2 = rinv2 + "@w•" + rinv[1].split("•")[1] + "@m•" + str( ids["i" + rinv[2].split("•")[1] + "d"]  )+ "@".join(rinv[2:len(rinv)]) + "†"
    print("Converted data " + a + " of " + uuid + " (" + str(len(pinv) - 1) + " items)")
    return rinv2

for k in inv:
    d = inv[k]
    if(d):
        if(d["Survival"]):
            d["Survival"]["Inventory"] = "4†e†" + convert(( d["Survival"]["Inventory"].split("4†e†")[1]), "Inventory", k )
            d["Survival"]["Armor"] = "4†e†" + convert(( d["Survival"]["Armor"].split("4†e†")[1]), "Armor", k )
            if(d["Survival"]["EnderChest"]):
                d["Survival"]["EnderChest"] = "3†e†" + convert(( d["Survival"]["EnderChest"].split("3†e†")[1]), "EnderChest", k )
        else:
            print("Skipping " + k)
    else:
        print("Skipping " + k)

f.write(dump(inv))
f.close()
print("Converted data of " + str(len(inv)) + " players.")
