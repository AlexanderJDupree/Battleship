import {Ship} from "./GameLogic";
import {DESTROYER_SIZE} from "./GameLogic";
import {DIR} from "./GameLogic";
import {GridCoor} from "./GameLogic";

let ship = new Ship(DESTROYER_SIZE, {x:1, y:12}, DIR.NORTH);

console.log(ship);
