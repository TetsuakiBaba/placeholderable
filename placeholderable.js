// 画像生成関数
function placeholderableGenerateImage(element) {
    // デフォルト値の設定
    const defaultWidth = 200;
    const defaultHeight = 100;
    const defaultText = `${defaultWidth}x${defaultHeight}`; // デフォルトのテキストオプション
    const defaultBgColors = ['#F2529D', '#A99CD9', '#9080F2', '#05F2F2', '#F2CB05']; // デフォルトの背景色オプション
    const defaultTextColors = ['EEEEEE']; // デフォルトのテキスト色オプション

    // 属性があればその値を使用し、なければデフォルト値を使用
    const width = parseInt(element.getAttribute('data-ph-width') || defaultWidth, 10);
    const height = parseInt(element.getAttribute('data-ph-height') || defaultHeight, 10);
    const text = element.getAttribute('data-ph-text') || defaultText;
    const bgcolorOptions = (element.getAttribute('data-ph-bgcolors') || defaultBgColors.join('#')).split('#').filter(c => c);
    const textColorOptions = (element.getAttribute('data-ph-colors') || defaultTextColors.join('#')).split('#').filter(c => c);

    // 背景色とテキスト色をランダムに選択
    const bgcolor = `#${bgcolorOptions[Math.floor(Math.random() * bgcolorOptions.length)]}`;
    const textColor = `#${textColorOptions[Math.floor(Math.random() * textColorOptions.length)]} `;

    // Canvasを作成
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // 背景色を設定
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, width, height);

    // フォントサイズを適切な値に設定
    const fontSize = Math.max(Math.min(width / (text.length < 10 ? 10 : text.length) * 2, height / 2), 10); // サイズと高さを考慮
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = textColor;

    // テキストを中心に描画
    ctx.textAlign = 'center'; // テキストを中央揃えに
    ctx.textBaseline = 'middle'; // テキストのベースラインを中央に
    ctx.fillText(text, width / 2, height / 2);

    // imgタグのsrcに設定
    element.src = canvas.toDataURL('image/png');
}

// 画像生成関数を呼び出す
function placeholderable() {
    const elements = document.querySelectorAll('img[data-ph]');
    elements.forEach(placeholderableGenerateImage);
}