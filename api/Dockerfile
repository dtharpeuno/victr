FROM python:3.6

ADD . /code
WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_ENV development
ENV FLASK_DEBUG 1
ENV FLASK_APP run.py

RUN apt update && \
      apt install postgresql-client -y && \
      rm -rf /var/cache/apt/archives

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]