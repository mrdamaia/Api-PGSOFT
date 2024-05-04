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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    linhaganho(json) {
        return __awaiter(this, void 0, void 0, function* () {
            const numeroAleatorio = Math.floor(Math.random() * 428) + 1;
            console.log("linha de ganho " + numeroAleatorio);
            const jsons = {
                [1]: {
                    [0]: {
                        wp: { "8": [2, 7, 11], "17": [3, 6, 11] },
                        wp3x5: { "8": [1, 5, 8], "17": [2, 4, 8] },
                        wpl: [2, 7, 11, 3, 6],
                        ptbr: [2, 7, 3, 6],
                        lw: { "8": 1.2, "17": 0.75 },
                        lwm: null,
                        rl3x5: [7, 4, 6, 3, 6, 4, 8, 5, 0, 2, 7, 8, 7, 8, 7],
                        swl: [[11, 2]],
                        swlb: [[11, 2]],
                        nswl: [[11, 2]],
                        rswl: [],
                        rs: null,
                        fs: null,
                        gml: [1, 2, 3, 5],
                        cwc: 1,
                        fstc: null,
                        rwsp: { "8": 8.0, "17": 5.0 },
                        rl: [8, 7, 4, 6, 3, 3, 6, 4, 8, 8, 5, 0, 7, 2, 7, 8, 6, 7, 8, 7],
                        st: 1,
                        nst: 4,
                    },
                    [1]: {
                        wp: null,
                        wp3x5: null,
                        wpl: null,
                        ptbr: null,
                        lw: null,
                        lwm: null,
                        rl3x5: [6, 8, 7, 7, 3, 3, 8, 5, 0, 2, 7, 8, 7, 8, 7],
                        swl: [[11, 2]],
                        swlb: [[11, 2]],
                        nswl: null,
                        rswl: null,
                        rs: { rns: [[5, 6], [7, 7], null, null, null] },
                        fs: null,
                        gml: [1, 2, 3, 5],
                        cwc: 0,
                        fstc: { "4": 1 },
                        rwsp: null,
                        rl: [5, 6, 8, 7, 7, 7, 3, 3, 8, 8, 5, 0, 7, 2, 7, 8, 6, 7, 8, 7],
                        st: 4,
                        nst: 1,
                    },
                },
            };
            return jsons[json];
        });
    },
};
