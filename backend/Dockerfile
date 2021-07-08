FROM python:3.8-buster as builder

# install dependencies
RUN apt-get update -y && apt-get install vim libpq-dev gcc python3-dev libc6-dev curl libpq5 netcat dos2unix postgresql-client -y

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /home/app

COPY ./requirements.txt /home/app/requirements.txt
RUN chmod +x /home/app/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /home/app


COPY ./entrypoint.sh /home/app/entrypoint.sh
RUN chmod +x /home/app/entrypoint.sh
RUN pwd
RUN cat /home/app/entrypoint.sh

ENTRYPOINT ["bash", "entrypoint.sh"]
