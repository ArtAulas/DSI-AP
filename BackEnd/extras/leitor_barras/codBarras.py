import cv2 
from pyzbar.pyzbar import decode 

def barcode_reader(image_path): 
    # Carregar a imagem 
    img = cv2.imread(image_path)
    # Decodificar o código de barras 
    detected_barcodes = decode(img)
    if not detected_barcodes:
        print("Código de barras não detectado ou está corrompido!")
    else: 
        for barcode in detected_barcodes: 
            (x, y, w, h) = barcode.rect 
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2) 
            print(f"Tipo: {barcode.type}") 
            print(f"Dados: {barcode.data.decode('utf-8')}")
            # Mostrar a imagem com o código de barras destacado 
            cv2.imshow("Imagem com Código de Barras", img) 
            cv2.waitKey(0)
            cv2.destroyAllWindows()

# Caminho da imagem que contém o código de barras
lista=['Refrigerante','Arroz','Batatas','Bolo']
for l in lista:
    image_path = f"cod_{l}.png"
    print(image_path)
    barcode_reader(image_path)