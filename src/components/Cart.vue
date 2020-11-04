<template>
  <section class="carrinho_modal" :class="{ ativo: carrinhoAtivo }" @click="closeCart">
    <div class="carrinho_container">
      <button @click="carrinhoAtivo = false"></button>
      <p v-for="(item, index) in carrinho" :key="item.id">
        {{ item.nome }} | {{ item.quantidade }}
        <button @click="removeItemFromCartInHeader(index)">remover</button>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: ["carrinhoTotal", "carrinho", "carrinhoAtivo"],
  methods: {
    removeItemFromCartInHeader(index) {
      this.$emit("removeFromCart", index);
    },
    closeCart(event) {
      if (event.target === event.currentTarget) {
        this.$emit("close");
      }
    }
  }
};
</script>

<style></style>
