export class BadRequestError extends Error {
  constructor(message = 'Se pasaron datos inválidos') {
    super(message);
    this.statusCode = 400;
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'No tienes permiso para esta acción') {
    super(message);
    this.statusCode = 403;
  }
}

export class NotFoundError extends Error {
  constructor(message = 'No se encontró el recurso solicitado') {
    super(message);
    this.statusCode = 404;
  }
}

export class ConflictError extends Error {
  constructor(message = 'El correo electrónico ya existe en el servidor') {
    super(message);
    this.statusCode = 409;
  }
}

export class ServerError extends Error {
  constructor(message = 'Ha ocurrido un error en el servidor') {
    super(message);
    this.statusCode = 500;
  }
}