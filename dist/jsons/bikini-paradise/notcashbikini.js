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
                        orl: null,
                        wm: 1,
                        rwm: null,
                        wabm: 0.0,
                        fs: null,
                        sc: 0,
                        wppr: [[], [], [], [], []],
                        gwt: -1,
                        fb: null,
                        ctw: 0.0,
                        pmt: null,
                        cwc: 0,
                        fstc: null,
                        pcwc: 0,
                        rwsp: null,
                        hashr: null,
                        ml: 1,
                        cs: 0.02,
                        rl: [3, 8, 4, 12, 9, 7, 10, 5, 6, 11, 3, 8, 9, 7, 10, 5, 3, 8, 4, 12],
                        sid: "1768278897964750850",
                        psid: "1768278897964750850",
                        st: 1,
                        nst: 1,
                        pf: 1,
                        aw: 0.0,
                        wid: 0,
                        wt: "C",
                        wk: "0_C",
                        wbn: null,
                        wfg: null,
                        blb: 0.31,
                        blab: 0.31,
                        bl: 0.31,
                        tb: 0.0,
                        tbb: 0.0,
                        tw: 0.0,
                        np: 0.0,
                        ocr: null,
                        mr: null,
                        ge: [1, 11],
                    },
                },
                err: { cd: "3202", msg: "Not enough cash.", tid: "ESGRTU14" },
            };
        });
    },
};
