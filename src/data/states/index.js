import andhraPradesh from "./andhraPradesh.js";
import arunachalPradesh from "./arunachalPradesh.js";
import assam from "./assam.js";
import bihar from "./bihar.js";
import maharashtra from "./maharashtra.js";
import karnataka from "./karnataka.js";
import odisha from "./odisha.js";
import rajasthan from "./rajasthan.js";
import tamilNadu from "./tamilNadu.js";
import gujarat from "./gujarat.js";

export const states = [
  andhraPradesh,
  arunachalPradesh,
  assam,
  bihar,
  maharashtra,
  karnataka,
  odisha,
  rajasthan,
  tamilNadu,
  gujarat
];

export const stateMap = Object.fromEntries(
  states.map((state) => [state.id, state])
);

export default states;