// express 형태

// const의 경우 let과 동일한 역할을 하지만 고정될 값을 쓸때 이렇게 사용한다.
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const guestbookRouter = require('./routes/guestbook');

const port = 3000;
const app = express();

// basic favicon
app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));

// parsing request body ( form )
app.use(bodyParser.urlencoded({extended: false}));

// view Engine setup
app.set('views', path.join(__dirname,"/views"));
app.set('view engine', 'ejs');

//router 만들기
// request router setup
app.use('/', guestbookRouter)

//서버 객체를 하나 생성
const server = http.createServer(app);

server.on('error', onError);
server.on('listen', onListening);
// 실행
server.listen(port);

function onError(error){
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
function onListening(){
    const addr = server.address();
    const bind = (typeof addr ==='string') ? 'pipe ' +addr : 'port ' + addr.port;
    console.log(bind);
};

