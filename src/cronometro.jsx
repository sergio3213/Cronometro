import React from "react";

class Cronometro extends React.Component {
  constructor() {
    super();
    this.state = {
      milesimos: 0,
      minutos: 0,
      segundos: 0,
      setIntervalFunc: 0,
      iniciado: false,
    };

    this.iniciar = this.iniciar.bind(this);
    this.parar = this.parar.bind(this);
    this.zerar = this.zerar.bind(this);
  }
  iniciar() {
    this.setState(() => ({ iniciado: true }));
    if (!this.state.iniciado) {
      const setInt = setInterval(() => {
        this.setState((prevState) => ({ milesimos: prevState.milesimos + 1 }));
        if (this.state.milesimos === 250) {
          this.setState(() => ({ milesimos: 0 }));
          this.setState((prevState) => ({ segundos: prevState.segundos + 1 }));
        }

        if (this.state.segundos === 60) {
          this.setState(() => ({ segundos: 0 }));
          this.setState((prevState) => ({ minutos: prevState.minutos + 1 }));
        }
      }, "0.1");

      this.setState(() => ({ setIntervalFunc: setInt }));
    }
  }
  parar() {
    this.setState(() => ({ iniciado: false }));
    clearInterval(this.state.setIntervalFunc);
  }

  zerar() {
    this.setState(() => ({ iniciado: false }));
    clearInterval(this.state.setIntervalFunc);
    this.setState(() => ({ milesimos: 0, segundos: 0, minutos: 0 }));
  }

  render() {
    const minutos = String(this.state.minutos).padStart(2, 0);

    const segundos = String(this.state.segundos).padStart(2, 0);

    const milissegundos = String(this.state.milesimos)
      .padStart(2, 0)
      .substring(0, 2);

    return (
      <div>
        <h1>cronometro</h1>
        <h2>
          {minutos}:{segundos}:{milissegundos}
        </h2>
        <button onClick={this.iniciar}>Iniciar</button>
        <button onClick={this.parar}>Parar</button>
        <button onClick={this.zerar}>Zerar</button>
      </div>
    );
  }
}

export default Cronometro;
