# import os
# from django.utils.translation import ugettext_lazy as _

DEBUG = True
# LOCAL_BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

USE_I18N = True

BASE_URL = 'http://localhost:8000'
APP_URL = 'http://192.168.29.213:8000'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'db_asgmt',
        'OPTIONS': {
            # 'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER'",
            'charset': 'utf8'
        },
        'USER': 'root',
        'PASSWORD': 'Jiffy@123',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}









