import {Ship} from "./GameLogic";
import {SHIP} from "./GameLogic";
import {DIR} from "./GameLogic";
import {GridCoor} from "./GameLogic";

let ship = new Ship(SHIP.DESTROYER, {x:1, y:12}, DIR.NORTH);

console.log(ship);
