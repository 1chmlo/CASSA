import { Link } from "react-router-dom"
import { Button, Card, Input, Label } from "../components/ui";
function PanelAdmin(){
    return(
        <>
    <Card>
        <Link to="/register/residente">
        <Button>REGISTRAR RESIDENTE</Button>
        </Link>
    </Card>

    <Card>
        <Link to="/admin/panel/crud/residentes">
        <Button>Panel Residentes</Button>
        </Link>
    </Card>

    <Card>
    <Link to="/register/conserje">
      <Button>REGISTRAR CONSERJE</Button>
    </Link>
    </Card>
    
    <Card>
    <Link to="/register/admin">
    <Button>REGISTRAR ADMIN</Button>
    </Link>
    </Card>
    
        
        </>
        
    )
}
export default PanelAdmin