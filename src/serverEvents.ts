import { EventEmitter } from "events"

// Crie um EventEmitter para comunicação interna do servidor
const internalEmitter = new EventEmitter()

// Função para emitir um evento interno
export function emitirEventoInterno(evento: string, dados?: any) {
   internalEmitter.emit(evento, dados)
}

// Função para adicionar um listener para eventos internos
export function adicionarListener(evento: string, listener: (...args: any[]) => void) {
   internalEmitter.on(evento, listener)
}
