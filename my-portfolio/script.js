/*　ボタンと表示要素を取得　*/
const buttons = document.querySelectorAll(".sound-button");
const selectedMode = document.querySelector("#selected-mode");
const soundImage = document.querySelector("#sound-preview");


/*　モードごとの画像　*/
const soundImages = {
    MUSIC:"sound-music.jpg",
    MOVIE:"sound-movie.jpg",
    GAME:"sound-game.jpg",
    TALK:"sound-talk.jpg"
};


/*　４種類の画像を事前に読み込む　*/
const preloadedImages = Object.values(soundImages).map((src) =>{

    const image = new Image();

    image.src = src;

    return image;

});


/*　タイマーを管理する変数　*/
let imageChangeTimer;


/*　ボタンのクリック処理　*/ 
buttons.forEach((button) =>{

    button.addEventListener("click",() =>{

        const mode = button.dataset.mode;

        /*　すべてのボタンを非選択にする　*/
        buttons.forEach((item) =>{
            item.classList.remove("is-active");
        });

        /*　クリックしたボタンを選択する　*/
        button.classList.add("is-active");

        /*　モード名を切り替える　*/
        selectedMode.textContent = mode;

        /*　前の切り替え予約を取り消す　*/
        clearTimeout(imageChangeTimer);

        /*　動きを減らす設定なら即時切り替え　*/
        if(window.matchMedia("(prefers-reduced-motion:reduce)").matches){
            soundImage.src = soundImages[mode];
            soundImage.alt = mode + "モードの演出画像";
            soundImage.classList.remove("is-changing");
            return;
        }

        /*　フェードアウト開始　*/
        soundImage.classList.add("is-changing");

        /*　0.3秒後に画像を変更　*/
        imageChangeTimer = setTimeout(() =>{

            soundImage.src = soundImages[mode];
            soundImage.alt = mode + "モードの演出画像";

            /*　フェードイン開始　*/
            soundImage.classList.remove("is-changing")

        },450);

    });

});


/*　スクロールで表示する要素　*/
const creativePoints = document.querySelectorAll(
    ".detail-page .creative-point"
);


/*　動きを減らす設定か確認　*/
const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion:reduce)"
).matches;


/*　対応ブラウザでアニメーションを実行　*/
if("IntersectionObserver"in window && !reduceMotion){

    const revealObserver = new IntersectionObserver(
        (entries,observer) => {

            entries . forEach((entry) =>{

                /*　要素が画面に入ったら　*/
                if(entry .isIntersecting){

                    entry .target.classList.add("is-visible");

                    /*　一度表示したら監視を終了　 */
                    observer .unobserve(entry.target);

                }

            });

        },
        {
            threshold:0.1
        }
    );

    /*　各CREATIVE　POINTを監視する　*/
    creativePoints.forEach((point) =>{

        point.classList.add("scroll-reveal");

        revealObserver.observe(point);

    });
}