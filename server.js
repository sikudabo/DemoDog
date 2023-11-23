const express = require('express');
const app = express();
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const path = require('path');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const sslRedirect = require('heroku-ssl-redirect');
const { startDb } = require('./db');
const {
    GetCompanyData,
    SaveDemo,
    SaveNewCompany,
    SaveNewEmployee,
    StartupEmployeeLogin,
} = require('./routes');

app.set('port', process.env.PORT || 2000);
app.set('appName', 'DemoDog');

app.use(cookieParser());
app.use(logger('dev'));
app.use(errorHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(sslRedirect.default());

app.use(history({
    rewrites: [
        {
            from: /^\/api\/.*$/,
            to: function(context) {
                return context.parsedUrl.path;
            }
        }
    ]
}));

app.use(serveStatic(path.join(__dirname, 'build')));

// Routes
app.use(GetCompanyData);
app.use(SaveDemo);
app.use(SaveNewCompany);
app.use(SaveNewEmployee);
app.use(StartupEmployeeLogin);

startDb();

// Middleware 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Server 
const server = http.createServer(app);

server.listen(app.get('port'), () => {
    console.log(`Server listening on port: ${app.get('port')}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(err.stack);
});


