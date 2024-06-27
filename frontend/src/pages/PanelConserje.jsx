// PanelConserje.js
import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from "../context/WebSocketContext";
import Modal from "../context/Modal";
import ConsultaPatente from "./ConsultaPatente";
import ConsultaVisitas from "./ConsultaVisitas";

function ConserjePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const response = useContext(WebSocketContext);

  useEffect(() => {
    if (response && Object.keys(response).length > 0) {
      console.log(response);
      setIsOpen(true);
    }
  }, [response]);

  return (
    <>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      <div
        className={`fixed inset-0 ${
          isOpen ? "bg-black bg-opacity-50 blur-lg" : ""
        }`}
        style={{ zIndex: 10, position: "relative" }}
      >
        <ConsultaVisitas />
      </div>
    </>
  );
}

export default ConserjePanel;
