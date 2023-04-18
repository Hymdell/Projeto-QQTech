import smtplib
import requests
import io
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
import pandas as pd
from data import idWork, email_de, email_de_senha, email_para, url, token

class Objeto(BaseModel):
    data_inicio: str
    dias: int
    data_final: str
    matricula: int


app = FastAPI()


@app.get("/")
def teste_get():
    return {"message": "Teste"}


@app.post("/envioNotificacao")
async def Notificacao(request: Request):
    obj = await request.json()
    email_para_str = ", ".join(email_para)
    message = MIMEMultipart()
    message['From'] = email_de
    message['To'] = email_para_str
    message['Subject'] = 'Solicitação de Férias'
    body = f"""Olá,
    
    Segue abaixo os dados da solicitação de férias:
    
    Data de início: {obj['data_inicio']}
    Dias de férias: {obj['dias']}
    Data final: {obj['data_final']}
    Matrícula: {obj['matricula']}
    
    Atenciosamente,
    Equipe do seu sistema"""
    message.attach(MIMEText(body, 'plain'))
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(email_de, email_de_senha)
    text = message.as_string()
    server.sendmail(email_de, email_para, text)
    server.quit()
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    data = {
    "messagin_type": "UPDATE",
    "recipient": {
        "id": idWork
    },
    "message": {
        "text": """Olá,

        Segue abaixo os dados da solicitação de férias:

        Data de início: """ + str(obj['data_inicio']) +
        """
        Dias de férias: """ + str(obj['dias']) +
        """
        Data final: """ + str(obj['data_final']) +
        """
        Matrícula: """ + str(obj['matricula']) + """

        Atenciosamente,
        Equipe do seu sistema"""
    }
}

    response = requests.post(url, headers=headers, json=data)

    return {"mensagem": "EXITO"}


@app.post("/relatorioEquipePy")
def relatorio_equipe(colaboradores: list):
    if not colaboradores:
        raise HTTPException(status_code=400, detail="Nenhum dado foi enviado.")

    df = pd.DataFrame(colaboradores)
    df = df.loc[:, ['matricula', 'nome', 'emailqq', 'gmail',
                    'contrato', 'funcao', 'tipo', 'dataingresso', 'gestor', 'status']]
    df = df.rename(columns={
        'matricula': 'Matricula',
        'nome': 'Nome',
        'emailqq': 'EmailQQ',
        'gmail': 'Gmail',
        'contrato': 'Contrato',
        'funcao': 'Função',
        'tipo': 'Tipo',
        'dataingresso': 'Data Ingresso',
        'gestor': 'Gestor',
        'status': 'Status'
    })

    csv_data = io.StringIO()
    df.to_csv(csv_data, index=False, sep=';', encoding='utf-8-sig')

    csv_bytes = csv_data.getvalue().encode('utf-8-sig')
    b64 = base64.b64encode(csv_bytes).decode()
    href = f'data:text/csv;base64,{b64}'
    return {'download_link': href}


@app.post("/relatorioMinhasPy")
def relatorio_equipe(colaboradores: list):
    if not colaboradores:
        raise HTTPException(status_code=400, detail="Nenhum dado foi enviado.")

    df = pd.DataFrame(colaboradores)
    df = df.loc[:, ['datacriacao', 'datainicio', 'dias',
                    'datafinal', 'status', 'decimoterceiro']]
    df = df.rename(columns={
        'datacriacao': 'Data Criação',
        'datainicio': 'Data Inicio',
        'dias': 'Dias',
        'datafinal': 'Data Final',
        'status': 'Status',
        'decimoterceiro': 'Decimo Terceiro'
    })
    df['Decimo Terceiro'] = df['Decimo Terceiro'].replace(
        {True: 'SIM', False: 'NÃO'})

    csv_data = io.StringIO()
    df.to_csv(csv_data, index=False, sep=';', encoding='utf-8-sig')

    csv_bytes = csv_data.getvalue().encode('utf-8-sig')
    b64 = base64.b64encode(csv_bytes).decode()
    href = f'data:text/csv;base64,{b64}'
    return {'download_link': href}


@app.post("/relatorioTodasPy")
def relatorio_equipe(colaboradores: list):
    if not colaboradores:
        raise HTTPException(status_code=400, detail="Nenhum dado foi enviado.")

    df = pd.DataFrame(colaboradores)
    df = df.loc[:, ['colaborador', 'datacriacao', 'datainicio',
                    'dias', 'datafinal', 'status', 'decimoterceiro']]
    df = df.rename(columns={
        'colaborador': 'Colaborador',
        'datacriacao': 'Data Criação',
        'datainicio': 'Data Inicio',
        'dias': 'Dias',
        'datafinal': 'Data Final',
        'status': 'Status',
        'decimoterceiro': 'Decimo Terceiro'
    })
    df['Decimo Terceiro'] = df['Decimo Terceiro'].replace(
        {True: 'SIM', False: 'NÃO'})

    csv_data = io.StringIO()
    df.to_csv(csv_data, index=False, sep=';', encoding='utf-8-sig')

    csv_bytes = csv_data.getvalue().encode('utf-8-sig')
    b64 = base64.b64encode(csv_bytes).decode()
    href = f'data:text/csv;base64,{b64}'
    return {'download_link': href}
