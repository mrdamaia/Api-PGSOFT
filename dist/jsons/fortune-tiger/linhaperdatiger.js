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
    linhaperda() {
        return __awaiter(this, void 0, void 0, function* () {
            const numeroAleatorio = Math.floor(Math.random() * 200) + 1;
            const jsons = {
                [0]: {
                    ist: false,
                    orl: [5, 6, 4, 3, 7, 2, 3, 0, 7],
                },
                [1]: {
                    ist: false,
                    orl: [2, 3, 3, 7, 5, 6, 0, 0, 0],
                },
                [2]: {
                    ist: false,
                    orl: [0, 4, 5, 3, 3, 4, 7, 3, 6],
                },
                [3]: {
                    ist: false,
                    orl: [5, 5, 5, 7, 7, 7, 2, 6, 6],
                },
                [4]: {
                    ist: false,
                    orl: [5, 7, 7, 3, 5, 6, 7, 7, 7],
                },
                [5]: {
                    ist: false,
                    orl: [7, 7, 7, 5, 6, 2, 6, 7, 7],
                },
                [6]: {
                    ist: false,
                    orl: [6, 6, 6, 2, 4, 7, 6, 6, 6],
                },
                [7]: {
                    ist: false,
                    orl: [7, 7, 7, 2, 2, 3, 7, 2, 4],
                },
                [8]: {
                    ist: true,
                    orl: [6, 3, 2, 5, 4, 7, 7, 7, 7],
                },
                [9]: {
                    ist: true,
                    orl: [7, 7, 5, 3, 4, 4, 5, 7, 3],
                },
                [10]: {
                    ist: true,
                    orl: [7, 6, 6, 2, 2, 7, 6, 6, 7],
                },
                [11]: {
                    ist: false,
                    orl: [7, 6, 6, 2, 4, 7, 0, 0, 0],
                },
                [12]: {
                    ist: false,
                    orl: [3, 4, 4, 6, 5, 7, 7, 7, 7],
                },
                [13]: {
                    ist: false,
                    orl: [6, 6, 6, 2, 2, 7, 7, 2, 3],
                },
                [14]: {
                    ist: true,
                    orl: [2, 3, 5, 0, 7, 7, 7, 4, 5],
                },
                [15]: {
                    ist: true,
                    orl: [7, 7, 7, 5, 5, 7, 4, 4, 6],
                },
                [16]: {
                    ist: true,
                    orl: [5, 4, 6, 6, 4, 7, 7, 3, 5],
                },
                [17]: {
                    ist: false,
                    orl: [7, 7, 7, 5, 7, 4, 5, 2, 6],
                },
                [18]: {
                    ist: false,
                    orl: [7, 7, 2, 2, 2, 5, 7, 7, 7],
                },
                [19]: {
                    ist: false,
                    orl: [3, 3, 2, 5, 6, 3, 4, 7, 2],
                },
                [20]: {
                    ist: false,
                    orl: [4, 7, 7, 5, 3, 7, 5, 4, 6],
                },
                [21]: {
                    ist: false,
                    orl: [6, 6, 6, 6, 5, 7, 3, 6, 7],
                },
                [22]: {
                    ist: false,
                    orl: [7, 7, 6, 6, 2, 7, 6, 7, 7],
                },
                [23]: {
                    ist: false,
                    orl: [7, 6, 3, 3, 4, 7, 6, 5, 4],
                },
                [24]: {
                    ist: false,
                    orl: [7, 7, 2, 6, 3, 4, 3, 4, 7],
                },
                [25]: {
                    ist: false,
                    orl: [5, 7, 6, 6, 5, 7, 7, 7, 7],
                },
                [26]: {
                    ist: false,
                    orl: [5, 7, 6, 5, 6, 3, 3, 7, 6],
                },
                [27]: {
                    ist: false,
                    orl: [6, 7, 2, 5, 6, 3, 6, 6, 4],
                },
                [28]: {
                    ist: false,
                    orl: [2, 3, 7, 0, 0, 6, 4, 4, 4],
                },
                [29]: {
                    ist: false,
                    orl: [6, 6, 6, 4, 7, 6, 7, 7, 7],
                },
                [30]: {
                    ist: false,
                    orl: [6, 6, 6, 6, 6, 6, 5, 5, 5],
                },
                [31]: {
                    ist: false,
                    orl: [7, 7, 7, 2, 2, 2, 7, 7, 7],
                },
                [32]: {
                    ist: false,
                    orl: [7, 2, 2, 3, 7, 6, 5, 6, 6],
                },
                [33]: {
                    ist: false,
                    orl: [7, 6, 5, 2, 6, 7, 5, 2, 7],
                },
                [34]: {
                    ist: false,
                    orl: [6, 6, 6, 5, 3, 7, 6, 6, 6],
                },
                [35]: {
                    ist: true,
                    orl: [6, 6, 6, 0, 3, 4, 7, 7, 7],
                },
                [36]: {
                    ist: true,
                    orl: [7, 6, 5, 5, 6, 3, 6, 4, 7],
                },
                [37]: {
                    ist: true,
                    orl: [7, 2, 2, 7, 7, 7, 6, 6, 6],
                },
                [38]: {
                    ist: true,
                    orl: [2, 3, 7, 5, 3, 3, 4, 6, 6],
                },
                [39]: {
                    ist: false,
                    orl: [2, 2, 2, 6, 5, 0, 5, 5, 5],
                },
                [40]: {
                    ist: false,
                    orl: [6, 6, 7, 7, 5, 5, 7, 7, 7],
                },
                [41]: {
                    ist: false,
                    orl: [7, 7, 2, 6, 4, 5, 5, 3, 7],
                },
                [42]: {
                    ist: false,
                    orl: [7, 7, 7, 3, 3, 4, 6, 7, 3],
                },
                [43]: {
                    ist: false,
                    orl: [6, 3, 2, 7, 3, 5, 4, 4, 4],
                },
                [44]: {
                    ist: false,
                    orl: [6, 6, 6, 5, 2, 4, 7, 7, 0],
                },
                [45]: {
                    ist: false,
                    orl: [3, 5, 7, 2, 6, 7, 7, 0, 5],
                },
                [46]: {
                    ist: false,
                    orl: [6, 6, 6, 0, 0, 0, 4, 4, 4],
                },
                [47]: {
                    ist: false,
                    orl: [6, 3, 7, 4, 7, 6, 6, 2, 7],
                },
                [48]: {
                    ist: false,
                    orl: [5, 5, 5, 7, 7, 2, 0, 0, 0],
                },
                [49]: {
                    ist: false,
                    orl: [5, 5, 5, 0, 0, 0, 4, 4, 4],
                },
                [50]: {
                    ist: false,
                    orl: [5, 5, 5, 7, 7, 7, 0, 0, 0],
                },
                [51]: {
                    ist: false,
                    orl: [5, 5, 6, 5, 5, 5, 6, 6, 6],
                },
                [52]: {
                    ist: false,
                    orl: [2, 3, 4, 7, 7, 7, 5, 2, 6],
                },
                [53]: {
                    ist: false,
                    orl: [5, 7, 7, 2, 2, 3, 2, 3, 5],
                },
                [54]: {
                    ist: false,
                    orl: [6, 7, 5, 5, 5, 7, 4, 4, 4],
                },
                [55]: {
                    ist: false,
                    orl: [7, 4, 6, 5, 5, 5, 6, 2, 7],
                },
                [56]: {
                    ist: false,
                    orl: [3, 7, 7, 6, 7, 5, 4, 4, 4],
                },
                [57]: {
                    ist: false,
                    orl: [6, 7, 3, 3, 2, 5, 6, 0, 7],
                },
                [58]: {
                    ist: false,
                    orl: [5, 5, 5, 5, 2, 4, 7, 0, 0],
                },
                [59]: {
                    ist: false,
                    orl: [5, 2, 4, 7, 7, 7, 2, 6, 5],
                },
                [60]: {
                    ist: false,
                    orl: [3, 6, 5, 2, 5, 3, 6, 5, 4],
                },
                [61]: {
                    ist: false,
                    orl: [0, 6, 6, 6, 2, 2, 2, 7, 4],
                },
                [62]: {
                    ist: false,
                    orl: [7, 6, 3, 5, 4, 3, 4, 6, 7],
                },
                [63]: {
                    ist: false,
                    orl: [7, 7, 6, 7, 2, 2, 6, 6, 6],
                },
                [64]: {
                    ist: false,
                    orl: [5, 6, 4, 5, 2, 6, 7, 6, 5],
                },
                [65]: {
                    ist: false,
                    orl: [5, 5, 5, 7, 7, 7, 7, 7, 2],
                },
                [66]: {
                    ist: false,
                    orl: [5, 5, 5, 7, 7, 7, 2, 7, 5],
                },
                [67]: {
                    ist: false,
                    orl: [7, 7, 2, 6, 7, 7, 2, 6, 6],
                },
                [68]: {
                    ist: false,
                    orl: [4, 6, 7, 5, 7, 5, 4, 0, 5],
                },
                [69]: {
                    ist: false,
                    orl: [7, 6, 3, 3, 5, 2, 6, 7, 7],
                },
                [70]: {
                    ist: false,
                    orl: [7, 7, 7, 5, 6, 3, 6, 6, 6],
                },
                [71]: {
                    ist: true,
                    orl: [6, 6, 6, 5, 3, 6, 6, 7, 5],
                },
                [72]: {
                    ist: false,
                    orl: [7, 3, 3, 6, 2, 2, 2, 6, 5],
                },
                [73]: {
                    ist: false,
                    orl: [5, 6, 7, 5, 6, 6, 7, 2, 3],
                },
                [74]: {
                    ist: false,
                    orl: [5, 7, 7, 2, 7, 3, 5, 3, 3],
                },
                [75]: {
                    ist: false,
                    orl: [7, 2, 3, 2, 7, 7, 6, 6, 2],
                },
                [76]: {
                    ist: true,
                    orl: [6, 2, 4, 5, 7, 5, 4, 7, 5],
                },
                [77]: {
                    ist: false,
                    orl: [4, 6, 7, 7, 2, 5, 5, 6, 7],
                },
                [78]: {
                    ist: false,
                    orl: [6, 6, 2, 3, 4, 5, 7, 7, 3],
                },
                [79]: {
                    ist: false,
                    orl: [3, 2, 2, 5, 5, 5, 7, 5, 3],
                },
                [80]: {
                    ist: false,
                    orl: [3, 3, 7, 0, 7, 7, 5, 5, 5],
                },
                [81]: {
                    ist: true,
                    orl: [5, 5, 7, 4, 7, 5, 4, 4, 4],
                },
                [82]: {
                    ist: false,
                    orl: [5, 5, 7, 0, 0, 7, 6, 6, 6],
                },
                [83]: {
                    ist: false,
                    orl: [6, 3, 6, 3, 3, 6, 2, 5, 7],
                },
                [84]: {
                    ist: false,
                    orl: [5, 5, 5, 7, 5, 6, 7, 2, 3],
                },
                [85]: {
                    ist: true,
                    orl: [3, 7, 4, 5, 7, 4, 7, 6, 5],
                },
                [86]: {
                    ist: false,
                    orl: [7, 3, 5, 2, 2, 3, 5, 4, 3],
                },
                [87]: {
                    ist: false,
                    orl: [7, 7, 7, 7, 5, 4, 4, 7, 6],
                },
                [88]: {
                    ist: false,
                    orl: [6, 6, 6, 3, 3, 3, 0, 7, 7],
                },
                [89]: {
                    ist: false,
                    orl: [4, 6, 3, 6, 5, 4, 7, 7, 7],
                },
                [90]: {
                    ist: false,
                    orl: [7, 6, 5, 6, 0, 3, 7, 2, 6],
                },
                [91]: {
                    ist: false,
                    orl: [7, 4, 6, 5, 4, 3, 3, 3, 3],
                },
                [92]: {
                    ist: false,
                    orl: [6, 3, 2, 7, 7, 2, 2, 6, 3],
                },
                [93]: {
                    ist: false,
                    orl: [2, 5, 7, 5, 3, 7, 7, 7, 2],
                },
                [94]: {
                    ist: false,
                    orl: [7, 6, 5, 7, 6, 6, 4, 4, 4],
                },
                [95]: {
                    ist: false,
                    orl: [5, 3, 6, 3, 3, 6, 5, 2, 2],
                },
                [96]: {
                    ist: false,
                    orl: [6, 6, 7, 5, 4, 7, 2, 7, 4],
                },
                [97]: {
                    ist: false,
                    orl: [6, 6, 6, 7, 2, 5, 5, 5, 6],
                },
                [98]: {
                    ist: false,
                    orl: [6, 2, 5, 6, 6, 6, 4, 4, 4],
                },
                [99]: {
                    ist: false,
                    orl: [5, 7, 4, 5, 5, 5, 6, 6, 6],
                },
                [100]: {
                    ist: false,
                    orl: [4, 6, 6, 6, 4, 0, 5, 3, 3],
                },
                [101]: {
                    ist: false,
                    orl: [3, 5, 3, 3, 0, 6, 6, 7, 7],
                },
                [102]: {
                    ist: false,
                    orl: [6, 6, 6, 7, 5, 7, 2, 2, 5],
                },
                [103]: {
                    ist: false,
                    orl: [5, 3, 6, 2, 2, 2, 2, 5, 7],
                },
                [104]: {
                    ist: false,
                    orl: [6, 7, 7, 5, 5, 5, 4, 4, 4],
                },
                [105]: {
                    ist: false,
                    orl: [3, 7, 7, 7, 6, 5, 4, 4, 7],
                },
                [106]: {
                    ist: false,
                    orl: [2, 2, 2, 7, 7, 7, 7, 3, 7],
                },
                [107]: {
                    ist: false,
                    orl: [7, 6, 5, 7, 7, 7, 4, 4, 4],
                },
                [108]: {
                    ist: false,
                    orl: [5, 7, 6, 5, 6, 2, 7, 2, 2],
                },
                [109]: {
                    ist: false,
                    orl: [4, 5, 5, 6, 7, 5, 2, 6, 6],
                },
                [110]: {
                    ist: false,
                    orl: [5, 5, 5, 2, 5, 5, 6, 2, 7],
                },
                [111]: {
                    ist: false,
                    orl: [6, 6, 2, 7, 7, 5, 3, 3, 5],
                },
                [112]: {
                    ist: false,
                    orl: [7, 7, 2, 6, 5, 7, 7, 7, 5],
                },
                [113]: {
                    ist: false,
                    orl: [7, 7, 4, 7, 7, 7, 2, 6, 6],
                },
                [114]: {
                    ist: true,
                    orl: [6, 6, 6, 2, 2, 2, 6, 2, 2],
                },
                [115]: {
                    ist: false,
                    orl: [7, 6, 5, 6, 6, 6, 6, 5, 5],
                },
                [116]: {
                    ist: false,
                    orl: [4, 4, 7, 6, 5, 5, 7, 3, 3],
                },
                [117]: {
                    ist: false,
                    orl: [7, 4, 6, 6, 5, 3, 7, 3, 6],
                },
                [118]: {
                    ist: true,
                    orl: [6, 7, 7, 4, 6, 0, 2, 6, 3],
                },
                [119]: {
                    ist: false,
                    orl: [5, 7, 6, 5, 5, 5, 6, 5, 7],
                },
                [120]: {
                    ist: false,
                    orl: [2, 5, 6, 4, 7, 6, 5, 5, 5],
                },
                [121]: {
                    ist: false,
                    orl: [2, 5, 7, 7, 3, 5, 4, 6, 5],
                },
                [122]: {
                    ist: true,
                    orl: [5, 7, 6, 2, 5, 7, 7, 7, 7],
                },
                [123]: {
                    ist: false,
                    orl: [0, 4, 5, 4, 5, 7, 3, 3, 3],
                },
                [124]: {
                    ist: false,
                    orl: [5, 5, 5, 7, 2, 2, 7, 2, 4],
                },
                [125]: {
                    ist: false,
                    orl: [4, 2, 2, 3, 5, 7, 5, 2, 6],
                },
                [126]: {
                    ist: false,
                    orl: [5, 6, 7, 0, 0, 0, 4, 4, 4],
                },
                [127]: {
                    ist: false,
                    orl: [2, 4, 6, 2, 2, 2, 6, 5, 4],
                },
                [128]: {
                    ist: false,
                    orl: [7, 6, 5, 7, 4, 4, 5, 3, 3],
                },
                [129]: {
                    ist: false,
                    orl: [0, 5, 5, 3, 3, 3, 7, 7, 7],
                },
                [130]: {
                    ist: false,
                    orl: [7, 0, 6, 3, 4, 4, 4, 7, 7],
                },
                [131]: {
                    ist: false,
                    orl: [7, 6, 3, 6, 5, 7, 7, 7, 7],
                },
                [132]: {
                    ist: false,
                    orl: [6, 6, 6, 7, 5, 7, 3, 2, 5],
                },
                [133]: {
                    ist: false,
                    orl: [4, 4, 5, 5, 5, 7, 7, 7, 7],
                },
                [134]: {
                    ist: false,
                    orl: [6, 6, 6, 4, 5, 5, 4, 3, 2],
                },
                [135]: {
                    ist: false,
                    orl: [2, 5, 4, 2, 4, 7, 7, 7, 7],
                },
                [136]: {
                    ist: false,
                    orl: [4, 7, 6, 6, 3, 5, 7, 3, 6],
                },
                [137]: {
                    ist: false,
                    orl: [6, 6, 6, 7, 7, 7, 4, 4, 7],
                },
                [138]: {
                    ist: false,
                    orl: [3, 3, 4, 3, 7, 6, 6, 7, 7],
                },
                [139]: {
                    ist: false,
                    orl: [7, 7, 7, 5, 3, 3, 0, 0, 0],
                },
                [140]: {
                    ist: false,
                    orl: [3, 7, 7, 5, 5, 5, 0, 0, 0],
                },
                [141]: {
                    ist: false,
                    orl: [7, 7, 2, 6, 5, 4, 5, 5, 4],
                },
                [142]: {
                    ist: false,
                    orl: [7, 7, 7, 6, 2, 7, 5, 2, 6],
                },
                [143]: {
                    ist: false,
                    orl: [7, 6, 3, 6, 5, 7, 7, 7, 7],
                },
                [144]: {
                    ist: false,
                    orl: [7, 7, 7, 2, 5, 6, 7, 3, 7],
                },
                [145]: {
                    ist: false,
                    orl: [5, 3, 4, 6, 7, 7, 7, 7, 7],
                },
                [146]: {
                    ist: false,
                    orl: [5, 7, 6, 3, 4, 0, 4, 5, 2],
                },
                [147]: {
                    ist: false,
                    orl: [7, 7, 6, 6, 7, 5, 5, 2, 6],
                },
                [148]: {
                    ist: false,
                    orl: [7, 7, 7, 2, 6, 7, 3, 6, 4],
                },
                [149]: {
                    ist: false,
                    orl: [7, 6, 6, 0, 5, 5, 4, 4, 4],
                },
                [150]: {
                    ist: false,
                    orl: [4, 2, 2, 7, 7, 7, 4, 7, 7],
                },
                [151]: {
                    ist: false,
                    orl: [5, 5, 6, 7, 2, 2, 2, 6, 5],
                },
                [152]: {
                    ist: false,
                    orl: [4, 6, 2, 6, 6, 7, 6, 7, 5],
                },
                [153]: {
                    ist: false,
                    orl: [7, 5, 7, 0, 0, 0, 5, 6, 6],
                },
                [154]: {
                    ist: false,
                    orl: [6, 6, 7, 2, 6, 5, 4, 4, 4],
                },
                [155]: {
                    ist: false,
                    orl: [7, 7, 2, 4, 6, 0, 7, 6, 5],
                },
                [156]: {
                    ist: false,
                    orl: [3, 7, 4, 7, 5, 6, 7, 6, 5],
                },
                [157]: {
                    ist: false,
                    orl: [7, 6, 6, 2, 2, 7, 4, 4, 4],
                },
                [158]: {
                    ist: false,
                    orl: [7, 7, 4, 3, 7, 6, 2, 6, 5],
                },
                [159]: {
                    ist: false,
                    orl: [6, 6, 7, 5, 5, 5, 6, 7, 7],
                },
                [160]: {
                    ist: false,
                    orl: [6, 3, 6, 7, 7, 7, 7, 7, 7],
                },
                [161]: {
                    ist: false,
                    orl: [4, 5, 5, 7, 6, 0, 7, 7, 7],
                },
                [162]: {
                    ist: false,
                    orl: [3, 4, 4, 3, 5, 6, 6, 6, 4],
                },
                [163]: {
                    ist: false,
                    orl: [6, 6, 6, 7, 7, 7, 4, 7, 7],
                },
                [164]: {
                    ist: false,
                    orl: [3, 4, 4, 4, 3, 7, 7, 6, 5],
                },
                [165]: {
                    ist: false,
                    orl: [2, 3, 7, 6, 7, 3, 5, 5, 6],
                },
                [166]: {
                    ist: false,
                    orl: [4, 6, 3, 4, 3, 5, 6, 5, 5],
                },
                [167]: {
                    ist: false,
                    orl: [2, 3, 3, 5, 6, 2, 2, 5, 6],
                },
                [168]: {
                    ist: false,
                    orl: [7, 7, 7, 6, 6, 6, 6, 7, 7],
                },
                [169]: {
                    ist: false,
                    orl: [3, 3, 4, 7, 2, 6, 5, 6, 2],
                },
                [170]: {
                    ist: false,
                    orl: [4, 4, 5, 7, 7, 7, 6, 6, 6],
                },
                [171]: {
                    ist: false,
                    orl: [6, 6, 6, 4, 5, 5, 4, 5, 2],
                },
                [172]: {
                    ist: false,
                    orl: [5, 3, 4, 4, 5, 6, 5, 3, 4],
                },
                [173]: {
                    ist: false,
                    orl: [6, 6, 6, 3, 0, 0, 2, 7, 7],
                },
                [174]: {
                    ist: false,
                    orl: [2, 3, 7, 6, 5, 2, 4, 7, 5],
                },
                [175]: {
                    ist: false,
                    orl: [0, 0, 4, 7, 4, 4, 5, 5, 5],
                },
                [176]: {
                    ist: false,
                    orl: [7, 6, 6, 3, 7, 7, 5, 5, 5],
                },
                [177]: {
                    ist: false,
                    orl: [7, 5, 5, 7, 5, 6, 6, 6, 6],
                },
                [178]: {
                    ist: false,
                    orl: [7, 7, 7, 0, 6, 5, 5, 3, 5],
                },
                [179]: {
                    ist: false,
                    orl: [5, 7, 2, 7, 3, 0, 7, 5, 3],
                },
                [180]: {
                    ist: false,
                    orl: [6, 6, 6, 7, 7, 7, 7, 7, 7],
                },
                [181]: {
                    ist: false,
                    orl: [5, 7, 4, 0, 7, 6, 6, 6, 6],
                },
                [182]: {
                    ist: false,
                    orl: [2, 5, 6, 6, 5, 4, 7, 7, 0],
                },
                [183]: {
                    ist: false,
                    orl: [7, 7, 7, 5, 6, 6, 5, 0, 7],
                },
                [184]: {
                    ist: false,
                    orl: [7, 7, 7, 7, 0, 3, 5, 4, 3],
                },
                [185]: {
                    ist: false,
                    orl: [6, 5, 4, 7, 7, 7, 6, 6, 2],
                },
                [186]: {
                    ist: false,
                    orl: [7, 6, 3, 3, 3, 3, 5, 5, 6],
                },
                [187]: {
                    ist: false,
                    orl: [2, 4, 7, 6, 5, 4, 5, 4, 7],
                },
                [188]: {
                    ist: false,
                    orl: [4, 4, 5, 6, 7, 4, 7, 4, 5],
                },
                [189]: {
                    ist: false,
                    orl: [5, 5, 5, 7, 7, 7, 7, 7, 7],
                },
                [190]: {
                    ist: false,
                    orl: [6, 7, 2, 2, 3, 3, 6, 6, 4],
                },
                [191]: {
                    ist: false,
                    orl: [5, 5, 6, 6, 6, 5, 2, 7, 7],
                },
                [192]: {
                    ist: false,
                    orl: [7, 6, 3, 4, 3, 7, 2, 7, 4],
                },
                [193]: {
                    ist: false,
                    orl: [3, 6, 6, 2, 2, 2, 5, 2, 7],
                },
                [194]: {
                    ist: false,
                    orl: [0, 5, 5, 7, 2, 6, 6, 5, 7],
                },
                [195]: {
                    ist: false,
                    orl: [7, 7, 7, 3, 4, 7, 3, 5, 4],
                },
                [196]: {
                    ist: false,
                    orl: [4, 0, 4, 2, 5, 7, 5, 3, 7],
                },
                [197]: {
                    ist: false,
                    orl: [2, 2, 3, 5, 6, 2, 5, 5, 5],
                },
                [198]: {
                    ist: false,
                    orl: [7, 4, 6, 2, 3, 7, 7, 2, 6],
                },
                [199]: {
                    ist: false,
                    orl: [7, 4, 6, 2, 2, 3, 7, 7, 7],
                },
                [200]: {
                    ist: false,
                    orl: [6, 3, 7, 3, 3, 2, 3, 6, 7],
                },
            };
            return jsons[numeroAleatorio];
        });
    },
};
