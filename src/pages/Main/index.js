import React, { useEffect } from 'react';

import Quagga from 'quagga';

import { validateIsbn } from "../../services/books";

import { Video } from './styles';

function Main() {
  let scannerAttemps = 0;

  const onDetected = result => {
    Quagga.offDetected();

    const isbn = result.codeResult.code;

    if(validateIsbn(isbn)){
      alert(isbn);
      return;
    }else{
      if(scannerAttemps >= 5){
        alert("Erro QR!");
      }
    }

    scannerAttemps++;
    Quagga.onDetected(onDetected);
  };
  useEffect(() => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#video"),
          constraints:{
            facingMode: 'envirionment',
          },
        },
        numOfWorkers: 1,
        locate: true,
        decoder:{
          readers: ['ean_reader'],
        }
      },
      err => {
        if(err) {
          console.error(err);
          alert("Erro ao abrir camera!");
          return;
        }
        Quagga.start();
      }
      Quagga.onDetected(onDetected);
      );
    }
  }, []);
  return <Video id="video" />;
}

export default Main;
