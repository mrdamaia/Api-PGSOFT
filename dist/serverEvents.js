"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adicionarListener = exports.emitirEventoInterno = void 0;
const events_1 = require("events");
// Crie um EventEmitter para comunicação interna do servidor
const internalEmitter = new events_1.EventEmitter();
// Função para emitir um evento interno
function emitirEventoInterno(evento, dados) {
    internalEmitter.emit(evento, dados);
}
exports.emitirEventoInterno = emitirEventoInterno;
// Função para adicionar um listener para eventos internos
function adicionarListener(evento, listener) {
    internalEmitter.on(evento, listener);
}
exports.adicionarListener = adicionarListener;
