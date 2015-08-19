# Metaracer


### Development Setup
1. `cd metaracer && npm install`

### SSL Certs
1. `cd metaracer`
2. `openssl genrsa 1024 > ssl.pem`
3. `openssl req -new -key ssl.pem -out csr.pem`
4. `openssl x509 -req -days 365 -in csr.pem -signkey ssl.pem -out ssl.crt`