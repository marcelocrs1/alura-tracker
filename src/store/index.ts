import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ATUALIZA_TAREFA, DEFINIR_PROJETOS, EXCLUIR_PROJETO, NOTIFICAR, REMOVE_TAREFA } from "./tipo-mutacoes";
import ITarefa from "@/interfaces/ITarefa";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, CADASTRAR_PROJETOS, OBTER_PROJETOS, REMOVER_PROJETO } from "./tipo-acoes";
import http from "@/http";

interface Estado {
  projetos: IProjeto[],
  tarefas: ITarefa[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO] (state, projeto: IProjeto) {
      const index = state.projetos.findIndex(proj => proj.id == projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO] (state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id != id)
    },
    [DEFINIR_PROJETOS] (state, projetos: IProjeto[]) {
      state.projetos = projetos
    },
    [ADICIONA_TAREFA] (state, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString()
      state.tarefas.push(tarefa)
    },
    [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
      const indice = state.tarefas.findIndex(p => p.id == tarefa.id)
      state.tarefas[indice] = tarefa
    },
    [REMOVE_TAREFA] (state, id: string) {
      state.projetos = state.projetos.filter(p => p.id != id)
    },
    [NOTIFICAR] (state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, 3000);
    },
  },
  actions: {
    [OBTER_PROJETOS] ({ commit }) {
      http.get('projetos')
          .then(response => commit(DEFINIR_PROJETOS, response.data))
  },
  [CADASTRAR_PROJETOS] (contexto, nomeDoProjeto: string) {
      return http.post('/projetos', {
          nome: nomeDoProjeto
      })
  },
  [ALTERAR_PROJETO] (contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto)
  },
  [REMOVER_PROJETO] ({ commit }, id: string) {
      return http.delete(`/projetos/${id}`)
          .then(() => commit(EXCLUIR_PROJETO, id))
  }
}
})

export function useStore(): Store<Estado> {
  return vuexUseStore(key)
}
