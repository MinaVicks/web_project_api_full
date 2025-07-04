import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const logDir = path.join(__dirname, '../logs');
const requestLogPath = path.join(logDir, 'request.log');
const errorLogPath = path.join(logDir, 'error.log');


if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}


const writeLog = (filePath, data) => {
  const logEntry = JSON.stringify({
    timestamp: new Date().toISOString(),
    ...data
  }) + '\n';

  fs.appendFile(filePath, logEntry, (err) => {
    if (err) console.error('Error writing log:', err);
  });
};


export const requestLogger = (req, res, next) => {
  const { method, originalUrl, ip, body, params, query } = req;

  writeLog(requestLogPath, {
    type: 'request',
    method,
    endpoint: originalUrl,
    ip,
    body,
    params,
    query,
    userAgent: req.headers['user-agent']
  });

  next();
};


export const errorLogger = (err, req, res, next) => {
  writeLog(errorLogPath, {
    type: 'error',
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    endpoint: req.originalUrl,
    method: req.method,
    ip: req.ip,
    body: req.body,
    params: req.params,
    query: req.query
  });

  next(err);
};


export const initLogs = () => {
  if (!fs.existsSync(requestLogPath)) {
    fs.writeFileSync(requestLogPath, '');
  }
  if (!fs.existsSync(errorLogPath)) {
    fs.writeFileSync(errorLogPath, '');
  }
};