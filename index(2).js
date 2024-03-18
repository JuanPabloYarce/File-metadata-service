var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Verificar si se envió un archivo
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
  }

  // Obtener el nombre, tipo de archivo y tamaño del archivo
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  // Devolver la información del archivo como respuesta
  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
