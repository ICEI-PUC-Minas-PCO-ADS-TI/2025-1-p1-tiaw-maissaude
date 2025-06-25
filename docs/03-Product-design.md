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
| RF-001 | O site deverá solicitar informações básicas do usuário no momento do cadastro, como: nome, idade, e-mail e senha. | ALTA |
| RF-002 | O site indicará o tempo estimado necessário para que o usuário siga suas recomendações e atinja suas metas.  | MÉDIA |
| RF-003 | O site poderá disponibilizar produtos relacionados à alimentação saudável para compra, auxiliando o usuário a seguir as recomendações. | MÉDIA | 
| RF-004 | O site exibirá avaliações e feedbacks feitos por outros usuários para que novos usuários possam consultar. | MÉDIA |
| RF-005 | O paciente poderá informar quantas refeições deseja fazer por dia, para que o sistema sugira um melhor balanceamento alimentar. | MÉDIA |
| RF-006 | O nutricionista poderá cadastrar planos alimentares personalizados para cada paciente. | ALTA |
| RF-007 | O paciente poderá registrar seu progresso (peso, IMC, ingestão de água, etc.) em sua conta pessoal. | ALTA |
| RF-008 | O nutricionista poderá editar ou atualizar os planos alimentares conforme a evolução do paciente. | MÉDIA |
| RF-009 | O paciente poderá visualizar seu plano alimentar e receber recomendações com base nas metas definidas. | MÉDIA |
| RF-010 | O sistema permitirá que o nutricionista defina metas de saúde (como ingestão calórica, consumo de água, etc.) para cada paciente. | MÉDIA |
 
### Requisitos não funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O site deverá estar disponível 24 horas por dia, garantindo acesso sempre que o usuário precisar. | ALTA   |
| RNF-002 | O site poderá permitir que o usuário personalize o tema ou a cor da página, baseado em suas preferências ou no perfil informado. | BAIXA |
| RNF-003 | Os dados dos usuários devem ser armazenados de forma segura, respeitando protocolos de segurança e privacidade. | ALTA |
| RNF-004 | O site deverá ser compatível com múltiplas plataformas, funcionando adequadamente em Android, iOS, Windows e Mac. | ALTA |

## Restrições

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| Os dados dos usuários não poderão ser armazenados por um período superior a 2 anos. |
|002| As indicações de produtos ou serviços feitas pelo site não devem ultrapassar o valor de R$300,00. |
|003| Menores de 18 anos não podem acessar o site, |
|004| Não é possível compartilhar o plano alimentar. |
|005| Somente administradores poderão ter acesso ao sistema de segurança de dados. |
|006| Inicialmente, o site estará disponível apenas em português, não havendo suporte para outros idiomas no primeiro lançamento. |
