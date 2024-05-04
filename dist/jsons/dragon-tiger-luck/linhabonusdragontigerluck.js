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
    linhabonus(idjson) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsons = {
                [1]: {
                    mrl: {
                        "1": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [2, 1, 2, 1, 3, 2, 3, 1, 3],
                            orl: [1, 3, 1],
                        },
                        "2": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [3, 3, 1, 1, 3, 2, 1, 2, 3],
                            orl: [3, 3, 2],
                        },
                    },
                },
                [2]: {
                    mrl: {
                        "1": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [2, 1, 2, 1, 1, 2, 3, 1, 3],
                            orl: [1, 1, 1],
                        },
                        "2": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [3, 1, 1, 1, 1, 2, 1, 1, 3],
                            orl: [1, 1, 1],
                        },
                    },
                },
                [3]: {
                    mrl: {
                        "1": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [2, 2, 2, 1, 2, 2, 3, 2, 3],
                            orl: [2, 2, 2],
                        },
                        "2": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [3, 2, 1, 1, 2, 2, 1, 2, 3],
                            orl: [2, 2, 2],
                        },
                    },
                },
                [4]: {
                    mrl: {
                        "1": { wp: { "1": [0, 1, 2] }, lw: { "1": 1.25 }, tw: 1.25, rl: [1, 3, 1, 2, 3, 2, 3, 3, 2], orl: [3, 3, 3] },
                        "2": { wp: { "1": [0, 1, 2] }, lw: { "1": 1.25 }, tw: 1.25, rl: [1, 3, 1, 2, 3, 2, 3, 3, 2], orl: [3, 3, 3] },
                    },
                },
                [5]: {
                    mrl: {
                        "1": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [2, 1, 2, 1, 1, 2, 3, 1, 3],
                            orl: [1, 1, 1],
                        },
                        "2": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [3, 3, 1, 1, 3, 2, 1, 2, 3],
                            orl: [3, 3, 2],
                        },
                    },
                },
                [6]: {
                    mrl: {
                        "1": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [2, 1, 2, 1, 1, 2, 3, 1, 3],
                            orl: [1, 1, 1],
                        },
                        "2": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [3, 3, 1, 1, 3, 2, 1, 2, 3],
                            orl: [3, 3, 2],
                        },
                    },
                },
                [7]: {
                    mrl: {
                        "1": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [2, 1, 2, 2, 1, 2, 3, 3, 3],
                            orl: [1, 2, 3],
                        },
                        "2": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [3, 3, 1, 1, 3, 2, 1, 2, 3],
                            orl: [3, 3, 2],
                        },
                    },
                },
                [8]: {
                    mrl: {
                        "1": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [2, 3, 2, 2, 3, 3, 3, 3, 3],
                            orl: [3, 3, 3],
                        },
                        "2": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [3, 3, 1, 1, 3, 2, 1, 2, 3],
                            orl: [3, 3, 2],
                        },
                    },
                },
                [9]: {
                    mrl: {
                        "1": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [1, 2, 3, 3, 2, 1, 3, 2, 2],
                            orl: [2, 2, 2],
                        },
                        "2": {
                            wp: {
                                "1": [0, 1, 2],
                            },
                            lw: {
                                "1": 1.25,
                            },
                            tw: 1.25,
                            rl: [3, 3, 1, 1, 3, 2, 1, 2, 3],
                            orl: [2, 3, 2],
                        },
                    },
                },
                [10]: {
                    mrl: {
                        "1": { wp: { "1": [0, 1, 2] }, lw: { "1": 1.25 }, tw: 1.25, rl: [3, 1, 3, 3, 3, 2, 2, 3, 2], orl: [1, 3, 3] },
                        "2": { wp: { "1": [0, 1, 2] }, lw: { "1": 1.25 }, tw: 1.25, rl: [3, 3, 3, 3, 3, 2, 2, 2, 1], orl: [3, 3, 2] },
                    },
                },
                [11]: {
                    mrl: {
                        "1": { wp: { "1": [0, 1, 2] }, lw: { "1": 1.25 }, tw: 1.25, rl: [2, 3, 1, 3, 3, 2, 3, 1, 3], orl: [3, 3, 1] },
                        "2": { wp: { "1": [0, 1, 2] }, lw: { "1": 1.25 }, tw: 1.25, rl: [2, 2, 2, 1, 1, 3, 3, 1, 1], orl: [2, 1, 1] },
                    },
                },
                [12]: {
                    mrl: {
                        "1": { wp: { "1": [0, 1, 2] }, lw: { "1": 1.25 }, tw: 1.25, rl: [2, 2, 1, 3, 2, 3, 3, 3, 1], orl: [2, 2, 3] },
                        "2": { wp: { "1": [0, 1, 2] }, lw: { "1": 1.25 }, tw: 1.25, rl: [2, 3, 3, 1, 3, 1, 3, 2, 1], orl: [3, 3, 2] },
                    },
                },
            };
            return jsons[idjson];
        });
    },
};
