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

    // パラメータの取得
    const params = getParams(element.src);
    const width = parseInt(params.width || defaultWidth);
    const height = parseInt(params.height || defaultHeight);
    const text = decodeURIComponent(params.text || `${width}x${height}`);
    const bgcolorOptions = decodeURIComponent(params.bgcolors || defaultBgColors.join('#')).split('#').filter(c => c);
    const textColorOptions = decodeURIComponent(params.colors || defaultTextColors.join('#')).split('#').filter(c => c);



    // 背景色とテキスト色をランダムに選択
    const bgcolor = `#${bgcolorOptions[Math.floor(Math.random() * bgcolorOptions.length)]}`;
    const textColor = `#${textColorOptions[Math.floor(Math.random() * textColorOptions.length)]} `;
    // const bgcolor = defaultBgColors[Math.floor(Math.random() * defaultBgColors.length)];
    // const textColor = defaultTextColors[0]; // この例では常に最初の色を使用

    // Canvasを作成
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 背景色を設定
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, width, height);

    // フォントサイズとフォントスタイルを設定
    const fontSize = Math.max(Math.min(width / (text.length < 10 ? 10 : text.length) * 2, height / 2), 10);
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = textColor;


    // テキストを中央に描画
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);


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
document.addEventListener('DOMContentLoaded', placeholderable);



// // 画像生成関数
// function placeholderableGenerateImage(element) {
//     // デフォルト値の設定
//     const defaultWidth = 200;
//     const defaultHeight = 100;
//     const defaultText = `${defaultWidth}x${defaultHeight}`; // デフォルトのテキストオプション
//     const defaultBgColors = ['#F2529D', '#A99CD9', '#9080F2', '#05F2F2', '#F2CB05']; // デフォルトの背景色オプション
//     const defaultTextColors = ['EEEEEE']; // デフォルトのテキスト色オプション

//     // 属性があればその値を使用し、なければデフォルト値を使用
//     const width = parseInt(element.getAttribute('data-ph-width') || defaultWidth, 10);
//     const height = parseInt(element.getAttribute('data-ph-height') || defaultHeight, 10);
//     const text = element.getAttribute('data-ph-text') || defaultText;
//     const bgcolorOptions = (element.getAttribute('data-ph-bgcolors') || defaultBgColors.join('#')).split('#').filter(c => c);
//     const textColorOptions = (element.getAttribute('data-ph-colors') || defaultTextColors.join('#')).split('#').filter(c => c);

//     // 背景色とテキスト色をランダムに選択
//     const bgcolor = `#${bgcolorOptions[Math.floor(Math.random() * bgcolorOptions.length)]}`;
//     const textColor = `#${textColorOptions[Math.floor(Math.random() * textColorOptions.length)]} `;

//     // Canvasを作成
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = width;
//     canvas.height = height;

//     // 背景色を設定
//     ctx.fillStyle = bgcolor;
//     ctx.fillRect(0, 0, width, height);

//     // フォントサイズを適切な値に設定
//     const fontSize = Math.max(Math.min(width / (text.length < 10 ? 10 : text.length) * 2, height / 2), 10); // サイズと高さを考慮
//     ctx.font = `${fontSize}px Arial`;
//     ctx.fillStyle = textColor;

//     // テキストを中心に描画
//     ctx.textAlign = 'center'; // テキストを中央揃えに
//     ctx.textBaseline = 'middle'; // テキストのベースラインを中央に
//     ctx.fillText(text, width / 2, height / 2);

//     // imgタグのsrcに設定
//     element.src = canvas.toDataURL('image/png');
// }

// // 画像生成関数を呼び出す
// function placeholderable() {
//     const elements = document.querySelectorAll('img[data-ph]');
//     elements.forEach(placeholderableGenerateImage);
// }