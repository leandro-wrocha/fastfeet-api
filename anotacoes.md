# anotacoes

## regras da aplicacao

  - [ ] A aplicação deve ter dois tipos de usuário, entregador e/ou admin
  - [ ] Deve ser possível realizar login com CPF e Senha
  - [ ] Deve ser possível realizar o CRUD dos entregadores
  - [ ] Deve ser possível realizar o CRUD das encomendas
  - [ ] Deve ser possível realizar o CRUD dos destinatários
  - [ ] Deve ser possível marcar uma encomenda como aguardando (Disponível para retirada)
  - [ ] Deve ser possível retirar uma encomenda
  - [ ] Deve ser possível marcar uma encomenda como entregue
  - [ ] Deve ser possível marcar uma encomenda como devolvida
  - [ ] Deve ser possível listar as encomendas com endereços de entrega próximo ao local do entregador
  - [ ] Deve ser possível alterar a senha de um usuário
  - [ ] Deve ser possível listar as entregas de um usuário
  - [ ] Deve ser possível notificar o destinatário a cada alteração no status da encomenda

## regras de negocio

  - [ ] Somente usuário do tipo admin pode realizar operações de CRUD nas encomendas
  - [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos entregadores
  - [ ] Somente usuário do tipo admin pode realizar operações de CRUD dos destinatários
  - [ ] Para marcar uma encomenda como entregue é obrigatório o envio de uma foto
  - [ ] Somente o entregador que retirou a encomenda pode marcar ela como entregue
  - [ ] Somente o admin pode alterar a senha de um usuário
  - [ ] Não deve ser possível um entregador listar as encomendas de outro entregador

## pesquisas

. No DDD (Domain-Driven Design), a prática de dividir um sistema em diferentes domínios ajuda a manter a complexidade gerenciável e a focar em diferentes áreas de negócio de maneira mais eficaz.

  Domínio de Gestão de Entregadores e Destinatários: Esse domínio lidaria com a administração dos entregadores e destinatários. Inclui o cadastro, atualização e consulta de informações pessoais e de contato.

  Possível nome: Domínio de Pessoas

  Domínio de Gestão de Encomendas e Entregas: Esse domínio seria responsável pelo gerenciamento das encomendas, incluindo a criação, rastreamento, e status de entrega.

  Possível nome: Domínio de Encomendas

. Detalhamento dos domínios

  1. Domínio de Pessoas
    Entidades:
      1.1. Entregador:
        Identidade única,
        atributos:
          - nome
          - cpf (identificação única também)
          - dados de contato (telefone, email) - value-object
          - endereço(rua, cidade, estado, cep) - value-object
          - veículo utilizado (tipo, placa) - value-object
          - status de disponibilidade (disponível, em entrega, ausente)

      1.2. Destinatário:
        Identidade única,
        atributos:
          - nome
          - cpf
          - dados de contato(telefone, email) - value-object
          - endereço de entrega - value-object
  
    Serviços:
      crud de entregadores - permitido apenas para usuario administrador
      crud de destinatários - permitido apenas para usuario admnisitrador
  
  2. Domínio de Encomendas
    Entidades:
      2.1. Encomenda:
        Identidade única,
        atributos:
          - rementente(informações do remetente)
          - destinatário(referência à entidade destinário)
          - descrição do conteúdo
          - peso
          - dimensões(altura, largura, pronfundidade) - value-object
          - valor declarado
          - endereço de coleta(rua, cidade, estado, cep) - value-object
          - endereço de entrega(rua, cidade, estado, cep) - value-object
          - data de criação
          - prazo de entrega

      2.1. Status de entrega:
        Identidade única,
        atributos:
          - encomenda(referência à entidade encomenda)
          - data e hora da atualização do status
          - localização atual
          - status atual (em trânsito, entregue, aguardando coleta, atrasado)
    Serviços:
      crud de encomendas
      rastreamento de encomendas
      atualização do status de entrega

. Razões para dividir em dois domínios
  . Reutilização: O domínio de pessoas pode ser reutilizado em outros contextos ou serviços que também necessitam de gestão de pessoas.

## observacoes

  > No DDD (Domain-Driven Design), um agregado é um conjunto de objetos associados que devem ser tratados como uma unidade única para fins de consistência de dados. Cada agregado tem uma raiz de agregado (aggregate root), que é a entidade principal através da qual todo acesso ao agregado é feito. Os agregados ajudam a definir os limites de consistência e encapsulamento dentro do domínio.

  importância dos objetos de valor:
  
  > Imutabilidade: Objetos de valor são imutáveis. Uma vez criados, seus valores não podem ser alterados. Isso ajuda a evitar erros e inconsistências.
  
  > Sem Identidade: Diferente das entidades, objetos de valor não têm identidade única. Eles são definidos apenas pelos seus atributos.

  > Encapsulamento de Lógica: Objetos de valor podem encapsular lógica relacionada aos seus atributos, como validação e cálculos, tornando o código mais claro e coeso.

  > Reutilização: Podem ser facilmente reutilizados em diferentes partes do sistema, promovendo DRY (Don't Repeat Yourself).