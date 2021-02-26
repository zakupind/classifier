const app = require('express')();
const request = require('request');
const cors = require('cors');

const host = 'localhost';
const port = 7000;
const url = 'http://127.0.0.1:8080';

const Status = {
  SUCCESS: 200,
};

app.use(cors())
app.options('*', cors())
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// app.get('*', (req, res) => {
//   res.status(Status.SUCCESS).type('application/json')
//   res.send({resp: 'ok'})

  
// })

app.get('*', (req, res) => {

  const options = {
    method: req.method,
    url: url + req.params['0'],
    qs: req.query,
}

  request(options, function (error, response, body) {
    res.status(Status.SUCCESS).type('application/json')
    res.send(body);
  });
})

app.post('*', (req, res) => {

  const options = {
    method: req.method,
    url: url + req.params['0'] + '/',
    qs: req.query,
    headers: req.headers,
    body: req.body
}
  console.log(options.body)
  request(options, function (error, response, body) {
    res.status(Status.SUCCESS).type('application/json')
    res.send(body);
  });
})

app.listen(port, host, function() {
  console.log(`Server listens http://${host}:${port}`)
});