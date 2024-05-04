"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessioncontroller_1 = __importDefault(require("./controllers/sessioncontroller"));
const apicontroller_1 = __importDefault(require("./controllers/apicontroller"));
//CONTROLLERS GAMES
const fortunetiger_1 = __importDefault(require("./controllers/fortune-tiger/fortunetiger"));
const fortuneox_1 = __importDefault(require("./controllers/fortune-ox/fortuneox"));
const fortunemouse_1 = __importDefault(require("./controllers/fortune-mouse/fortunemouse"));
const fortunedragon_1 = __importDefault(require("./controllers/fortune-dragon/fortunedragon"));
const fortunerabbit_1 = __importDefault(require("./controllers/fortune-rabbit/fortunerabbit"));
const bikiniparadise_1 = __importDefault(require("./controllers/bikini-paradise/bikiniparadise"));
const jungledelight_1 = __importDefault(require("./controllers/jungle-dlight/jungledelight"));
const doublefortune_1 = __importDefault(require("./controllers/double-fortune/doublefortune"));
const ganeshagold_1 = __importDefault(require("./controllers/ganesha-gold/ganeshagold"));
const dragontigerluck_1 = __importDefault(require("./controllers/dragon-tiger-luck/dragontigerluck"));
const routes = (0, express_1.Router)();
//CONTROLLER SESSION
routes.post("/web-api/game-proxy/v2/Resources/GetByResourcesTypeIds", sessioncontroller_1.default.resourcetypeids);
//API CONTROLLERS
routes.post("/api/v1/game_launch", apicontroller_1.default.launchgame);
routes.post("/api/v1/getagent", apicontroller_1.default.getagent);
routes.post("/api/v1/attagent", apicontroller_1.default.attagent);
//GAMES CONTROLLERS ROUTES
routes.post("/web-api/auth/session/v2/verifySession", sessioncontroller_1.default.verifySession);
//FORTUNE TIGER
routes.post("/game-api/fortune-tiger/v2/GameInfo/Get", fortunetiger_1.default.getiger);
routes.post("/game-api/fortune-tiger/v2/Spin", fortunetiger_1.default.spin);
//FORTUNE OX
routes.post("/game-api/fortune-ox/v2/GameInfo/Get", fortuneox_1.default.getox);
routes.post("/game-api/fortune-ox/v2/Spin", fortuneox_1.default.spin);
//FORTUNE MOUSE
routes.post("/game-api/fortune-mouse/v2/GameInfo/Get", fortunemouse_1.default.getmouse);
routes.post("/game-api/fortune-mouse/v2/Spin", fortunemouse_1.default.spin);
//FORTUNE DRAGON
routes.post("/game-api/fortune-dragon/v2/GameInfo/Get", fortunedragon_1.default.getdragon);
routes.post("/game-api/fortune-dragon/v2/Spin", fortunedragon_1.default.spin);
//FORTUNE RABBIT
routes.post("/game-api/fortune-rabbit/v2/GameInfo/Get", fortunerabbit_1.default.getrabbit);
routes.post("/game-api/fortune-rabbit/v2/Spin", fortunerabbit_1.default.spin);
//BIKINE PARADISE
routes.post("/game-api/bikine-paradise/v2/GameInfo/Get", bikiniparadise_1.default.getparadise);
routes.post("/game-api/bikine-paradise/v2/Spin", bikiniparadise_1.default.spin);
//JUNGLE DELIGHT
routes.post("/game-api/jungle-delight/v2/GameInfo/Get", jungledelight_1.default.getjungle);
routes.post("/game-api/jungle-delight/v2/Spin", jungledelight_1.default.spin);
//DOUBLE FORTUNE
routes.post("/game-api/double-fortune/v2/GameInfo/Get", doublefortune_1.default.getdouble);
routes.post("/game-api/double-fortune/v2/Spin", doublefortune_1.default.spin);
//GANESHA GOLD
routes.post("/game-api/ganesha-gold/v2/GameInfo/Get", ganeshagold_1.default.getganesha);
routes.post("/game-api/ganesha-gold/v2/Spin", ganeshagold_1.default.spin);
//DRAGON TIGER LUCKY
routes.post("/game-api/dragon-tiger-luck/v2/GameInfo/Get", dragontigerluck_1.default.getdragontiger);
routes.post("/game-api/dragon-tiger-luck/v2/Spin", dragontigerluck_1.default.spin);
// //BUTTERFLY BLOSSOM
// routes.post("/game-api/butterfly-blossom/v2/GameInfo/Get", butterflyBlossom.getbutterfly)
// routes.post("/game-api/butterfly-blossom/v2/Spin", butterflyBlossom.spin)
exports.default = routes;
