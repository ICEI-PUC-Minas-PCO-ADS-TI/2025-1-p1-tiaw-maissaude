# Product design

<span style="color:red">Pré-requisitos: <a href="02-Product-discovery.md"> Product discovery</a></span>

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
| Atleta | 	Um sistema para organizar minhas metas alimentares e físicas | Facilitar o monitoramento do meu progresso nas atividades |
| Nutricionista | 	Um site para acompanhar meus pacientes | Tornar mais fácil o envio de dietas e o acompanhamento da evolução nutricional |
| Mãe | 	Alimentos e opções que reduzam a seletividade alimentar da filha | Melhorar a aceitação dos alimentos e a saúde geral da criança |
| Idosa | Ter uma dieta saudável para repor minhas vitaminas | Aumentar minha energia e regular o organismo para ser mais produtiva |
| Pessoa com depressão e sobrepeso | Saber quantas calorias devo ingerir por dia | Melhorar minha saúde física e perder peso de forma saudável |
| Estudante | Ter uma rotina com horários definidos para as refeições | Minha rotina é corrida e acabo me esquecendo de me alimentar corretamente |
| Vegano | Uma dieta com sugestões de refeições veganas equilibradas | Manter uma alimentação saudável, prática e compatível com meus valores |
| Universitario | 	Uma ferramenta para calcular a quantidade ideal de água por dia | Passo muito tempo estudando e preciso controlar melhor minha ingestão de líquidos |


## Proposta de valor

![image](https://github.com/user-attachments/assets/f59f3a3c-ab88-4967-b4dc-eba73f768321)
![image](https://github.com/user-attachments/assets/4725aca3-999a-4764-9070-2b7507eff875)
![image](https://github.com/user-attachments/assets/6e4f2b75-15f0-4be9-aa81-f843f7896ea4)
![image](https://github.com/user-attachments/assets/8759120d-6f54-40bc-a5c2-24c38571a892)
![image](https://github.com/user-attachments/assets/d961bbb9-e74a-449b-9ebb-2d2327a04997)

## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

| ID     | Descrição do Requisito                                   | Prioridade |
| ------ | ---------------------------------------------------------- | ---------- |
| RF-001 | O site deverá permitir o cadastro e login de usuários com nome, idade, e-mail e senha. | ALTA |
| RF-002 | O usuário poderá visualizar seu plano alimentar personalizado com sugestões de refeições e substituições. | MÉDIA |
| RF-003 | O usuário poderá cadastrar metas com nome, categoria e prazo, visualizar a lista de metas e acompanhar seu progresso por meio de um gráfico.  | MÉDIA |
| RF-004 | O sistema calculará automaticamente a recomendação diária de ingestão de água com base nas informações fornecidas pelo usuário. | MÉDIA | 
| RF-005 | O sistema calculará a necessidade calórica diária do usuário com base na Taxa Metabólica Basal (TMB), a partir das informações fornecidas. | MÉDIA |
| RF-006 | O usuário poderá registrar, diretamente na página inicial, a quantidade de água e calorias ingerida no dia. A quantidade total necessária é atualizada automaticamente após o cálculo feito na página de consumo de água e metabolismo basal. | MÉDIA |
| RF-007 | O usuário poderá visualizar os horários recomendados para suas refeições na página inicial, com base nas sugestões do nutricionista, podendo adaptá-los conforme sua rotina. | ALTA |
| RF-008 | A página inicial exibirá um carrossel com refeições indicadas pelo nutricionista para o usuário, facilitando o acesso rápido às sugestões. | MÉDIA |
| RF-009 | O nutricionista poderá editar ou atualizar os planos alimentares conforme a evolução do paciente. | MÉDIA |
| RF-010 | O sistema permitirá que o nutricionista defina metas de saúde (como ingestão calórica, consumo de água, etc.) para cada paciente. | MÉDIA |
| RF-011 | O administrador poderá acessar uma página exclusiva com visualização de todos os usuários cadastrados, além de gráficos que apresentam estatísticas sobre o uso da plataforma. | MÉDIA |
 
### Requisitos não funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O site deverá estar disponível 24 horas por dia, garantindo acesso sempre que o usuário precisar. | ALTA   |
| RNF-002 | Os dados dos usuários devem ser armazenados de forma segura, seguindo protocolos atualizados de segurança e privacidade | ALTA |
| RNF-003 | Os dados dos usuários devem ser armazenados de forma segura, respeitando protocolos de segurança e privacidade. | ALTA |
| RNF-004 | O site deverá ser compatível com múltiplas plataformas, funcionando adequadamente em Android, iOS, Windows e Mac. | ALTA |
| RNF-005 | A interface deverá ser responsiva e adaptável a diferentes tamanhos de tela, priorizando usabilidade em dispositivos móveis. | ALTA |
| RNF-006 | O site deverá suportar múltiplos usuários simultâneos sem perda significativa de desempenho. | MÉDIA |

## Restrições

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| Menores de 18 anos só poderão acessar a plataforma com consentimento de um responsável legal. |
|003| Não é possível compartilhar o plano alimentar. |
|001| Menores de 18 anos só poderão acessar a plataforma com consentimento de um responsável legal. |
|004| Somente administradores poderão ter acesso ao sistema de segurança de dados. |
|005| Inicialmente, o site estará disponível apenas em português, não havendo suporte para outros idiomas no primeiro lançamento. |
