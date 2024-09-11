const start= () => {
    let count = 0
    while(true){
        let opcao = "sair"
        switch(opcao) {
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case  "listar":
                console.log("vamos listar")
                break
            case "sair":
                return //não precisa de um break pois não possui nada mais abaixo do return
        }
        
    }
}

start()