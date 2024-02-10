// 画像生成関数
function placeholderableGenerateImage(element) {
    // URLからパラメータを解析する関数
    function getParams(url) {
        const queryString = url.split('?')[1];
        if (!queryString) {
            return {};
        }
        return queryString.split('&').reduce((acc, current) => {
            const [key, value] = current.split('=');
            acc[key] = value;
            return acc;
        }, {});
    }

    const defaultWidth = 200;
    const defaultHeight = 100;
    const defaultText = `${defaultWidth}x${defaultHeight}`; // デフォルトのテキストオプション
    const defaultBgColors = ['#F2529D', '#A99CD9', '#9080F2', '#05F2F2', '#F2CB05']; // デフォルトの背景色オプション
    const defaultTextColors = ['#EEEEEE']; // デフォルトのテキスト色オプション
    const defaultBootstrapIcon = '';

    // パラメータの取得
    const params = getParams(element.src);
    const width = parseInt(params.width || defaultWidth);
    const height = parseInt(params.height || defaultHeight);
    const text = decodeURIComponent(params.text || `${width}x${height}`);
    const icon = decodeURIComponent(params.icon || `${defaultBootstrapIcon}`);
    const bgcolorOptions = decodeURIComponent(params.bgcolors || defaultBgColors.join('#')).split('#').filter(c => c);
    const textColorOptions = decodeURIComponent(params.colors || defaultTextColors.join('#')).split('#').filter(c => c);



    // 背景色とテキスト色をランダムに選択
    const bgcolor = `#${bgcolorOptions[Math.floor(Math.random() * bgcolorOptions.length)]}`;
    const textColor = `#${textColorOptions[Math.floor(Math.random() * textColorOptions.length)]} `;

    // Canvasを作成
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 背景色を設定
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, width, height);

    let fontSize;
    ctx.fillStyle = textColor;

    // テキストを中央に描画
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (icon != '') {
        fontSize = Math.min(width, height) * 0.7;
        ctx.font = `${fontSize}px Bootstrap-Icons`;
        ctx.fillText(String.fromCharCode(`0x${icon}`), width / 2, height / 2);
    }
    else {
        fontSize = Math.max(Math.min(width / (text.length < 10 ? 10 : text.length) * 2, height / 2), 10);
        ctx.font = `${fontSize}px Arial`;
        ctx.fillText(text, width / 2, height / 2);
    }



    // imgタグのsrcにcanvasの内容を設定
    element.src = canvas.toDataURL('image/png');
}

// 画像生成関数を呼び出す関数
function placeholderable() {
    // src属性に"placeholder"が含まれるimgタグを対象にする
    const elements = document.querySelectorAll('img[src*=" "]');
    elements.forEach(placeholderableGenerateImage);
}

// DOMが読み込まれた後にplaceholderable関数を呼び出す
window.addEventListener('load', function () {
    placeholderable();
});