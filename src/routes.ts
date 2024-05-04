import { Router } from "express"

import sessioncontroller from "./controllers/sessioncontroller"
import apicontroller from "./controllers/apicontroller"

//CONTROLLERS GAMES
import fortunetiger from "./controllers/fortune-tiger/fortunetiger"
import fortuneox from "./controllers/fortune-ox/fortuneox"
import fortunemouse from "./controllers/fortune-mouse/fortunemouse"
import fortunedragon from "./controllers/fortune-dragon/fortunedragon"
import fortunerabbit from "./controllers/fortune-rabbit/fortunerabbit"
import bikiniparadise from "./controllers/bikini-paradise/bikiniparadise"
import jungledelight from "./controllers/jungle-dlight/jungledelight"
import doublefortune from "./controllers/double-fortune/doublefortune"
import ganeshagold from "./controllers/ganesha-gold/ganeshagold"
import dragontigerluck from "./controllers/dragon-tiger-luck/dragontigerluck"

const routes = Router()

//CONTROLLER SESSION
routes.post("/web-api/game-proxy/v2/Resources/GetByResourcesTypeIds", sessioncontroller.resourcetypeids)

//API CONTROLLERS
routes.post("/api/v1/game_launch", apicontroller.launchgame)
routes.post("/api/v1/getagent", apicontroller.getagent)
routes.post("/api/v1/attagent", apicontroller.attagent)
//GAMES CONTROLLERS ROUTES
routes.post("/web-api/auth/session/v2/verifySession", sessioncontroller.verifySession)

//FORTUNE TIGER
routes.post("/game-api/fortune-tiger/v2/GameInfo/Get", fortunetiger.getiger)
routes.post("/game-api/fortune-tiger/v2/Spin", fortunetiger.spin)

//FORTUNE OX
routes.post("/game-api/fortune-ox/v2/GameInfo/Get", fortuneox.getox)
routes.post("/game-api/fortune-ox/v2/Spin", fortuneox.spin)

//FORTUNE MOUSE
routes.post("/game-api/fortune-mouse/v2/GameInfo/Get", fortunemouse.getmouse)
routes.post("/game-api/fortune-mouse/v2/Spin", fortunemouse.spin)

//FORTUNE DRAGON
routes.post("/game-api/fortune-dragon/v2/GameInfo/Get", fortunedragon.getdragon)
routes.post("/game-api/fortune-dragon/v2/Spin", fortunedragon.spin)

//FORTUNE RABBIT
routes.post("/game-api/fortune-rabbit/v2/GameInfo/Get", fortunerabbit.getrabbit)
routes.post("/game-api/fortune-rabbit/v2/Spin", fortunerabbit.spin)

//BIKINE PARADISE
routes.post("/game-api/bikine-paradise/v2/GameInfo/Get", bikiniparadise.getparadise)
routes.post("/game-api/bikine-paradise/v2/Spin", bikiniparadise.spin)

//JUNGLE DELIGHT
routes.post("/game-api/jungle-delight/v2/GameInfo/Get", jungledelight.getjungle)
routes.post("/game-api/jungle-delight/v2/Spin", jungledelight.spin)

//DOUBLE FORTUNE
routes.post("/game-api/double-fortune/v2/GameInfo/Get", doublefortune.getdouble)
routes.post("/game-api/double-fortune/v2/Spin", doublefortune.spin)

//GANESHA GOLD
routes.post("/game-api/ganesha-gold/v2/GameInfo/Get", ganeshagold.getganesha)
routes.post("/game-api/ganesha-gold/v2/Spin", ganeshagold.spin)

//DRAGON TIGER LUCKY
routes.post("/game-api/dragon-tiger-luck/v2/GameInfo/Get", dragontigerluck.getdragontiger)
routes.post("/game-api/dragon-tiger-luck/v2/Spin", dragontigerluck.spin)

// //BUTTERFLY BLOSSOM
// routes.post("/game-api/butterfly-blossom/v2/GameInfo/Get", butterflyBlossom.getbutterfly)
// routes.post("/game-api/butterfly-blossom/v2/Spin", butterflyBlossom.spin)
export default routes
