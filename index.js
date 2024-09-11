const { select, input } = require('@inquirer/prompts')

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
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a próxima!")
                return //não precisa de um break pois não possui nada mais abaixo do return
        }
        
    }
}

start()