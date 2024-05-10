import os
from tkinter import filedialog
import subprocess
import platform
from datetime import datetime
from cryptography.fernet import Fernet
import json



class Licencia:
    def __init__(self, usuario, uuid):
        self.usuario = usuario
        self.uuid = uuid
        self.activado = False
        self.fecha = datetime.now().date()

def generar_txt(licencia):
    filename = "Westlicencia.txt"
    with open(filename, "w") as f:
        f.write(f"Usuario: {licencia.usuario}\nUUID: {licencia.uuid}\nFecha: {licencia.fecha}\nactivado: {licencia.activado}\n")

def obtener_uuid():
    sistema_operativo = platform.system()
    if sistema_operativo == 'Linux':
        return obtener_uuid_linux()
    elif sistema_operativo == 'Windows':
        return obtener_uuid_windows()
    else:
        print("Sistema operativo no compatible:", sistema_operativo)
        return None

def obtener_uuid_linux():
    try:
        uuid = subprocess.check_output(['sudo', 'dmidecode', '-s', 'system-uuid']).decode().strip()
        return uuid
    except Exception as e:
        print("Error al obtener UUID en Linux:", e)
        return None

def obtener_uuid_windows():
    try:
        uuid = subprocess.check_output(['wmic', 'csproduct', 'get', 'UUID']).decode().split('\n')[1].strip()
        return uuid
    except Exception as e:
        print("Error al obtener UUID en Windows:", e)
        return None

def extraer_clave_de_archivo(nombre_archivo):
    with open(nombre_archivo, "rb") as file:
        contenido_encriptado = file.read()   
    longitud_clave = int(contenido_encriptado[-2:])
    clave = contenido_encriptado[-(longitud_clave + 2):-2]
    return clave
def desencriptar_archivo():
    archivo_seleccionado = filedialog.askopenfilename(filetypes=[('Archivo de texto', '*.txt')])

    if archivo_seleccionado:
        clave =extraer_clave_de_archivo(archivo_seleccionado)
        f = Fernet(clave)
        with open(archivo_seleccionado, "rb") as file:
            archivo_info = file.read()
        decrypted_data = f.decrypt(archivo_info)
        datos_json = json.loads(decrypted_data)
        return datos_json
    else:
        print("No se seleccionó ningún archivo.")
        return None

from datetime import datetime


def verificar_licencia(licencia):
    fecha_actual = datetime.now()
    if licencia.get('UUID') == obtener_uuid() and licencia.get('activa')==True:
        fecha_vencimiento = datetime.strptime(licencia.get('fecha_vencimiento'), "%Y-%m-%d")
        dias_restantes = (fecha_vencimiento - fecha_actual).days
        if dias_restantes > 0:
            return dias_restantes
        else:
            return "Licencia vencida"
    else:
        return "Licencia no activa"







# Nueva_licencia = Licencia("david", obtener_uuid())
# generar_txt(Nueva_licencia)

licencia = desencriptar_archivo()
resultado_verificacion = verificar_licencia(licencia)
print("Resultado de la verificación de la licencia:")
print(resultado_verificacion)
