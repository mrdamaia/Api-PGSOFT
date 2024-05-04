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
                        wp3x5: null,
                        wpl: null,
                        ptbr: null,
                        lw: null,
                        lwm: null,
                        rl3x5: [5, 6, 7, 2, 4, 8, 3, 8, 4, 2, 4, 8, 5, 6, 7],
                        swl: null,
                        swlb: null,
                        nswl: null,
                        rswl: null,
                        rs: null,
                        fs: null,
                        sc: 0,
                        saw: 0.0,
                        tlw: 0.0,
                        gm: 1,
                        gmi: 0,
                        gml: [1, 2, 3, 5],
                        gwt: -1,
                        fb: null,
                        ctw: 0.0,
                        pmt: null,
                        cwc: 0,
                        fstc: null,
                        pcwc: 0,
                        rwsp: null,
                        hashr: null,
                        ml: ml,
                        cs: cs,
                        rl: [1, 5, 6, 7, 7, 2, 4, 8, 5, 3, 8, 4, 7, 2, 4, 8, 1, 5, 6, 7],
                        sid: "1768292046256340992",
                        psid: "1768292046256340992",
                        st: 1,
                        nst: 1,
                        pf: 1,
                        aw: 0.0,
                        wid: 0,
                        wt: "C",
                        wk: "0_C",
                        wbn: null,
                        wfg: null,
                        blb: saldo,
                        blab: saldo,
                        bl: saldo,
                        tb: 0.0,
                        tbb: 0.0,
                        tw: 0.0,
                        np: 0.0,
                        ocr: null,
                        mr: null,
                        ge: [1, 11],
                    },
                },
                err: { cd: "3202", msg: "Not enough cash.", tid: "HXHUOM14" },
            };
        });
    },
};
