export const errorMiddleware = (err, req, res, next) => {
  
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${new Date().toISOString()}] Error:`, {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method
    });
  }

  if (err.joi) {
    return res.status(400).json({
      message: 'Datos inválidos',
      details: err.joi.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  
  let statusCode = 500;
  let message = 'Ha ocurrido un error en el servidor';

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
    message = 'Se pasaron datos inválidos';
  } else if (err.name === 'DocumentNotFoundError') {
    statusCode = 404;
    message = 'No se encontró el recurso solicitado';
  } else if (err.code === 11000) { // Error de duplicado en MongoDB
    statusCode = 409;
    message = 'El correo electrónico ya existe en el servidor';
  } else if (err.message === 'No tienes permiso para esta acción') {
    statusCode = 403;
    message = err.message;
  } else if (err.message.includes('no encontrado')) {
    statusCode = 404;
    message = err.message;
  } else if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Respuesta de error estandarizada
  res.status(statusCode).json({
    message
  });
};

export const notFoundError = (req, res, next) => {
  res.status(404).json({
    message: 'Dirección inexistente'
  });
};