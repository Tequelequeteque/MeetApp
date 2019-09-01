# MeetApp
- Api em node para controle de eventos(meetup) ,com banco de dados postgres e controle de fila para enviar email

### Get Start

 ##### Obs.: Recomendado ter instalado Banco de dados [postgres](https://www.postgresql.org/) e [redis](https://redis.io/)
 
- Para instalar as dependencias do projeto pasta entrar na pasta raiz do projeto e digitar `yarn` ou `npm -i`.
- Após isso gere um arquivo `.env` na raiz do projeto com as configurações semelhantes do arquivo `.env.example` 
atribuindo suas configurações locais a ele
- Para executar as modificações no banco de dado execute `yarn sequelize db:migrate` ou `npx sequelize db:migrate` isso
criará as tabelas no banco de dados.
- Terminado as configurações escreva no terminal `yarn dev` ou `npm run dev` e a api ouvindo requisições 
e para rodar a fila de envio de emails `yarn queue` ou `npm run queue` e estará enviado emails. 



### Rotas
 - Rotas estão exportadas em um arquivo meetApp.json no projeto da raiz. Recomendo usar o [insomnia](https://insomnia.rest/) para fazer as requisições
