document.addEventListener('DOMContentLoaded', () => {


    /* EXERCÍCIO 1 */


    const statusElement = document.getElementById('loading-status');
    const spinnerElement = document.getElementById('spinner');

    if (statusElement && spinnerElement) {

        statusElement.textContent = "Inicializando..."; 
        
        setTimeout(() => {

            statusElement.textContent = "Carregando módulos..."; 
            
            setTimeout(() => {

                statusElement.textContent = "Sistema pronto!"; 
                spinnerElement.classList.add('hidden'); 
            }, 4000);
        }, 1000);
    }


    /*EXERCÍCIO 2 */

    const hostInput = document.getElementById('host-input');
    const pingButton = document.getElementById('ping-button');
    const pingOutput = document.getElementById('ping-output');


    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    /**
     * a) Função assíncrona que simula o ping
     * @param {string} host - O host a ser pingado
     */
    async function simularPing(host) {

        pingOutput.textContent = '';
        pingButton.disabled = true;

        const fakeIp = `[${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}]`;
        const TTL = Math.floor(Math.random() * 50) + 100; // TTL falso, ex: 114

        pingOutput.textContent += `Disparando ${host} ${fakeIp} com 32 bytes de dados:\n\n`;

        let tempos = [];
        const pacotesEnviados = 4;


        for (let i = 0; i < pacotesEnviados; i++) {
            await delay(1000);

            const tempo = Math.floor(Math.random() * 100) + 10; 
             tempos.push(tempo);

 
            pingOutput.textContent += `Resposta de ${fakeIp.slice(1, -1)}: bytes=32 tempo=${tempo}ms TTL=${TTL}\n`;
        }

        const min = Math.min(...tempos);
        const max = Math.max(...tempos);
        const media = Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length);

        pingOutput.textContent += `\nEstatísticas do Ping para ${fakeIp.slice(1, -1)}:\n`;
        pingOutput.textContent += `    Pacotes: Enviados = 4, Recebidos = 4, Perdidos = 0 (0% de perda),\n`;
        pingOutput.textContent += `Aproximar um número redondo de vezes em milissegundos:\n`;
        pingOutput.textContent += `    Minimo = ${min}ms, Máximo = ${max}ms, Média = ${media}ms\n`;


        pingButton.disabled = false;
    }

    // b) Ao clicar em um botão, a página deve "pingar"
    if (pingButton) {
        pingButton.addEventListener('click', () => {
            const host = hostInput.value;
            if (host) {
                simularPing(host);
            } else {
                pingOutput.textContent = "Por favor, informe um host para pingar.";
            }
        });
    }

    /*Exercicio 3*/
    const startOrderButton = document.getElementById('start-order-button');
    const orderStatusCard = document.getElementById('order-status-card');
    const orderStatusText = document.getElementById('order-status-text');
    const orderEta = document.getElementById('order-eta');
    const orderProgressBar = document.getElementById('order-progress-bar');
    
    const orderSteps = [
        { text: "Pedido confirmado, logo seus itens serão separados.", duration: 2000, progress: 25 }, 
        { text: "Seu pedido está sendo preparado.", duration: 6000, progress: 50 }, 
        { text: "O entregador saiu para levar seu pedido.", duration: 4000, progress: 75 }, 
        { text: "Pedido entregue! Bom apetite!", duration: 1000, progress: 100 } 
    ];

    async function iniciarPedido() {
        startOrderButton.disabled = true;
        startOrderButton.textContent = "Acompanhando Pedido...";
        orderStatusCard.classList.remove('hidden');
        
        orderProgressBar.style.transition = 'none'; 
        orderProgressBar.style.width = '0%';
        
        await delay(20); 
        
        orderProgressBar.style.transition = 'width 0.5s ease-in-out';
        
        orderStatusText.textContent = "Confirmando pedido com a loja..."; 
        orderEta.textContent = "Previsão de entrega: 20:00 - 20:10";
        orderProgressBar.style.width = '10%';
        
        await delay(1500); 
        
        for (const step of orderSteps) {
            orderStatusText.textContent = step.text;
            orderProgressBar.style.width = `${step.progress}%`;
            await delay(step.duration);
        }
        
        orderEta.textContent = "Pedido finalizado.";
        startOrderButton.disabled = false;
        startOrderButton.textContent = "Fazer Novo Pedido";
    }
    
    if (startOrderButton) {
        startOrderButton.addEventListener('click', iniciarPedido);
    }


    /* LÓGICA EXERCÍCIO 4  */
   
    
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const loginButton = document.getElementById('login-button');
    const loginStatus = document.getElementById('login-status');
    
    function simularLogin(usuario, senha) {
        return new Promise((resolve, reject) => {
            
            setTimeout(() => {
                if (usuario === 'admin' && senha === '123456') {
                    resolve('Login realizado com sucesso');
                } else {
                    reject('Usuário e/ou senha inválidos');
                }
            }, 3000); 
        });
    }
    
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const usuario = loginUsernameInput.value;
            const senha = loginPasswordInput.value;
            
            loginButton.disabled = true;
            loginStatus.textContent = 'Verificando...';
            loginStatus.className = ''; 

            simularLogin(usuario, senha)
                .then((mensagemSucesso) => {
                    loginStatus.textContent = mensagemSucesso;
                    loginStatus.classList.add('success');
                })
                .catch((mensagemErro) => {
                    loginStatus.textContent = mensagemErro;
                    loginStatus.classList.add('error');
                })
                .finally(() => {
                    loginButton.disabled = false;
                });
        });
    }

});

/* EXERCÍCIO 5 - Sorteio com Promise */

const startSorteioBtn = document.getElementById('start-sorteio');
const sorteioResultado = document.getElementById('sorteio-resultado');

function sorteio() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const numero = Math.floor(Math.random() * 10) + 1;
            if (numero > 5) {
                resolve(` Você ganhou! Número sorteado: ${numero}`);
            } else {
                reject(` Tente novamente. Número: ${numero}`);
            }
        }, 1000);
    });
}

async function iniciarSorteio() {
    startSorteioBtn.disabled = true;
    sorteioResultado.textContent = "Sorteando...";
    
    let ganhou = false;
    while (!ganhou) {
        try {
            const mensagem = await sorteio();
            sorteioResultado.textContent = mensagem;
            ganhou = true;
        } catch (erro) {
            sorteioResultado.textContent = erro;
            await new Promise(res => setTimeout(res, 1000));
        }
    }

    startSorteioBtn.disabled = false;
}

// Ativa o botão
if (startSorteioBtn) {
    startSorteioBtn.addEventListener('click', iniciarSorteio);
}
