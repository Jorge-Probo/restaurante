import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {Http} from '@angular/http';
import {Restaurante} from "../../domain/restaurante/restaurante";
import {Cardapio} from "../../domain/cardapio/cardapio";
import {FazerpedidoPage} from "../fazerpedido/fazerpedido";


@Component({
    selector: 'page-cardapios',
    templateUrl: 'cardapios.html',
})
export class CardapiosPage {

    public restaurante: Restaurante;
    public url: string;
    public cardapios: Cardapio[];

    constructor(
        public navCtrl: NavController,
        private _http: Http,
        public navParams: NavParams,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController

    ) {
        this.restaurante = this.navParams.get('restauranteSelecionado');
        console.log(this.restaurante.nome);
        this.url = "http://marmita.idsgeo.com/index.php/page/get_ionic_cardapio_json/" + this.restaurante.id;
    }

    ngOnInit() {
        let loader = this.loadingCtrl.create({
            content: "Buscando Cardapio... Aguarde..."
        });
        loader.present();
        this._http
            .get(this.url)
            .map(res => res.json())
            .toPromise()
            .then(cardapios => {
                this.cardapios = cardapios;
                loader.dismiss();
            })
            .catch(err => {
                console.log(err);
                loader.dismiss();
                this.alertCtrl
                    .create({
                        title: "Falha no engano",
                        buttons: [{text: 'OK, Estou Ciente !'}],
                        subTitle: "Não foi possível obter a lista do cardapio"
                    }).present();
            });

    }

    submit(cardapio){
    console.log(cardapio.nome);

    this.navCtrl.push(FazerpedidoPage, {cardapioSelecionado: cardapio});

    }


}
