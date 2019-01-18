import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  mensaje:string = "";
  elemento:any;

  constructor( public _cs:ChatService) { 

    this._cs.cargarMensajes()
    .subscribe( ()=> {

      setTimeout( ()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20);
    });
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
  }

  

  enviar_mensaje()
  {
    console.log(this.mensaje);
    if( this.mensaje.length === 0){
      return;
    }

    this._cs.agregarMensaje(this.mensaje)
      .then( ()=> this.mensaje = "" )
      .catch( ()=> console.error('Error al enviar', error )); 
  }
}
