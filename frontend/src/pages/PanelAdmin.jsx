import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import LineChartPermitido from "../components/LineChartPermitido";
import LineChartNoPermitido from "../components/LineChartNoPermitido";

function PanelAdmin() {
  return (
    <div className="container-fluid">
      <h1 className="bg-zinc-900 text-center font-monospace fw-bold lh-base">
        CASSA
      </h1>

      <div className="row">
        <div className="col">
          <div className="card border-primary mb-3">
            <div className="card-header bg-primary text-white">
              <b>GRÁFICO DE INGRESOS PERMITIDOS</b>
            </div>
            <div className="card-body">
              <LineChartPermitido />
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card border-secondary mb-3">
            <div className="card-header bg-secondary text-white">
              <b>GRÁFICO DE INGRESOS NO PERMITIDOS</b>
            </div>
            <div className="card-body">
              <LineChartNoPermitido />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelAdmin;
