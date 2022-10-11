/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const selectAccount = this.element.querySelector('select.accounts-select');
    selectAccount.innerHTML = '';
    const data = User.current();  
    Account.list(data, (error, response) => { 
      if (response.success) {
        response.data.forEach(key => selectAccount.insertAdjacentHTML('beforeend', 
        `<option value="${key.id}">${key.name}</option>`))
      }
    });
 
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      App.update();
      this.element.reset();
      App.getModal('newIncome').close();
      App.getModal('newExpense').close();
    });
  }
}