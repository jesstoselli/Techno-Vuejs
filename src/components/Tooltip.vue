<template>
  <div class="alerta" :class="{ ativo: alerta }">
    <p class="alerta_mensagem">{{ mensagem }}</p>
  </div>
</template>

<script>
export default {
  props: ["mensagem", "alerta"]
};
</script>

<style scoped lang="scss">
.alerta {
  position: absolute;
  top: 20px;
  left: 0;
  z-index: 10;
  width: 100%;
  text-align: center;
  display: none;

  .alerta_mensagem {
    background: #ffffff;
    display: inline-block;
    padding: 20px 40px;
    border: 2px solid #000000;
    box-shadow: 0 3px 4px rgba($color: #000000, $alpha: 0.1),
      0 4px 10px rgba($color: #000000, $alpha: 0.2);
  }
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.ativo {
  display: block;
  animation: fadeInDown 0.3s forwards;
}
</style>
