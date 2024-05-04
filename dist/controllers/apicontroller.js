"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../logger"));
require("dotenv/config");
const apifunctions_1 = __importDefault(require("../functions/apifunctions"));
const uuid_1 = require("uuid");
exports.default = {
    launchgame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agentToken = req.body.agentToken;
            const secretKey = req.body.secretKey;
            const user_code = req.body.user_code;
            const game_type = req.body.game_type;
            const provider_code = req.body.provider_code;
            const game_code = req.body.game_code;
            const user_balance = req.body.user_balance;
            try {
                if (!user_code) {
                    res.send({
                        status: "error",
                        message: "Voce precisa passar o user_code.",
                    });
                    return false;
                }
                if (isNaN(user_balance) === true) {
                    res.send({
                        status: "error",
                        message: "User Balance deve ser um numero.",
                    });
                    return false;
                }
                if ((yield apifunctions_1.default.getagentbyagentToken(agentToken)).length === 0) {
                    res.send({
                        status: "error",
                        message: "Agent Token não cadastrado.",
                    });
                    return false;
                }
                if ((yield apifunctions_1.default.getagentbysecretkey(secretKey)).length === 0) {
                    res.send({
                        status: "error",
                        message: "Secret Key não cadastrado.",
                    });
                    return false;
                }
                const agent = yield apifunctions_1.default.getagentbyagentToken(agentToken);
                const user = yield apifunctions_1.default.getuserbyagent(user_code, agent[0].id); //PUXA O USUARIO ATRAVES DO USER E AGENTID
                let codegame = 0;
                if (game_code === "fortune-tiger") {
                    codegame = 126;
                }
                else if (game_code === "fortune-ox") {
                    codegame = 98;
                }
                else if (game_code === "fortune-dragon") {
                    codegame = 1695365;
                }
                else if (game_code === "fortune-rabbit") {
                    codegame = 1543462;
                }
                else if (game_code === "fortune-mouse") {
                    codegame = 68;
                }
                else if (game_code === "bikini-paradise") {
                    codegame = 69;
                }
                else if (game_code === "jungle-delight") {
                    codegame = 40;
                }
                else if (game_code === "ganesha-gold") {
                    codegame = 42;
                }
                else if (game_code === "double-fortune") {
                    codegame = 48;
                }
                else if (game_code === "dragon-tiger-luck") {
                    codegame = 63;
                }
                else {
                    res.send({
                        status: "error",
                        message: "Esse game não existe.",
                    });
                    return false;
                }
                if (user.length === 0) {
                    const tokenuser = (0, uuid_1.v4)();
                    const atkuser = (0, uuid_1.v4)();
                    const createnewuser = yield apifunctions_1.default.createuser(user_code, tokenuser, atkuser, user_balance, agent[0].id);
                    if (createnewuser.affectedRows >= 1) {
                        const getnewuser = yield apifunctions_1.default.getuserbyagent(user_code, agent[0].id);
                        res.send({
                            status: 1,
                            msg: "SUCCESS",
                            launch_url: `https://brabobet.top/${codegame}/index.html?operator_token=Zm9saWFiZXQ=&btt=1&t=${getnewuser[0].token}&or=brabobet.top&api=brabobet.top`,
                            user_code: getnewuser[0].username,
                            user_balance: getnewuser[0].saldo,
                            user_created: true,
                            currency: "BRL",
                        });
                    }
                    else {
                        res.send({
                            status: "error",
                            message: "Erro ao cadastrar o usuario.",
                        });
                        return false;
                    }
                }
                else {
                    yield apifunctions_1.default.setbalanceuserbyid(user[0].id, user_balance);
                    res.send({
                        status: 1,
                        msg: "SUCCESS",
                        launch_url: `https://brabobet.top/${codegame}/index.html?operator_token=Zm9saWFiZXQ=&btt=1&t=${user[0].token}&or=brabobet.top&api=brabobet.top`,
                        user_code: user[0].username,
                        user_balance: user[0].saldo,
                        user_created: false,
                        currency: "BRL",
                    });
                }
            }
            catch (error) {
                logger_1.default.error(error);
            }
        });
    },
    callbackgame(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const agent = yield apifunctions_1.default.getagentbysecretkey(json.agent_secret);
            try {
                yield (0, axios_1.default)({
                    maxBodyLength: Infinity,
                    method: "POST",
                    url: `${agent[0].callbackurl}gold_api/game_callback`,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: json,
                })
                    .then((data) => {
                    console.log("NEW BALANCE" + data.data.user_balance);
                })
                    .catch((error) => {
                    console.log(error);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    getagent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agentToken = req.body.agentToken;
            const secretKey = req.body.secretKey;
            if ((yield apifunctions_1.default.getagentbyagentToken(agentToken)).length === 0) {
                res.send({
                    status: "error",
                    message: "Agent Token não cadastrado.",
                });
                return false;
            }
            if ((yield apifunctions_1.default.getagentbysecretkey(secretKey)).length === 0) {
                res.send({
                    status: "error",
                    message: "Secret Key não cadastrado.",
                });
                return false;
            }
            const agent = yield apifunctions_1.default.getagentbyagentToken(agentToken);
            agent[0].saldo = undefined;
            agent[0].agentToken = undefined;
            agent[0].saldo = undefined;
            res.send(agent[0]);
        });
    },
    attagent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const agentToken = req.body.agentToken;
            const secretKey = req.body.secretKey;
            const probganho = req.body.probganho;
            const probbonus = req.body.probbonus;
            const probganhortp = req.body.probganhortp;
            const probganhoinfluencer = req.body.probganhoinfluencer;
            const probbonusinfluencer = req.body.probbonusinfluencer;
            const probganhoaposta = req.body.probganhoaposta;
            const probganhosaldo = req.body.probganhosaldo;
            if ((yield apifunctions_1.default.getagentbyagentToken(agentToken)).length === 0) {
                res.send({
                    status: "error",
                    message: "Agent Token não cadastrado.",
                });
                return false;
            }
            if ((yield apifunctions_1.default.getagentbysecretkey(secretKey)).length === 0) {
                res.send({
                    status: "error",
                    message: "Secret Key não cadastrado.",
                });
                return false;
            }
            const agent = yield apifunctions_1.default.getagentbyagentToken(agentToken);
            const att = yield apifunctions_1.default.attagent(agent[0].id, probganho, probbonus, probganhortp, probganhoinfluencer, probbonusinfluencer, probganhoaposta, probganhosaldo);
            if (att.affectedRows > 0) {
                res.send({
                    status: "success",
                    message: "Probabiliades alteradas com sucesso.",
                });
            }
            else {
                res.send({
                    status: "error",
                    message: "Erro desconhecido por favor contate o adm.",
                });
            }
        });
    },
};
