import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button, Card, Input, Label } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CrudResidentes = () => {
    const [residentes, setResidentes] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { registrarResidente } = useAuth();
    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);
    const [currentResidente, setCurrentResidente] = useState(null);

    const fetchResidentes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/casas', { withCredentials: true });
            setResidentes(response.data);
        } catch (error) {
            console.error('Error fetching residentes:', error);
        }
    };

    useEffect(() => {
        fetchResidentes();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        if (editing) {
            try {
                await axios.put(`http://localhost:4000/api/casas/${currentResidente.id}`, data, { withCredentials: true });
                fetchResidentes();
                setEditing(false);
                reset();
            } catch (error) {
                console.error('Error updating residente:', error);
            }
        } else {
            try {
                await registrarResidente(data);
                fetchResidentes();
                reset();
            } catch (error) {
                console.error('Error creating residente:', error);
            }
        }
    });

    const editResidente = (residente) => {
        setEditing(true);
        setCurrentResidente(residente);
        reset(residente);
    };

    const deleteResidente = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/casas/${id}`, { withCredentials: true });
            fetchResidentes();
        } catch (error) {
            console.error('Error deleting residente:', error);
        }
    };

    return (
        <div>
            <h1>CRUD Residentes</h1>
            <Card>
                <h3 className="text-2xl font-bold">Registro Casa</h3>
                <form onSubmit={onSubmit}>
                    <Label htmlFor="numero">Numero Casa</Label>
                    <Input placeholder="ingrese numero casa" {...register("numero", { required: true })} />
                    {errors.numero && (<p className="text-red-500">El numero es obligatorio</p>)}
                    <Label htmlFor="calle">Calle Casa</Label>
                    <Input placeholder="ingrese calle" {...register("calle", { required: true })} />
                    {errors.calle && (<p className="text-red-500">La calle es obligatoria</p>)}
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" placeholder="ingrese email" {...register("email", { required: true })} />
                    {errors.email && (<p className="text-red-500">El email es obligatorio</p>)}
                    <Label htmlFor="contrasena">Contraseña</Label>
                    <Input type="password" placeholder="ingrese contraseña" {...register("contrasena", { required: true })} />
                    {errors.contrasena && (<p className="text-red-500">La contraseña es obligatoria</p>)}
                    <Button type="submit">Registrar Casa</Button>
                </form>
            </Card>
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Calle</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {residentes.map((residente) => (
                        <tr key={residente.id}>
                            <td>{residente.numero}</td>
                            <td>{residente.calle}</td>
                            <td>{residente.email}</td>
                            <td>
                                <button onClick={() => editResidente(residente)}>Editar</button>
                                <button onClick={() => deleteResidente(residente.id)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrudResidentes;
