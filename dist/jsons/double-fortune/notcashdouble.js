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
    notcash(saldo, cs, ml) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                dt: {
                    si: {
                        wp: null,
                        lw: null,
                        lwm: null,
                        slw: [0.0],
                        nk: null,
                        sc: 0,
                        fs: null,
                        gwt: -1,
                        fb: null,
                        ctw: 0.7,
                        pmt: null,
                        cwc: 1,
                        fstc: null,
                        pcwc: 1,
                        rwsp: { "0": { "1": 15.0, "12": 15.0, "13": 25.0, "30": 15.0 } },
                        hashr: null,
                        ml: 3,
                        cs: 0.01,
                        rl: [8, 16, 9, 11, 5, 18, 3, 0, 4, 12, 6, 17, 7, 15, 10],
                        sid: "1772661310702617602",
                        psid: "1772661310702617602",
                        st: 1,
                        nst: 1,
                        pf: 1,
                        aw: 0.0,
                        wid: 0,
                        wt: "C",
                        wk: "0_C",
                        wbn: null,
                        wfg: null,
                        blb: 0.71,
                        blab: 0.71,
                        bl: 0.71,
                        tb: 0.0,
                        tbb: 0.0,
                        tw: 0.0,
                        np: 0.0,
                        ocr: null,
                        mr: null,
                        ge: [1, 11],
                    },
                },
                err: { cd: "3202", msg: "Not enough cash.", tid: "ZVOPGH26" },
            };
        });
    },
};
