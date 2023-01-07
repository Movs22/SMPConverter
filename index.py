#
#    Place the contents of the SMP inventory config file (inventory.yml) into /inventory.yml.
#    After running the code, a new file named inventory-new.yml will show up, containing all player's inventories converted to 1.19.3 item IDs.
#

import json
import math

ids = json.load(open("ids.json"))
invf = open("inventory.yml")
inv = invf.read()
invf.close()
invf = open("inventory-new.yml",'a+')
inv = inv.split("\n")
for i in range(math.floor(len(inv)/17)):
    if("Survival:" in inv[(i*17)+1]):
        pinv = inv[(i*17)+3].split("Inventory: 4†e†")[1] #player inv
        einv = inv[(i*17)+7].split("EnderChest: 3†e†")[1] #echest
        ainv = inv[(i*17)+4].split("Armor: 4†e†")[1] #armor
        pinv = pinv.split("†")
        pinv2 = ""

        #goes to all item ids and converts from a 1.19.2 id to a 1.19.3 id (check /files/[version]/X_X.yml)
        for b in range(len(pinv)):
            pinva = pinv[b].split("@")
            if(len(pinva) > 1):
                pinv2 = pinv2 + "@w•" +  str(pinva[1].split("•")[1]) + "@m•" + str(ids["i" + pinva[2].split("•")[1] + "d"]) + "@".join(pinva[2:len(pinva)]) + "†"
        print("Converted inventory of " + inv[(i*17)] + " (" + str(len(pinv) - 1) + " items)")
        einv = einv.split("†")
        einv2 = ""
        for a in range(len(einv)):
            einva = einv[a].split("@")
            if(len(einva) > 1):
                einv2 = einv2 + "@w•" + str(einva[1].split("•")[1]) + "@m•" + ids["i" + str(einva[2].split("•")[1]) + "d"] + "@".join(einva[2:len(einva)]) + "†"

        print("Converted echest inventory of " + inv[(i*17)] + " (" + str(len(einv) - 1) + " items)")
        ainv = ainv.split("†")
        ainv2 = ""
        for c in range(len(ainv)):
            ainva = ainv[c].split("@")
            if(len(ainva) > 1):
                ainv2 = ainv2 + "@w•" + str(ainva[1].split("•")[1]) + "@m•" + str(ids["i" + str(ainva[2].split("•")[1]) + "d"]) + "@".join(ainva[2:len(ainva)]) + "†"

        print("Converted armor inventory of " + inv[(i*17)] + " (" + str(len(ainv) - 1) + " items)")
        inv[(i*17)+3] = inv[(i*17)+3].replace("†".join(pinv), pinv2)
        inv[(i*17)+4] = inv[(i*17)+4].replace("†".join(ainv), ainv2)
        inv[(i*17)+7] = inv[(i*17)+7].replace("†".join(einv), einv2)
        print("Saved new inventories of " + inv[(i*17)])
        print("==========================")
    else:
        if(inv[i+16]):
            print("Failed to convert inventory of: " + inv[(i*17)])

invf.write("\n".join(inv))
invf.close()
print("Converted data of " + str(math.floor(len(inv)/17)) + " players.")