# Getting Started

# 1- Deploy

- Colocar o composer.json disponibilizado pela equipe de desenvolvimento em Doc/composer.json, na raiz da aplicação

- Rodar o composer install pra instalar uma instalação básica do drupal

- Copiar a pasta /sites/ do projeto e substituir pela existente da instalação básica

- Acessar o arquivo /sites/sites.php e alterar o HOST da linha 59 pela da aplicação no servidor desejado. (ex: $sites['firjan-ml.cityconnect.com.br'])

- Substituir o arquivo sites/futurospossiveis2022.com.br/settings.php por Doc/firjan_mercadolivre/settings.php  e alterar os dados da linha 771 pelos dados do servidor atual

- Substituir o arquivo sites/default/settings.php por Doc/default/settings.php

- Acessar a aplicação pelo servidor e rodar a instalação no banco normalmente. 
*OBS: não vai pedir banco no wizard por que já tá configurado no settings.*

- Certificar-se que o drupal está rodando o básico e a instalação ok. Se sim, dar um DROP TABLE no banco do servidor e subir o dump no mesmo disponobilizado em Doc/firjanmlcityconn_drupal2.zip.

- Testar a aplicação novamente.

# 2- Test Users

* Admin
- User: admin Passwd: admin

* Generic User
- User: 00331788000623 Passwd: 00331788000623

# 3- Envs

* Dev: https://firjan-ml.cityconnect.com.br