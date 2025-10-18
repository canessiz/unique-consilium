FROM python:3.12-slim@sha256:dc9e92fcdc085ad86dda976f4cfc58856dba33a438a16db37ff00151b285c8ca

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1

# Güvenli non-root kullanıcı
RUN adduser --disabled-password --gecos "" --uid 10001 appuser

WORKDIR /app

# Gereken paketler
COPY requirements.lock.txt ./
# RUN pip install --no-cache-dir -r requirements.txt gunicorn
# RUN pip install --no-cache-dir sentry-sdk
# RUN pip install --no-cache-dir djangorestframework-simplejwt drf-spectacular
# RUN pip install --no-cache-dir djangorestframework-simplejwt drf-spectacular

RUN pip install --no-cache-dir --require-hashes -r requirements.lock.txt
RUN python -m pip check
# Uygulama
COPY . .

# Yazılabilir dizinler (medya/statikler için hazırlanır)
RUN mkdir -p /app/media /app/staticfiles && chown -R appuser:appuser /app

# Non-root
USER 10001:10001

EXPOSE 8000

# Bake gunicorn config into the image

# Sağlık kontrolü: 127.0.0.1:8000’e TCP bağlanmayı dener
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD ["python","-c","import socket; s=socket.socket(); s.settimeout(3); s.connect((\"127.0.0.1\",8000)); s.close()"]

# Uygulama giriş noktası (wsgi_app, gunicorn.conf.py içinde tanımlı olmalı)
ENTRYPOINT ["gunicorn","-c","/app/gunicorn.conf.py"]

# Konfig dosyası imaja
COPY gunicorn.conf.py /app/gunicorn.conf.py
