# SMP Converter
This repo was made to convert inventories from Arcoda's [SCSwap](https://github.com/Arcoda/SCSwap) from 1.19.2 to 1.19.3. You can check the [JSON file](/ids.json) containing all 1.19.2 ids (the key) and the 1.19.3 equivelent id (the key's value). Example:
> { "i100d" : 102 }

Overwrite the [inventory.yml](/inventory.yml) found in the root of this repo with the contents of your inventory.yml and run either the [python](/index.py) or [javascript](/index.js) file.

# Converting with Python
<b>Before running,</b> make sure you have [yaml](https://pyyaml.org/) installed. If so, run the python file and the converted file will show up in [inventory-new.yml](inventory-new.yml).

# Converting with Javascript
<b>Before running,</b> make sure that you have fs and js-yaml installed (use `npm install fs js-yaml` to install it).
After running index.js, the converted file will show up in [inventory-new.yml](inventory-new.yml).

# Extra information
When you run either of the files, you should get something like this:
> Converted inventory of [UUID]: (X items) <br />
> Converted echest inventory of [UUID]: (X items) <br />
> Converted armor inventory of [UUID]: (X items) <br />
> Saved new inventories of [UUID] <br />

And after it finishes converting, you should get
> Converted data of X players. <br />
