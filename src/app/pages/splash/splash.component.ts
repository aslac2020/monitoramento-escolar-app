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
    this.carregarVozesEFalar();
  }

  ngOnDestroy() {
    const synth = (window as any).speechSynthesis;
    synth.cancel();
  }

  carregarVozesEFalar(): void {
    const synth = (window as any).speechSynthesis;

    // Força o carregamento das vozes
    const voices = synth.getVoices();

    if (voices.length > 0) {
      this.falarMensagem();
    } else {
      // Aguarda evento voiceschanged
      const onVoicesChanged = () => {
        synth.removeEventListener('voiceschanged', onVoicesChanged);
        this.falarMensagem();
      };
      synth.addEventListener('voiceschanged', onVoicesChanged);

      // Fallback: tenta novamente após 100ms
      setTimeout(() => {
        if (synth.getVoices().length > 0) {
          synth.removeEventListener('voiceschanged', onVoicesChanged);
          this.falarMensagem();
        }
      }, 100);
    }
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
        this.router.navigate(['/auth/login']);
      })
    };
  }
}


