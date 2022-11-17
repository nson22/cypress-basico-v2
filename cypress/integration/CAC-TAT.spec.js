// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores qui doloremque architecto enim, molestias omnis non ad, maxime, iste ea repellat voluptatibus est similique quidem. Quisquam sit quis adipisci reprehenderit!'


  beforeEach('verifica o título da aplicação', function () {
    cy.visit('../../src/index.html')
  })

  // Exercicio e exercicio extra 01
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName')
      .type('Glecinilson')

    cy.get('#lastName')
      .type('Silva')

    cy.get('#email')
      .type('glecinilson@gmail.com')

    cy.get('#phone')
      .type('92981926618')

    cy.get('#open-text-area')
      .type(lorem, { delay: 0 })

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

  });

  // Exercicio extra 02
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName')
      .type('Glecinilson')

    cy.get('#lastName')
      .type('Silva')

    cy.get('#email')
      .type('glecinilson.com')

    cy.get('#phone')
      .type('92981926618')

    cy.get('#open-text-area')
      .type(lorem, { delay: 0 })

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  });

  // Exercicio extra 03
  it('verificar se o campo número de telefone aceita somente números', () => {
    cy.get('#firstName')
      .type('Glecinilson')

    cy.get('#lastName')
      .type('Silva')

    cy.get('#email')
      .type('glecinilson.com')

    cy.get('#phone')
      .type('assasddddds')
      .should('have.value', '')
  });

  // Exercicio extra 04
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName')
      .type('Glecinilson')

    cy.get('#lastName')
      .type('Silva')

    cy.get('#email')
      .type('glecinilson@gmail.com')

    cy.get('#phone-checkbox')
      .check()

    cy.get('#open-text-area')
      .type(lorem)

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  // Exercicio extra 05
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Glecinilson')
      .should('have.value', 'Glecinilson')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Silva')
      .should('have.value', 'Silva')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('glecinilson@gmail.com')
      .should('have.value', 'glecinilson@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('92981926618')
      .should('have.value', '92981926618')
      .clear()
      .should('have.value', '')

    cy.get('#open-text-area')
      .type('Preciso de ajuda')
      .should('have.value', 'Preciso de ajuda')
      .clear()
      .should('have.value', '')

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  // Exercicio extra 06
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });

  // Exercicio extra 07
  it('envia o formuário com sucesso usando um comando customizado', () => {
    let user = {
      firstname: 'Glecinilson',
      lastname: 'Silva',
      email: `Glecinilson.Silva@gmail.com`.toLowerCase(),
      phone_number: '92981926618',
      help_message: lorem
    }
    cy.fillMandatoryFieldsAndSubmit(user)
    cy.get('.success').should('be.visible')

  });

  // Exercicio extra 08
  it('Contains', () => {
    cy.get('#firstName')
      .type('Glecinilson')

    cy.get('#lastName')
      .type('Silva')

    cy.get('#email')
      .type('glecinilson@gmail.com')

    cy.get('#phone')
      .type('92981926618')

    cy.get('#open-text-area')
      .type('Preciso de ajuda')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .should('be.visible')
      .select('YouTube')
      .should('have.value', 'youtube')
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .should('be.visible')
      .select('mentoria')
      .should('have.value', 'mentoria')
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .should('be.visible')
      .select(1)
      .should('have.value', 'blog')
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('#support-type > label > input')
      .should(`be.visible`)
      .check('feedback')
      .should('be.checked')
      .and('have.value', 'feedback')
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('#support-type > label > input')
      .each($el => {
        cy.wrap($el)
          .should(`be.visible`)
          .check()
          .should('be.checked')
          .should('have.value', $el.val())
      })
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('[type="checkbox"]')
      .should('be.visible')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    let filename = 'example.json'
    cy.get('#file-upload')
      .selectFile(`cypress/fixtures/${filename}`)
      .then($input => {
        expect($input[0].files[0].name).to.be.eq(filename)
      })
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    let filename = 'example.json'
    cy.get('#file-upload')
      .selectFile(`cypress/fixtures/${filename}`, { action: "drag-drop" })
      .then($input => {
        expect($input[0].files[0].name).to.be.eq(filename)
      })
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    let filename = 'example.json'
    cy.fixture(`${filename}`)
      .as('uploads')

    cy.get('#file-upload')
      .selectFile('@uploads')
      .then(uploads => {
        expect(uploads[0].files[0].name).to.be.eq(filename)
      })

  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  });

  it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target')
      .click()
    cy.get('#title').should('be.visible').and('have.text', 'CAC TAT - Política de privacidade')
  });
  it('testa a página da política de privavidade de forma independente', () => {
    cy.visit('../../src/privacy.html')
      .title().should('be.eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    cy.get('#title').should('be.visible').and('have.text', 'CAC TAT - Política de privacidade')
  });

})
