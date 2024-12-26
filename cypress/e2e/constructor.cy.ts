describe('проверяем доступность приложения', function() {
  beforeEach(()=>{
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.visit('http://localhost:4000');
  });
  it('Добавление ингредиентов в конструктор работает', function() { 
      //на странице вместо элементов конструктора находятся плейсхолдеры
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
      //прокликиваем кнопки добавления 
      cy.get('.common_button').eq(0).click();
      cy.get('.common_button').eq(1).click();
      cy.get('.common_button').eq(2).click();
      //проверяем что плейсхолдеры убраны
      cy.contains('Выберите булки').should('not.exist');
      cy.contains('Выберите начинку').should('not.exist');
      //а элементы добавлены в конструктор
      cy.get('[data-cy="burger-constructor"]').contains('Краторная').should('exist');
      cy.get('[data-cy="burger-constructor"]').contains('Биокотлета').should('exist');
      cy.get('[data-cy="burger-constructor"]').contains('Соус с шипами').should('exist');     
  });

  it('Модальные окна открываются и закрываются', ()=>{
    //проверяем что модалки нет, кликаем на элемент и открываем
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="ingredient"]').eq(0).click();
    //проверяем что модалка есть, кликаем на закрытие, проверяем что закрылась
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    //открываем модалку, кликаем в угол, проверяем что пропала
    cy.get('[data-cy="ingredient"]').eq(0).click();
    cy.get('body').click(0,0);
    cy.get('[data-cy="modal"]').should('not.exist');
  });
}); 

