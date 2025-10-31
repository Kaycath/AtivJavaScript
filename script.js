// Aguarda o conteúdo do DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

    /* ======================= */
    /* LÓGICA EXERCÍCIO 1    */
    /* ======================= */
    
    // Seleciona os elementos do Exercício 1
    const statusElement = document.getElementById('loading-status');
    const spinnerElement = document.getElementById('spinner');

    // Garante que os elementos existem antes de tentar usá-los
    if (statusElement && spinnerElement) {
        // Etapa 1: "Inicializando..." (aguarda 1s)
        statusElement.textContent = "Inicializando..."; 
        
        setTimeout(() => {
            // Etapa 2: "Carregando módulos..." (aguarda 4s)
            statusElement.textContent = "Carregando módulos..."; 
            
            setTimeout(() => {
                // Etapa 3: "Sistema pronto!"
                statusElement.textContent = "Sistema pronto!"; 
                spinnerElement.classList.add('hidden'); 
            }, 4000); // 4 segundos de espera
        }, 1000); // 1 segundo de espera
    }

    /* ======================= */
    /* LÓGICA EXERCÍCIO 2    */
    /* ======================= */

    // Seleciona os elementos do Exercício 2
    const hostInput = document.getElementById('host-input');
    const pingButton = document.getElementById('ping-button');
    const pingOutput = document.getElementById('ping-output');

    // Função auxiliar para criar pausas (delay)
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    /**
     * a) Função assíncrona que simula o ping
     * @param {string} host - O host a ser pingado
     */
    async function simularPing(host) {
        // Limpa a saída anterior e desabilita o botão
        pingOutput.textContent = '';
        pingButton.disabled = true;

        // Gera um IP falso para o host
        const fakeIp = `[${Math.floor(Math.random() * 254) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}]`;
        const TTL = Math.floor(Math.random() * 50) + 100; // TTL falso, ex: 114

        // c) Simula a saída real do comando
        pingOutput.textContent += `Disparando ${host} ${fakeIp} com 32 bytes de dados:\n\n`;

        let tempos = [];
        const pacotesEnviados = 4;

        // b) "pingar" 4 vezes de forma pausada
        for (let i = 0; i < pacotesEnviados; i++) {
            await delay(1000); // Pausa de 1s entre cada ping

            const tempo = Math.floor(Math.random() * 100) + 10; // Tempo aleatório (ex: 10ms, 116ms)
            tempos.push(tempo);

            // Simula a linha de Resposta
            pingOutput.textContent += `Resposta de ${fakeIp.slice(1, -1)}: bytes=32 tempo=${tempo}ms TTL=${TTL}\n`;
        }

        // Estatísticas
        const min = Math.min(...tempos);
        const max = Math.max(...tempos);
        const media = Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length);

        pingOutput.textContent += `\nEstatísticas do Ping para ${fakeIp.slice(1, -1)}:\n`;
        pingOutput.textContent += `    Pacotes: Enviados = 4, Recebidos = 4, Perdidos = 0 (0% de perda),\n`;
        pingOutput.textContent += `Aproximar um número redondo de vezes em milissegundos:\n`;
        pingOutput.textContent += `    Minimo = ${min}ms, Máximo = ${max}ms, Média = ${media}ms\n`;

        // Reabilita o botão
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

});