<template>
  <header>
    <img src="../assets/techno.svg" alt="Techno" class="logo" />
    <div class="carrinho_menu">{{ carrinhoTotal | currency }} |</div>
  </header>
</template>

<script>
export default {
  props: ["carrinhoTotal"]
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;

  max-width: 900px;
  padding: 20px 0;
  margin: 0 auto;

  .logo {
    width: 80px;
  }

  .carrinho_menu {
    &::after {
      content: "";
      display: inline-block;
      background: url("../assets/carrinho.svg") no-repeat center center;
      width: 25px;
      height: 25px;
      margin-left: 10px;
    }

    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
