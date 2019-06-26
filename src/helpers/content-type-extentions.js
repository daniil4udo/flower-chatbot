exports.ext = function () {
    var extTypes = {
        '3gp'      : 'video/3gpp'
        , 'aif'    : 'audio/x-aiff'
        , 'aiff'   : 'audio/x-aiff'
        , 'asf'    : 'video/x-ms-asf'
        , 'asx'    : 'video/x-ms-asf'
        , 'au'     : 'audio/basic'
        , 'avi'    : 'video/x-msvideo'
        , 'bmp'    : 'image/bmp'
        , 'djv'    : 'image/vnd.djvu'
        , 'djvu'   : 'image/vnd.djvu'
        , 'flv'    : 'video/x-flv'
        , 'gif'    : 'image/gif'
        , 'ico'    : 'image/vnd.microsoft.icon'
        , 'jpeg'   : 'image/jpeg'
        , 'jpg'    : 'image/jpeg'
        , 'm3u'    : 'audio/x-mpegurl'
        , 'm4v'    : 'video/mp4'
        , 'mid'    : 'audio/midi'
        , 'midi'   : 'audio/midi'
        , 'mng'    : 'video/x-mng'
        , 'mov'    : 'video/quicktime'
        , 'mp3'    : 'audio/mpeg'
        , 'mp4'    : 'video/mp4'
        , 'mp4v'   : 'video/mp4'
        , 'mpeg'   : 'video/mpeg'
        , 'mpg'    : 'video/mpeg'
        , 'pbm'    : 'image/x-portable-bitmap'
        , 'pgm'    : 'image/x-portable-graymap'
        , 'png'    : 'image/png'
        , 'pnm'    : 'image/x-portable-anymap'
        , 'ppm'    : 'image/x-portable-pixmap'
        , 'psd'    : 'image/vnd.adobe.photoshop'
        , 'qt'     : 'video/quicktime'
        , 'ra'     : 'audio/x-pn-realaudio'
        , 'ram'    : 'audio/x-pn-realaudio'
        , 'snd'    : 'audio/basic'
        , 'svg'    : 'image/svg+xml'
        , 'svgz'   : 'image/svg+xml'
        , 'tif'    : 'image/tiff'
        , 'tiff'   : 'image/tiff'
        , 'wav'    : 'audio/x-wav'
        , 'wma'    : 'audio/x-ms-wma'
        , 'wmv'    : 'video/x-ms-wmv'
        , 'wmx'    : 'video/x-ms-wmx'
        , 'xbm'    : 'image/x-xbitmap'
        , 'xpm'    : 'image/x-xpixmap'
    }
    return {
        getExt(path) {
            var i = path.lastIndexOf('.');
            return (i < 0) ? '' : path.substr(i);
        },
        getContentType (ext) {
            const contentType = extTypes[ext.replace(/[^a-zA-Z0-9]/gi,'').toLowerCase()] || null;
            if(contentType) return contentType
            else 
                return false//throw new TypeError('Wrong extetion')
        }
    };
}();
