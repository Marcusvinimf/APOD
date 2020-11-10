class UserModel
{
    constructor() 
    {;
        this._nome = "";
        this._imagem = "";
        this._data = dt.value;
        this._titulo = "";
        this._texto = "";
    }

    buscaUsuario()
    {;

        let request = new XMLHttpRequest();
        
        request.addEventListener( "load", () =>
        {

            if ( request.status == 200 )
            {

                let dados = this._processaResponse( request.responseText );

                this._atualiza( dados );
            }
        })

        request.open( "GET", "https://api.nasa.gov/planetary/apod?api_key=6eqNLTjmF1Rpp9z8AogfOnitMnWuWG2sWrwAHDA6&date=" + this._data, false );

        request.send();
    }

    _processaResponse( responseString )
    {
        let response = JSON.parse( responseString );
        return response;
    }

    _atualiza( dados )
    {

        console.log(dados)
        
        this._nome = dados.copyright;

        if(dados.copyright == undefined){
            this._nome = "Autor desta foto incrivel não encontrado!!!"
        }
        this._imagem = dados.url;
        this._data = dados.date;
        this._titulo = dados.title;
        this._texto = dados.explanation;
    }

    getNome()
    {
        return this._nome;
    }

    getImagem()
    {
        return this._imagem;
    }

    getData()
    {
        return this._data
    }

    getTexto()
    {
        return this._texto
    }

    getTitulo()
    {
        return this._titulo
    }
}


class UserView
{

    constructor() {}

    render( model )
    {
        let card = document.createElement( "div" );
        
        card.innerHTML = `
            <center>
            <p><strong>Data escolhida</strong>: ${model.getData()}</p>
            <p><strong>Nome do Autor</strong>: ${ model.getNome()}</p>
            <img src=${ model.getImagem()}>
            <br><p><strong>Titulo</strong>: ${ model.getTitulo()}</p>
            <p>${model.getTexto()}</p>
            </center>
        `
        document.body.appendChild( card );
    }
}

class UserController
{
    
    constructor() {}

    adicionaUsuario()
    {
        
        let user = new UserModel();
        user.buscaUsuario();

        let view = new UserView();
        view.render( user );

        // let removeBotao = busca.remove()
        // let removeInput = dt.remove()
        let removeh2 = alerta.remove()
    }
}

let controller = new UserController();

document.getElementById( "busca" ).addEventListener( "click", controller.adicionaUsuario );