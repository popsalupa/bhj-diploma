/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, resp) => {
      if(resp && resp.success) {
        this.element.reset();
        App.setState('user-loggerd');
        App.getModal('register').close();
      } else {
        alert(JSON.stringify(response.error));
        this.element.reset();
        this.element.querySelector('.form-group input').focus();
      }
    });
  }
}