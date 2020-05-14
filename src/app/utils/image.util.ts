import { EventEmitter } from '@angular/core';
import { first } from 'rxjs/operators';

export function resizeCropImage(img, emitter: EventEmitter<any>, base64 = true, dWidth = 200, dHeight = 200) {
    const _img = new Image();
    _img.crossOrigin = 'anonymous';
    const canvas = document.createElement('canvas');
    canvas.width = dWidth;
    canvas.height = dHeight;
    _img.onload = () => {
        const ctx = canvas.getContext('2d');
        let sx; let sy; let size;
        if (_img.width > _img.height) {
            size = _img.height;
            sx = (_img.width - _img.height) / 2;
            sy = 0;
        } else {
            size = _img.width;
            sx = 0;
            sy = (_img.height - _img.width) / 2;
        }
        ctx.drawImage(_img, sx, sy, size, size, 0, 0, dWidth, dHeight); // crop and resize
        emitter.next(base64 ? canvas.toDataURL() : canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
    };
    _img.src = img;
}

export function readAndResizeImage(event, base64 = true, dWidth = 200, dHeight = 200) {
    const file: Blob = event.target.files[0];
    const reader = new FileReader();
    const emitter = new EventEmitter();
    reader.onload = (e) => {
        resizeCropImage(e.target.result.toString(), emitter, base64, dWidth, dHeight);
    };
    reader.readAsDataURL(file);
    return emitter;
}
