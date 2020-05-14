export function getTextColor(backgroundColor: any, defaultTextColor: any) {
    if (!backgroundColor || !defaultTextColor) {
        return 'unset';
    }
    backgroundColor = toRGB(backgroundColor);
    defaultTextColor = toRGB(defaultTextColor);
    const bg = getContrastYIQ(backgroundColor);
    const text = getContrastYIQ(defaultTextColor);
    if (bg === text) {
        for (let i = 0; i < defaultTextColor.length; i++) {
            defaultTextColor[i] = (i === 3 ? 1 : 255) - defaultTextColor[i];
        }
    }
    return toHex(defaultTextColor);
}

function getContrastYIQ(rgb: number[]) {
    const yiq = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

function toRGB(hexColor: string): number[] {
    hexColor = hexColor.replace('#', '');
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    return [r, g, b];
}
function toHex(rgb: number[]) {
    return '#' + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}
