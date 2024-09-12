const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}
let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input ({message: "Digite a meta:"})

    if(meta.length == 0) {
        console.log('A meta não pode ser vazia.')
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({//coleta de dados
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.",
        choices: [...metas],//os 3 pontinhos está puxando tudo que está dentro de metas
        instructions: false,
    })

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada! ")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })


    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcada(s) como concluída(s)')

}

const metasRealizadas = async () => {
    const realizadas = metas.filter( (meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        console.log('Não existem metas realizadas! :(')
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
}

const start= async () => {
    while(true){
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
                    name: "Sair",
                    value: "sair"
                }
            ] 
        }) 


        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case  "listar":
                await listarMetas()
                break

            case "realizadas":
                await metasRealizadas()
                break
            
            case "sair":
                console.log("Até a próxima!")
                return //não precisa de um break pois não possui nada mais abaixo do return
        }
        
    }
}

start()