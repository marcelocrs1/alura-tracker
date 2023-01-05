<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="" />
    </h1>
    <div class="has-text-centered dark" @click="alterarTema">
      <i class="fas fa-lg darkButton" :class="iconCSSClass"></i>
    </div>
    <nav class="panel mat-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BarraLateral",
  emits: ["aoTemaAlterado"],
  data() {
    return {
      modoEscuroAtivo: false,
    };
  },
  computed: {
    iconCSSClass() {
      return !this.modoEscuroAtivo ? "fa-moon" : "fa-sun";
    },
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit("aoTemaAlterado", this.modoEscuroAtivo);
    },
  },
});
</script>

<style scoped>
header {
  display: flex;
  flex-flow: column;
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
  align-items: center;
}
.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}
.dark {
  color: white;
  margin-top: 10px;
  margin-bottom: 35px;
  border: 1.5px solid white;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.darkButton:hover {
  scale: 1.2;
  color: #faf0ca;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
    background: #8f9fad;
  }
}
</style>
