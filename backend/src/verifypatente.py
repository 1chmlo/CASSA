import easyocr
import cv2
import numpy as np
import re
import sys
import json
# Inicializa el lector de EasyOCR
reader = easyocr.Reader(['en'])

def verify_plate(image_data):
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Función para detectar matrículas
    def detectar_matricula(image):
        # Convertir la imagen a escala de grises
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Aplicar un desenfoque gaussiano para reducir el ruido
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)

        # Aplicar la detección de bordes con Canny
        edges = cv2.Canny(blurred, 50, 150)

        # Encontrar contornos en la imagen
        contours, _ = cv2.findContours(edges.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # Filtrar contornos que podrían ser una matrícula
        matriculas = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > 6000:  # Ajustar este umbral según el tamaño de las matrículas en tu imagen
                peri = cv2.arcLength(contour, True)
                approx = cv2.approxPolyDP(contour, 0.02 * peri, True)
                if len(approx) == 4:
                    matriculas.append(approx)

        return matriculas

    # Función para recortar la matrícula
    def recortar_matricula(image, matriculas):
        # Recortar la primera matrícula detectada
        if matriculas:
            x, y, w, h = cv2.boundingRect(matriculas[0])
            return image[y:y+h, x:x+w]
        return None

    # Detectar la matrícula en la imagen
    matriculas_detectadas = detectar_matricula(image)
    matricula_recortada = recortar_matricula(image, matriculas_detectadas)

    if matricula_recortada is not None:
        # Convierte la imagen recortada a RGB
        image_rgb = cv2.cvtColor(matricula_recortada, cv2.COLOR_BGR2RGB)

        # Utiliza EasyOCR para leer el texto en la imagen recortada
        result = reader.readtext(image_rgb)

        # Procesa los resultados para encontrar la matrícula
        matricula = ''
        for (bbox, text, prob) in result:
            if matricula == '' or prob > 0.55:  # Ajusta el umbral de probabilidad según sea necesario
                matricula = text

        # Limpia la matrícula encontrada
        matricula_limpia = re.sub(r'[^A-Za-z0-9]', '', matricula)

        return json.dumps({
            "patente": matricula_limpia
        })
    else:
        return {
            'error': 'No se pudo detectar la matrícula en la imagen'
        }

# Recibe la imagen como un argumento de línea de comandos
if __name__ == '__main__':
    image_path = sys.argv[1]
    with open(image_path, 'rb') as f:
        image_data = f.read()
    result = verify_plate(image_data)
    print(result)
