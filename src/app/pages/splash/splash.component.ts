import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { NgZone } from '@angular/core';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.falarMensagem();
  }

  ngOnDestroy() {
    const synth = (window as any).speechSynthesis;
    synth.cancel(); // Cancela qualquer fala pendente
  }

  falarMensagem(): void {
    const synth = (window as any).speechSynthesis;
    const voices = synth.getVoices();

    const vozMaria = voices.find((v: SpeechSynthesisVoice) =>
      v.name === "Microsoft Maria - Portuguese (Brazil)"
    );

    const mensagem = new SpeechSynthesisUtterance(
      "Bem-vindo ao aplicativo 'Caminho Seguro',  Monitoramento de Transporte Escolar. Em instantes, você será redirecionado para a tela de log in."
    );
    mensagem.lang = "pt-BR";
    mensagem.rate = 1;
    mensagem.pitch = 1;

    if (vozMaria) {
      mensagem.voice = vozMaria;
    }

    synth.speak(mensagem);

    mensagem.onend = () => {
      this.ngZone.run(() => {
        this.router.navigate(['/login']);
      })
    };
  }
}


