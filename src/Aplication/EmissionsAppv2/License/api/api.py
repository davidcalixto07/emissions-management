from flask import Flask
import os
from tkinter import filedialog
import subprocess
import platform
from datetime import datetime
from cryptography.fernet import Fernet
import json
from flask import Flask

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

app=Flask(__name__)
@app.route('/apip',methods=['GET'])
def api():
    return{
        'userid':1,
        'title':"hola mundo",
        'uuid': obtener_uuid()
    }

