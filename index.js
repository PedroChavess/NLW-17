const { select } = require('@inquirer/prompts')

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
                console.log("vamos cadastrar")
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