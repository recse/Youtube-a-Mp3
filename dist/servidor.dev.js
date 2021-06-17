"use strict";

var express = require("express");

var cors = require("cors");

var ytdl = require('ytdl-core');

var cp = require("child_process");

var ffmpeg = require("ffmpeg-static");

var app = express();
app.use(cors());
app.get('/', function (req, res) {
  res.json({
    success: true
  });
});
app.get('/download', function _callee(req, res) {
  var url, downloadFormat, info, filename, audio, video;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Recibe información de la petición
          url = req.query.url;
          downloadFormat = req.query.format; // Recibe la información del vídeo de youtube

          _context.next = 5;
          return regeneratorRuntime.awrap(ytdl.getBasicInfo(url));

        case 5:
          info = _context.sent;
          // Define el nombre del archivo
          filename = "".concat(info.videoDetails.title, ".").concat(downloadFormat).replace(/([\/:*?"<>|])/g, "");

          try {
            // Añade la información para descargar
            res.header('Content-Disposition', "attachment; filename=".concat(filename));
          } catch (e) {
            filename = "invalid-title.".concat(downloadFormat);
            res.header('Content-Disposition', "attachment; filename=".concat(filename));
          }

          if (downloadFormat === "mp4") {
            // Descarga por separado el vídeo y el audio
            audio = ytdl(url, {
              quality: "highestaudio"
            });
            video = ytdl(url, {
              quality: "highestvideo"
            }); // Divide el audio y video

            ffmpegProcess = cp.spawn(ffmpeg, [// Borra los ffmpeg de la consola
            '-loglevel', '8', '-hide_banner', // Añade el audio y video
            '-i', 'pipe:3', '-i', 'pipe:4', // Los mapea a los archivos
            '-map', '0:a', '-map', '1:v', // No cambiamos los codecs
            '-c', 'copy', // Output del mp4 y pipe
            '-f', 'matroska', 'pipe:5'], {
              // Elimina el popup de windows
              windowsHide: true,
              stdio: [// Silencia los stdin/ou
              'inherit', 'inherit', 'inherit', // Pipea el audio y video
              'pipe', 'pipe', 'pipe']
            });
            audio.pipe(ffmpegProcess.stdio[3]);
            video.pipe(ffmpegProcess.stdio[4]);
            ffmpegProcess.stdio[5].pipe(res);
          } else if (downloadFormat === "mp3") {
            // Descarga el audio solo
            ytdl(url, {
              format: downloadFormat,
              filter: "audioonly",
              quality: "highestaudio"
            }).pipe(res);
          }

          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          // Errores
          console.error(_context.t0);
          res.status(500).end();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Puerto de backend del servidor

var port = 5000;
app.listen(port, function () {
  return console.log("Server started on port ".concat(port));
});