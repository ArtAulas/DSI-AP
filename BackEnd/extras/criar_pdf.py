from fpdf import FPDF

def gerar_pdf(dici, nome):
    pdf = FPDF()
    pdf.add_page()
    tab='\t'
    # Título
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Cupom Fiscal", ln=True, align='C')

    # Informações do cliente
    pdf.cell(200, 10, txt=f"Nome do Cliente: {dici['nome']}", ln=True, align='L')
    pdf.cell(200,10,txt=f"CPF: {dici['cpf']}",ln=True, align='L')
    pdf.cell(200,10,txt=f"Endereço: {dici['endereco']}",ln=True, align='L')
    pdf.cell(200,10,txt='',ln=True,align='C')

    #Info Restaurante
    pdf.cell(200,10,txt=f"Restaurante: {dici['restaurante']}",ln=True,align='L')
    pdf.cell(200,10,txt=f"CNPJ: {dici['cnpj']}",ln=True,align='L')
    pdf.cell(200,10,txt=f"CEP: {dici['cep_rest']} Localidade: {dici['local_rest']}",ln=True,align='L')
    pdf.cell(200,10,txt='',ln=True,align='C')

    # Itens
    pdf.cell(200, 10, txt="Itens:", ln=True, align='L')
    pdf.cell(200,10,txt=f"   Produto |Qtd |Preço |Total",ln=True,align='L')
    for item in dici['itens']:
        pdf.cell(200,10,txt=f"___{item['produto']} |{tab}{item['qtd']} |{tab}{item['preco_uni']} |{tab}{item['total_item']}",ln=True,align='L')

    # Total
    pdf.cell(200,10,txt='',ln=True,align='C')
    pdf.cell(200, 10, txt=f"Total da Compra: R$ {dici['total']:.2f}", ln=True, align='L')

    # Salvar arquivo
    pdf.output(nome)
    print(f"Cupom fiscal salvo como {nome}")