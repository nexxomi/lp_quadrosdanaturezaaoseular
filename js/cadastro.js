var produtoSelecionado = null

// Pegando a URL da Imagem do produto selecionado
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

// Validação e envio de dados para o back-end e para o Google Sheets
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
    
    // Construção do objeto 'data' para ser enviado ao Google Sheets
    const data = {
        name: nameInput,
        phone: phone,
        productImage: produtoSelecionado || ''
    };

    // Enviar dados para o Google Sheets
    try {
        const registerResponse = await fetch('https://lp-quadrosdanaturezaaoseular-back.onrender.com/register-lead', {
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

        const registerResult = await registerResponse.json();
        if (registerResult.status !== 'success') {
            throw new Error(registerResult.error || 'Erro ao registrar o lead');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao enviar dados para o Google Sheets');
        return; // Encerra a execução se falhar ao enviar para o Google Sheets
    }


    // Enviar dados para o back-end
    if (!phonePattern.test(phone)) {
        alert("O número inserido está incorreto!\n Deve ser inserido apenas o DDD, o dígito 9 e o número sem traços.");
        return; // Encerra a execução se o número de telefone for inválido
    } else {
        phone = `55${phone}`; // Adiciona o código do país
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
});
