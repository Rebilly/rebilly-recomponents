const shadeRGBColor = (color, percent) => {
    const f = color.split(',');
    const t = percent < 0 ? 0 : 255;
    const p = percent < 0 ? percent * -1 : percent;
    const R = parseInt(f[0].slice(4), 10);
    const G = parseInt(f[1], 10);
    const B = parseInt(f[2], 10);
    return `rgb(${Math.round((t - R) * p) + R}, ${Math.round((t - G) * p) + G}, ${Math.round((t - B) * p) + B})`;
};

const getColorFromIndex = (value, baseRGB = 'rbg(0,51,160)') => {
    if (value) {
        const ratio = Number(value);
        const textColorRatio = ratio;
        const whiteText = textColorRatio > 0.7;

        let backgroundColor = shadeRGBColor(baseRGB, 1 - Number(ratio));
        const colorSplit = backgroundColor.split(',');
        let greenHue = Number(colorSplit[1]);
        greenHue += ratio;
        colorSplit[1] = Math.round(greenHue * 1.05);
        backgroundColor = colorSplit.join(',');

        const color = whiteText ? `rgb(255, 255, 255)` : `rgb(0, 0, 0)`;
        return {color, backgroundColor};
    }
};

export default getColorFromIndex;
