<template>
  <section class="carrinho_modal" :class="{ ativo: carrinhoAtivo }" @click="closeCart">
    <div class="carrinho_container">
      <button class="carrinho_fechar" @click="closeCartBtn">X</button>
      <h2 class="carrinho_titulo">Carrinho</h2>
      <div v-if="carrinho.length > 0">
        <ul class="carrinho_lista">
          <li v-for="(item, index) in carrinho" :key="item.id" class="carrinho_item">
            <p>{{ item.nome }} | {{ item.quantidade }}</p>
            <p class="carrinho_preco">{{ item.preco | currency }}</p>
            <button class="carrinho_remover" @click="removeItemFromCartInHeader(index)">x</button>
          </li>
        </ul>
        <p class="carrinho_total">{{ carrinhoTotal | currency }}</p>
        <button class="carrinho_finalizarCompra">Finalizar Compra</button>
      </div>
      <p v-else>O carrinho está vazio.</p>
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
    },
    closeCartBtn(event) {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="scss">
.carrinho_modal {
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }

  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  display: none;

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

  .carrinho_container {
    position: relative;
    margin: 80px auto;
    background: #ffffff;
    padding: 40px;
    max-width: 800px;

    animation: fadeInDown 0.3s forwards;

    .carrinho_fechar {
      border-radius: 50%;
      border: 2px solid #000000;
      width: 40px;
      height: 40px;

      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 1rem;
      cursor: pointer;
      box-shadow: 0 3px 4px rgba($color: #000000, $alpha: 0.1),
        0 4px 10px rgba($color: #000000, $alpha: 0.2);
    }

    .carrinho_titulo {
      margin-bottom: 10px;
      border-bottom: 2px solid #000000;
      padding-bottom: 20px;
    }

    .carrinho_lista {
      .carrinho_item {
        display: grid;
        grid-template-columns: 1fr 1fr 50px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 10px;

        .carrinho_preco {
          text-align: right;
        }

        .carrinho_remover {
          border: none;
          background: none;
          font-size: 1rem;
          cursor: pointer;
        }
      }
    }

    .carrinho_total {
      text-align: right;
      padding: 10px 50px 10px 0;
      margin-bottom: 20px;
      border-bottom: 2px solid #000000;
    }

    .carrinho_finalizarCompra {
      display: block;
      margin-left: auto;
      background: #000000;
      color: #ffffff;
      cursor: pointer;

      border: none;
      font-size: 1rem;
      font-family: "Noto Serif";
      padding: 10px 25px;

      &:active {
        background: #808080;
      }
    }
  }
}

.ativo {
  display: block;
}

@media screen and (max-width: 900px) {
  .carrinho_modal {
    padding: 10px;
  }
}
</style>
