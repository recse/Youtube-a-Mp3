const express = require("express");
const cors = require("cors");
const ytdl = require('ytdl-core');

const cp = require("child_process");
const ffmpeg = require("ffmpeg-static");

const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json({ success: true });
});

app.get('/download', async (req, res) => {
    try {
        // Recibe información de la petición
        let url = req.query.url;
        let downloadFormat = req.query.format;

        // Recibe la información del vídeo de youtube
        let info = await ytdl.getBasicInfo(url);

        // Define el nombre del archivo
        let filename = `${info.videoDetails.title}.${downloadFormat}`.replace(/([\/:*?"<>|])/g, "");

        try {
            // Añade la información para descargar
            res.header('Content-Disposition', `attachment; filename=${filename}`);
        } catch (e) {
            filename = `invalid-title.${downloadFormat}`;
            res.header('Content-Disposition', `attachment; filename=${filename}`);
        }
        
        if (downloadFormat === "mp4") {
            // Descarga por separado el vídeo y el audio
            const audio = ytdl(url, { quality: "highestaudio" });
            const video = ytdl(url, { quality: "highestvideo" });

            // Divide el audio y video
            ffmpegProcess = cp.spawn(ffmpeg, [
                // Borra los ffmpeg de la consola
                '-loglevel', '8', '-hide_banner',
                // Añade el audio y video
                '-i', 'pipe:3', '-i', 'pipe:4',
                // Los mapea a los archivos
                '-map', '0:a', '-map', '1:v',
                // No cambiamos los codecs
                '-c', 'copy',
                // Output del mp4 y pipe
                '-f', 'matroska', 'pipe:5'
            ], {
                // Elimina el popup de windows
                windowsHide: true,
                stdio: [
                    // Silencia los stdin/ou
                    'inherit', 'inherit', 'inherit',
                    // Pipea el audio y video
                    'pipe', 'pipe', 'pipe'
                ]
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
    } catch (e) {
        // Errores
        console.error(e);
        res.status(500).end();
    }
});

// Puerto de backend del servidor
const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));