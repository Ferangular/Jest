import Swal, { SweetAlertIcon } from 'sweetalert2';

export class alerts {

  // ** success   error    warning  info  question
  /*=============================================
  Función para alerta básica
  =============================================*/

  static basicAlert(title: string, text: string, icon: SweetAlertIcon) {

    Swal.fire({title, text, icon, showConfirmButton: false, timer: 1500});

  }


  /*=============================================
Función para alertas con confirmación
=============================================*/

  static confirmAlert(title: string, text: string, icon: SweetAlertIcon, confirmButtonText: string, cancelButtonText= 'Cancelar') {

    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    })

  }


static menuAlert(type: any, text: any, url: any){
  switch (type) {

    case "error":

      if(url == null){

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: text
        })

      }else{

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: text
        }).then((result) => {

          if (result.value) {

            window.open(url, "_top")
          }

        })

      }

      break;

    case "success":

      if(url == null){

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: text
        })

      }else{

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: text
        }).then((result) => {

          if (result.value) {

            window.open(url, "_top")
          }

        })

      }

      break;

    case "loading":

      break;

    case "close":

      Swal.close()

      break;

  }
}


}
