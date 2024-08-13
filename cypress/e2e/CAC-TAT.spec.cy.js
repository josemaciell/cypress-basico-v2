/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
      cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget volutpat risus, in sollicitudin mi. Donec sit amet sagittis metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nec dui risus. Praesent tincidunt urna eros, gravida volutpat risus fermentum eget. Maecenas dolor magna, molestie at ornare ut, sollicitudin sed erat. Vestibulum iaculis lacus in mauris malesuada, convallis euismod odio vestibulum. Curabitur laoreet felis at ante dictum molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent pharetra at arcu eu sollicitudin.'
        cy.get('#firstName').type('Jose')
        cy.get('#lastName').type('Maciel')
        cy.get('#email').type('jlmp.mao@gmail.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Jose')
        cy.get('#lastName').type('Maciel')
        cy.get('#email').type('jlmp.maogmail.com')
        cy.get('#open-text-area').type('teste', {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') 
    })

    it('Validar se campo telefone permanece vazio se preencher valor não-numérico', function() {
        // cy.get('#phone-checkbox').click()
        cy.get('#phone')
          .type('asdfghjkl')
          .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Jose')
        cy.get('#lastName').type('Maciel')
        cy.get('#email').type('jlmp.mao@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste', {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') 
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Jose').should('have.value', 'Jose')
          .clear().should('have.value', '')
        cy.get('#lastName').type('Maciel').should('have.value', 'Maciel')
          .clear().should('have.value', '')
        cy.get('#email').type('jlmp.mao@gmail.com').should('have.value', 'jlmp.mao@gmail.com')
          .clear().should('have.value', '')
        cy.get('#phone').type('92981270507').should('have.value', '92981270507')
          .clear().should('have.value', '')
    })

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') 
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.get('#firstName').type('Jose')
        cy.get('#lastName').type('Maciel')
        cy.get('#email').type('jlmp.mao@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste', {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') 
    })
  })

