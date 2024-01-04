import Swal from "sweetalert2";


export class swalHelper {
  static alertProgressBar(title: string, html: string, timer:number, timerProgressBar: boolean  ) {
    let timerInterval: string | number |  undefined;
    Swal.fire({
      title: title,
      html: html,
      timer: timer,
      timerProgressBar: timerProgressBar,
      didOpen: () => {
        Swal.showLoading();
        let timer: any;
        // @ts-ignore
        timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        // @ts-ignore
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }



}
