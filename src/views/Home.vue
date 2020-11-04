<template>
  <div>
    <Tooltip :alerta="alertaAtivo" :mensagem="alertaMensagem" />
    <Header :carrinhoTotal="sumCartUp" :carrinho="carrinho" />
    <Cart
      :carrinho="carrinho"
      :carrinhoAtivo="carrinhoAtivo"
      @removeFromCart="removeItemFromCart"
      @close="closeCart"
    />
    <Modal v-if="produto" :produto="produto" @close="closeModal" @addToCart="addItemToCart" />
    <section class="produtos">
      <div
        @click="openModal(produto.id)"
        class="produto"
        v-for="produto in produtos"
        :key="produto.id"
      >
        <img :src="produto.img" :alt="produto.nome" class="produto_img" />
        <div class="produto_info">
          <span class="produto_preco">{{ produto.preco | currency }}</span>
          <h2 class="produto_titulo">{{ produto.nome }}</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "../services/api";

import Header from "@/components/Header.vue";
import Modal from "@/components/Modal.vue";
import Tooltip from "@/components/Tooltip.vue";
import Cart from "@/components/Cart.vue";

export default {
  components: {
    Header,
    Modal,
    Tooltip,
    Cart
  },
  data() {
    return {
      produtos: [],
      produto: false,
      carrinho: [],
      carrinhoAtivo: true,
      alertaAtivo: false,
      alertaMensagem: "Item adicionado."
    };
  },
  computed: {
    sumCartUp() {
      if (!Array.isArray(this.carrinho)) {
        return 0;
      }

      const valorTotal = this.carrinho.reduce((total, cadaProduto) => {
        const precoIndividual = cadaProduto.preco * cadaProduto.quantidade;
        return total + precoIndividual;
      }, 0);

      return valorTotal;
    }
  },
  methods: {
    toggleAlert(message) {
      this.alertaMensagem = message;
      this.alertaAtivo = true;
      setTimeout(() => {
        this.alertaAtivo = false;
      }, 1500);
    },
    assignModal(id) {
      const produto = this.produtos.find(prod => prod.id === id);
      this.produto = produto;
    },
    openModal(id) {
      this.assignModal(id);

      window.scrollTo({
        top: 0,
        behaviour: "smooth"
      });
    },
    closeModal() {
      this.produto = false;
    },
    closeCart() {
      this.carrinhoAtivo = false;
    },
    addItemToCart(produto) {
      if (produto.estoque === 0) {
        return;
      }

      produto.estoque -= 1;

      const checarSeProdutoJaNoCarrinho = this.carrinho.find(prod => prod.id === produto.id);
      if (checarSeProdutoJaNoCarrinho) {
        checarSeProdutoJaNoCarrinho.quantidade += 1;
      } else {
        const produtoParaAdicionar = { ...produto, quantidade: 1 };
        this.carrinho.push(produtoParaAdicionar);
      }

      this.toggleAlert(`${produto.nome} adicionado ao carrinho.`);
    },
    removeItemFromCart(index) {
      this.toggleAlert(`${this.carrinho[index].nome} removido do carrinho.`);

      if (this.carrinho[index].quantidade === 1) {
        this.carrinho.splice(index, 1);
      } else {
        this.carrinho[index].quantidade -= 1;
      }
    }
  },
  watch: {
    carrinho: {
      handler: function() {
        localStorage.clear();
        localStorage.setItem("@Techno:carrinho", JSON.stringify(this.carrinho));
      },
      deep: true
    },
    produto() {
      if (this.produto) {
        document.title = `Techno - ${this.produto.nome}`;
        history.pushState(null, null, `#${this.produto.id}`);
      } else {
        document.title = "Techno";
        history.pushState(null, null, "/");
      }
    }
  },
  created() {
    api.get("produtos").then(res => (this.produtos = res.data));

    const carrinhoSalvo = localStorage.getItem("@Techno:carrinho");
    if (carrinhoSalvo) {
      this.carrinho = JSON.parse(carrinhoSalvo);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.produtos {
  max-width: 900px;
  margin: 100px auto 0;

  .produto {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    background: #ffffff;
    box-shadow: 0 0 2rem rgba($color: #000000, $alpha: 0.1);
    cursor: pointer;

    .produto_img {
      max-width: 300px;
      margin-right: 40px;
    }

    .produto_info {
      .produto.preco {
        color: rgba($color: #000000, $alpha: 0.5);
      }

      .produto_titulo {
        font-size: 3rem;
        line-height: 1;
      }
    }
  }
}
</style>
