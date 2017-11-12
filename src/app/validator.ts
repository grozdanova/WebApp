export class Validator {
        static validateName(name) {
            if (name.length >= 40 || name === '') {
               return false;
            }
            if (name == null || name === undefined) {
              return false;
            }
            return true;
        }
        static validateEmail(email) {
        let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              // anystring@anystring.anystring' -> true, 'name@again@example.com' -> false
                  if (!(re.test(email) || email.length >= 40)) {
                    return false;
                  }
                  return true;
        }
        static validatePass(pass) {
          if (pass.length >= 40 || pass === '' || pass.length <= 4) {
             return false;
          }
          if (pass == null || pass === undefined) {
            return false;
          }
          return true;
        }
        static validateConfirm(pass, confirmPass) {
          if (pass !== confirmPass) {
             return false;
          }
          return true;
        }
        static validatePhone(tel) {
        let reg = /^[0-9 ]+$/;
        if (!(reg.test(tel))) {
                    return false;
                  }
                  return true;
        }
        static validateUniqueName(data: any, name: any) {
            for (let i = 0; i < data.length; i++) {
              let element = data[i];
              if (element.username === name) {
                return false;
              }
            }
            return true;
        }
        static validateUniqueMail(data: any, email: any) {
          for (let i = 0; i < data.length; i++) {
            let element = data[i];
            if (element.email === email) {
              return false;
            }
          }
          return true;
      }
}
