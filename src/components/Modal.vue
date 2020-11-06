<template>
  <div>
    <section class="modal" v-if="produto" @click="closeThisModal">
      <div class="modal_container">
        <div class="modal_img">
          <img :src="produto.img2" :alt="produto.nome" />
        </div>
        <div class="modal_dados">
          <button class="modal_fechar" @click="closeThisModal">X</button>
          <span class="modal_preco">{{ produto.preco | currency }}</span>
          <h2 class="modal_titulo">{{ produto.nome }}</h2>
          <p>{{ produto.descricao }}</p>
          <button v-if="produto.estoque" class="modal_btn" @click="addItemToCardInModal(produto)">
            Adicionar Item
          </button>
          <button v-else class="modal_btn esgotado" disabled>Produto Esgotado</button>
        </div>
        <div class="avaliacoes">
          <h2 class="avaliacoes_subtitulo">Avaliações</h2>
          <ul>
            <li v-for="(review, index) in produto.reviews" :key="index" class="avaliacao">
              <p class="avaliacao_descricao">{{ review.descricao }}</p>
              <p class="avaliacao_usuario">{{ review.nome }} | {{ review.estrelas }} estrelas</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["produto"],
  methods: {
    closeThisModal(event) {
      if (event.target === event.currentTarget) {
        this.$emit("close");
      }
    },
    addItemToCardInModal(produto) {
      this.$emit("addToCart", produto);
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    background: rgba($color: #000000, $alpha: 0.5);
  }

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 80px;

  display: flex;
  flex-direction: column;
  align-items: center;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate3D(50px, 0, 0);
    }
    to {
      opacity: 1;
      transform: translate3D(0, 0, 0);
    }
  }

  .modal_container {
    position: relative;
    z-index: 1;
    background: linear-gradient(to right, transparent 250px, white 250px);

    display: grid;
    align-items: end;
    gap: 50px;
    padding: 50px 50px 50px 0;

    animation: fadeIn 0.3s;

    .modal_fechar {
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

    .modal_img {
      grid-column: 1;
      box-shadow: 0 3px 4px rgba($color: #000000, $alpha: 0.1),
        0 4px 10px rgba($color: #000000, $alpha: 0.2);

      img {
        max-width: 300px;
        display: block;
      }
    }

    .modal_dados {
      grid-column: 2;
      max-width: 600px;

      .modal_titulo {
        font-size: 3rem;
      }

      .modal_btn {
        margin-top: 80px;
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
      .esgotado {
        background: #808080;
        cursor: not-allowed;
      }
    }

    .avaliacoes {
      grid-column: 2;

      .avaliacoes_subtitulo {
        font-size: 1.75rem;
      }

      .avaliacao {
        border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
        padding-bottom: 20px;

        .avaliacao_descricao {
          color: rgba($color: #000000, $alpha: 0.7);
          margin: 20px 0 5px;
        }

        .avaliacao_usuario {
          font-weight: bold;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .modal {
    padding: 10px;

    .modal_container {
      gap: 20px;
      background: #ffffff;
      padding: 10px 0;

      .modal_img {
        grid-row: 2;

        img {
          width: 100%;
          max-width: initial;
        }
      }

      .modal_dados {
        grid-column: 1;
        padding: 10px;

        .modal_btn {
          margin-top: 20px;
        }
      }

      .avaliacoes {
        grid-column: 1;
        padding: 10px;
      }
    }
  }
}
</style>
