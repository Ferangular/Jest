import {FormGroup} from '@angular/forms';
import {alerts} from "./alerts";
import {Usuario} from "../models/usuario";


export class functions{


  /* ***=============================================
 ** Función para validar campos del formulario
 *** ============================================= *** */

	static invalidField(field:string, f:FormGroup, formSubmitted:boolean):boolean{

		if(formSubmitted && f.controls[field].invalid){

		   	return true;

		}else{

			return false;
		}

	}


  static invalidFieldSelect(field:string, f:FormGroup, formSubmitted:boolean, value: number):boolean{

    if(formSubmitted && f.controls[field].invalid && value === null){

      return true;

    }else{

      return false;
    }

  }

  /* ***=============================================
   ***   Función para determinar tamaños de pantalla
   *** ============================================= *** */

  static screenSize(minWidth: number, maxWidth: number): boolean{

    if (window.matchMedia(`(min-width:${minWidth}px) and (max-width:${maxWidth}px)`).matches){

      return true;

    }else{

      return false;
    }

  }

  /* ***=============================================
  ***  Función para validar la imagen
 *** ============================================= *** */

  static validateImage(e:any):any{

    return new Promise(resolve => {

      const image = e.target.files[0];

      /*=============================================
        Validamos el formato
         && image["type"] !== "application/pdf"
         or PDF
        =============================================*/

      if(image["type"] !== "image/jpeg" && image["type"] !== "image/png"){

        alerts.basicAlert('error', 'The image must be in JPG or PNG  format', 'error');

        return;

      }

      /*=============================================
      Validamos el tamaño
      =============================================*/

      else if(image["size"] > 2000000){

        alerts.basicAlert('error', 'Image must not weigh more than 2MB', 'error');

        return;

      }

      /*=============================================
      Mostramos la imagen temporal
      =============================================*/

      else{
        // leer el archivo como una url
        let data = new FileReader();
        data.readAsDataURL(image);

        data.onloadend = () =>{   resolve(data.result);  }

      }


    })

  }


  /* ***=============================================
   *** Función para dar formato a las fechas ->> 2021-08 [año - mes]
 *** ============================================= *** */
  static formatDate(date: Date): any{

    const anyo = date.getFullYear();
    // tengo que tener en cuenta si pasa una cifra o dos
    const mes = ( date.getMonth() + 1);
    // tengo que tener en cuenta si pasa una cifra o dos
    const dia=('0' + date.getDate() ).slice(-2);

    return `${ anyo }-${mes }-${dia}`;
  }

  /* ***=============================================
   ***  Funcion que tras recibir el nombre de la casa de apuesta
   ***   envia el nombre de una clase css
   *** ============================================= *** */
  static colorCasaApuestaWeb( casaApuesta: string): any{
    let clase = '';


    switch (casaApuesta) {
      case ' 888sport' :
        clase= 'circular888Sport';

        break;
      case 'BetWay sport' :
        clase = 'circularBetAway'
        break;
      case 'BetFair':
        clase = '#f7ea2a'
        break;
      default:
        clase = 'otrasCasasApuestas'
        break;
    }
    return clase;

  }

  /* ***=============================================
  *** Funcion que tras recibir el valor numerico de la actividad realizada(apuestas, trading,...)
   *** envia un color: verde= ganador , rojo= perdida
 *** ============================================= *** */

  static colorGanadoPerdido(premio: number){

    return (premio > 0) ? '#f3ffc2' : '#ffa7a1';

  }

  /* ***====================================================================
  *  Funcion que nos separa por colores los trades parametrizados por meses
  *** ==================================================================== *** */
 static  mesColor(fecha: string){

      let mes = new Date( fecha).getMonth();
      // console.log(mes);
      // console.log(this.historial[0].fecha);
      // https://html-color-codes.info/codigos-de-colores-hexadecimales/
      let color = '';

      switch ( mes  ){
        case 0 :
          color  = '#f4bebe'
          break;
        case 1 :
          color = '#f5d8ba'
          break;
        case 2 :
          color = '#f1f3cd'
          break;
        case 3 :
          color = '#edf9c9'
          break;
        case 4 :
          color  ='#cef8bf'
          break;
        case 5 :
          color  ='#bff9bf'
          break;
        case 6 :
          color = '#b9f9da'
          break;
        case 7 :
          color = '#b9f8e8'
          break;
        case 8 :
          color  ='#abe9fb'
          break;
        case 9 :
          color = '#b3c4f5'
          break;
        case 10 :
          color = '#c5c5fc'
          break;
        case 11 :
          color = '#fec0fb'
          break;

        default:
          color = '#fab3c6'
          break;
      }


      return color;
    }


