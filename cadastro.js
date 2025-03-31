/* var produtoSelecionado = null

document.querySelectorAll(".btnComprar").forEach(botao => {
    botao.addEventListener("click", e => {
        const cardItem = e.target.closest(".card-item")
        if(cardItem){
            const imagem = cardItem.querySelector(".card-image")
            produtoSelecionado = imagem ? imagem.src : null
        }else{
            produtoSelecionado = null
        }
    })
})

document.querySelector('#btn_form_data-caption').addEventListener('click', async(e) => {
    e.preventDefault(); // Previne o envio do formulário


    // Obtém os valores dos campos
    const nameInput = document.querySelector('#name').value;
    const phoneInput = document.querySelector('#phone').value;

    // Validação do nome
    const namePattern = /^[\p{L}\s]+$/u; // Apenas letras e espaços
    if (nameInput.length < 3) {
        alert("O nome deve ter mais de 2 caracteres.");
        return; // Encerra a execução se a validação do nome falhar
    }
    if (!namePattern.test(nameInput)) {
        alert("O nome não pode conter números.");
        return; // Encerra a execução se o nome contiver números
    }

    // Validação do número de telefone
    let phone = phoneInput.replace(/\D/g, ''); // Remove tudo que não for número
    const phonePattern = /^[0-9]{2}9[0-9]{8}$/; // Expressão regular para o formato DDdnnnnnnnn
    
    if (!phonePattern.test(phone)) {
        alert("O número inserido está incorreto!\n Deve ser inserido apenas o DDD, o dígito 9 e o número sem traços.");
        return; // Encerra a execução se o número de telefone for inválido
    } else {
        phone = `55${phone}`; // Adiciona o código do país
        alert(produtoSelecionado)
        try {
            const response = await fetch('https://lp-quadrosdanaturezaaoseular-back.onrender.com/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone,
                    name: nameInput,
                    productImage: produtoSelecionado
                })
            });
    
            const result = await response.json();
            alert("Aguarde alguns minutos e confira seu WhatsApp!")
        } catch (error) {
            alert(error)
            console.error(error);
        }
    }

    // Se todas as validações passarem, você pode enviar os dados ou realizar outra ação
});
 */


var produtoSelecionado = null;

document.querySelectorAll(".btnComprar").forEach(botao => {
    botao.addEventListener("click", e => {
        const cardItem = e.target.closest(".card-item");
        if (cardItem) {
            const imagem = cardItem.querySelector(".card-image");
            produtoSelecionado = imagem ? imagem.src : null;
        } else {
            produtoSelecionado = null;
        }
    });
});

document.querySelector('#btn_form_data-caption').addEventListener('click', async (e) => {
    e.preventDefault(); // Previne o envio do formulário

    // Obtém os valores dos campos
    const nameInput = document.querySelector('#name').value;
    const phoneInput = document.querySelector('#phone').value;

    // Validação do nome
    const namePattern = /^[\p{L}\s]+$/u; // Apenas letras e espaços
    if (nameInput.length < 3) {
        alert("O nome deve ter mais de 2 caracteres.");
        return;
    }
    if (!namePattern.test(nameInput)) {
        alert("O nome não pode conter números.");
        return;
    }

    // Validação do número de telefone
    let phone = phoneInput.replace(/\D/g, ''); // Remove tudo que não for número
    const phonePattern = /^[0-9]{2}9[0-9]{8}$/; // Formato DD9NNNNNNNN
    if (!phonePattern.test(phone)) {
        alert("O número inserido está incorreto!\n Deve ser inserido apenas o DDD, o dígito 9 e o número sem traços.");
        return;
    } else {
        phone = `55${phone}`; // Adiciona o código do país

        // Configuração da Evolution API
        const evolutionApiUrl = "https://evolution-api.onrender.com/api/v1"; // Substitua pela URL real
        const apiKey = "sua-chave-secreta-aqui"; // Substitua pela chave real
        const instance = "quadrosdanaturezaaoseular";

        let endpoint = `${evolutionApiUrl}/message/sendText/${instance}`;
        let payload = {
            number: phone,
            text: `Olá, ${nameInput}, tudo bem?\n\nSeu cupom de 15% de desconto está garantido! Para utilizá-lo, basta enviar um print ou uma foto do quadro que você deseja adquirir e escolher uma das opções de impressão abaixo:`
        };

        if (produtoSelecionado) {
            endpoint = `${evolutionApiUrl}/message/sendMedia/${instance}`;
            payload = {
                number: phone,
                media: produtoSelecionado,
                mediatype: "image",
                mimetype: "image/png",
                fileName: "quadro_selecionado.png",
                caption: `Olá, ${nameInput}, tudo bem? Seu cupom de 15% de desconto está garantido no produto selecionado!\n\nEscolha abaixo o Tipo de Impressão e Acabamento que você deseja para o quadro:\n\n1. Tela Canvas e Canaleta Flutuante\n2. Tela Canvas e Caixa sem Vidro\n3. Premium em Acrílico e Caixa sem Vidro\n4. Premium em Acrílico e Caixa com Vidro\n\nResponda com o número correspondente à sua escolha.`
            };
        }

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": apiKey
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Erro na Evolution API: ${response.statusText}`);
            }

            const result = await response.json();
            alert("Aguarde alguns minutos e confira seu WhatsApp!");
        } catch (error) {
            alert(`Erro: ${error.message}`);
            console.error(error);
        }
    }
});