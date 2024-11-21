from barcode import EAN13,UPCA,Code39,Code128
#EAN-13,UPC-A,Code 39,Code 128
from barcode.writer import ImageWriter

def gera_barras(texto,n):
    num=str(hash(texto))[1:13]#gera número de 12 dígitos a partir da string texto
    print(num)
    if n=='ean13':
        codigo=EAN13(num,writer=ImageWriter())
    elif n=='upca':
        codigo=UPCA(num,writer=ImageWriter())
    elif n=='code39':
        codigo=Code39(num,writer=ImageWriter())
    elif n=='code128':
        codigo=Code128(num,writer=ImageWriter())
    codigo.save(f'cod_{texto}')

textos={'ean13':'Refrigerante','upca':'Arroz','code39':'Batatas','code128':'Bolo'}
for t in textos.keys():
    gera_barras(textos[t],t)