  /* ***=============================================
  *** Funcion que tras recibir el valor numerico de la actividad realizada(apuestas, trading,...)
   *** envia un color: verde= ganador , rojo= perdida
 *** ============================================= *** */

  static colorAltaBajaUsuario(usuario: boolean){

    return (usuario ) ? '#f3ffc2' : '#ffa7a1';

  }

  /*=============================================
Capitalize
=============================================*/
  static  Capitalize(value: string)
  {

    value = value.toLowerCase();

    let names = value.split(' ');

    names = names.map( name => {

      return name[0].toUpperCase() + name.slice(1)

    })

    return names.join(' ');



  }

  /** * =============================================
   * *  Controlar acción usuario con perfil Invitado
   * * =============================================*/

  static controlarAccionUserInvitado(role: string ): boolean {
    if(role ===  "Invitado"){
      // console.log(role)
      alerts.basicAlert('No Autorizado','Contacta con el Administrador','question')
      return false;
    }
    return true;
  }


  /** * =============================================
   * *  Controlar acción usuario con perfil Invitado
   * * =============================================*/
  static obtnerObjetoUsuario( ): any {
    return JSON.parse(sessionStorage.getItem('usuario')!);
  }
  /** * =============================================
   * * Funcion para rendondear a 4 decimales los mercado
   * * M6E 6E
   * * =============================================*/

  static mercadoM6Edecimales(palabra: string): any{

    const contador = palabra.split(".")
    let suma='';
    for (let i = 0; i < 4; i++) {
      // console.log(contador[1][i])
      suma += contador[1][i];
    }
    return parseFloat(`${contador[0]}.${suma}`) ;
  }


  /** * =============================================
   * * Funcion para obtener la fecha en el siguiente
   * * formato 'dd/MM/yyyy'
   * * =============================================*/

  static formatofechaString(): string {
    let fechaHoy = new Date();
    let fechaString ='';
    let FinalMonth: any;
    let FinalDay: any;
    let currentYear = fechaHoy.getUTCFullYear();
    let currentMonth = fechaHoy.getUTCMonth()+1;
    let currentDay = fechaHoy.getDate();// getDay() tomo el valor de la semana Sunday - Saturday : 0 - 6


    if(currentMonth <10){
      FinalMonth = "0" + currentMonth;
    }else{
      FinalMonth = currentMonth;
    }
    if(currentDay <10){
      FinalDay = "0" + currentDay;
    }else{
      FinalDay = currentDay;
    }


    fechaString= `${fechaHoy.getUTCFullYear()}-${FinalMonth}-${FinalDay}`



    return fechaString;
  }

  /** * =============================================
   * * Funcion para obtener dos  fechas Inicio -Fin(mensual):
   * * devuelve en formato objeto { ...}
   * * =============================================*/

  static formatofechaInicioString(): any {
    let fechaHoy = new Date();
    let fechaInicioString:string ='';
    let FinalMonth: any;
    let currentMonth = fechaHoy.getUTCMonth()+1;

    if(currentMonth <10){
      FinalMonth = "0" + currentMonth;
    }else{
      FinalMonth = currentMonth;
    }

    fechaInicioString= `${fechaHoy.getUTCFullYear()}-${FinalMonth}-01`

    return fechaInicioString;
  }

  /** * =============================================
   * * Funcion para obtener la fecha en el siguiente
   * * formato 'dd/MM/yyyy'
   * * =============================================*/

  static formatoHoraString(): string {
    // ${this.fechaHoy.getHours()}:${this.fechaHoy.getMinutes()}:${this.fechaHoy.getSeconds()}
    let horaHoy = new Date();
    let horaString:string  ='';
    let FinalHora: any;
    let FinalMinuto: any;
    let currentMinuto = horaHoy.getHours();
    let currentHora = horaHoy.getMinutes();



    if(currentHora <10){
      FinalHora = "0" + currentHora;
    }else{
      FinalHora = currentHora;
    }
    if(currentMinuto <10){
      FinalMinuto = "0" + currentMinuto;
    }else{
      FinalMinuto = currentMinuto;
    }

    horaString= `${FinalMinuto}:${FinalHora}`

    // console.log(horaString)

    return horaString;
  }




}


