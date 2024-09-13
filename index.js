const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let mensagem = "Bem vindo ao App de Metas!";

let metas

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2)) //as duas últimas informações, são apenas pra configurar o arquivo JSON
}

const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta:"})

    if(meta.length == 0) {
        mensagem = 'A meta não pode ser vazia.'
        return
    }

    metas.push(
        { value: meta, checked: false }
    )

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }
    const respostas = await checkbox({//coleta de dados
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices: [...metas],//os 3 pontinhos está puxando tudo que está dentro de metas
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada! "
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = 'Meta(s) marcada(s) como concluída(s)'

}

const metasRealizadas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }
    const realizadas = metas.filter( (meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas! :('
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const abertas = metas.filter((meta) => {//entra como falso (não marcado nas metas realizadas), mas precisa se tornar verdadeiro para que entre no filtro (entre como meta aberta)
        return meta.checked != true//invertendo o valor de um booleano
    })

    if(abertas.length == 0) {
       mensagem = "Não existem metas abertas! :)"
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }
    
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })
    const itemsADeletar = await checkbox({
        messasge: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itemsADeletar.length == 0) {
        mensagem = "Nenhum item para deletar!"
        return
    }

    itemsADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com suscesso!"
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    await carregarMetas()
    
    while(true){
        mostrarMensagem()
        await salvarMetas()
        //sempre que uma constante tem o await (aguardar), a função precisa de ser async
        const opcao = await select({ //o await está esperando uma função que é uma promessa, uma promessa que o usuário vai escrever essas coisas
                message: "Menu>",
                choices: [ //choices tem que ser um array 
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ] 
        }) 


        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case  "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break
            
            case "abertas":
                await metasAbertas()
                break
            
            case "deletar":
                await deletarMetas()
                break

            case "sair":
                console.log("Até a próxima!")
                return //não precisa de um break pois não possui nada mais abaixo do return
        }
        
    }
}

start()