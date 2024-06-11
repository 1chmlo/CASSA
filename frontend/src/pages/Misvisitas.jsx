import { Button, Card, Input, Label } from "../components/ui";
import { Link } from "react-router-dom";
function Misvisitas() {
  return (
    <body>
      <Link to="/residente/agregarvisitas">
        <Button>AGREGAR VISITA</Button>
      </Link>
      <div class="mx-auto max-w-2xl">
        <table
          id="hola"
          class="min-w-full divide-y divide-gray-400 shadow overflow-hidden border border-gray-200 rounded-lg"
        >
          <thead class="bg-gray-250">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Apellido
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Rut
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Fecha
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Activa
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">HTTP</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  Hypertext Transfer Protocol
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  );
}
export default Misvisitas;
