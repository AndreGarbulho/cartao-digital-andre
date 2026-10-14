document.addEventListener("DOMContentLoaded", function () {
  const numero = "5511959434285";

  const formularios = {
    empresarial: document.getElementById("formEmpresarial"),
    semCnpj: document.getElementById("formSemCnpj"),
    troca: document.getElementById("formTroca")
  };

  function fecharFormularios() {
    Object.values(formularios).forEach(function (form) {
      if (form) form.hidden = true;
    });
  }

  document.querySelectorAll("[data-abrir]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      fecharFormularios();

      const form = formularios[botao.dataset.abrir];

      if (form) {
        form.hidden = false;
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  document.querySelectorAll("[data-voltar]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      fecharFormularios();
      document.getElementById("cotacao").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  Object.entries(formularios).forEach(function ([tipo, form]) {
    if (!form) return;

    form.addEventListener("submit", function (evento) {
      evento.preventDefault();

      if (!form.reportValidity()) return;

      const dados = new FormData(form);
      const titulos = {
        empresarial: "Cotação de plano empresarial",
        semCnpj: "Cotação de plano sem CNPJ",
        troca: "Solicitação de troca de plano"
      };

      let mensagem = "Olá, André! Gostaria de solicitar uma cotação.\n";
      mensagem += "\n" + titulos[tipo] + "\n";

      dados.forEach(function (valor, campo) {
        mensagem += "\n" + campo + ": " + valor;
      });

      window.open(
        "https://wa.me/" + numero + "?text=" +
        encodeURIComponent(mensagem),
        "_blank"
      );
    });
  });

  const ano = document.getElementById("year");
  if (ano) ano.textContent = new Date().getFullYear();

  const compartilhar = document.getElementById("shareButton");

  if (compartilhar) {
    compartilhar.addEventListener("click", async function () {
      const dados = {
        title: "André Linares | Planos de Saúde",
        text: "Conheça meu cartão digital e solicite sua cotação!",
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(dados);
        } catch (erro) {}
      } else {
        try {
          await navigator.clipboard.writeText(dados.url);
          alert("Link do cartão copiado!");
        } catch (erro) {
          alert("Copie o link do cartão pela barra do navegador.");
        }
      }
    });
  }
});
