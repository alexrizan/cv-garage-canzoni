export class ValidationError extends Error {
  constructor(validationDetails: string) {
    super(validationDetails);
  }
}

export class CommonError extends Error {
  constructor() {
    super('Что-то пошло не так');
  }
}

export class NonAuthError extends Error {
  constructor() {
    super('Пользователь не авторизован или у него нет доступа');
  }
}


export class NotFoundError extends Error {
  constructor(entityName: string) {
    super(`${entityName} отсутствует или не был найден`);
  }
}
