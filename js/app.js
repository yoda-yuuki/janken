"use strict";

(() => {
  const HAND_FORMS = [
    0, // グー
    1, // チョキ
    2, // パー
  ];

  const HAND_X = [
    0, // グー
    445, // チョキ
    815, // パー
  ];

  const HAND_WIDTH = [
    430, // グー
    410, // チョキ
    500, // パー
  ];

  const IMAGE_PATH = "./img/jk.jpg";

  const FPS = 10;

  let isPause = false;

  let currentFrame = 0;

  function main() {
    const canvas = document.getElementById("screen");
    const context = canvas.getContext("2d");
    const imageObj = new Image();
    currentFrame = 0;

    imageObj.onload = function () {
      function loop() {
        if (!isPause) {
          draw(canvas, context, imageObj, currentFrame++);
        }

        setTimeout(loop, 1000 / FPS);
      }
      loop();
    };
    imageObj.src = IMAGE_PATH;
  }

  /**
   * グー・チョキ・パー画像('./images/sprite.png')から特定の手の形を切り取る
   * @param {*} canvas HTMLのcanvas要素
   * @param {*} context canvasから取得した値。この値を使うことでcanvasに画像や図形を描画することが出来る
   * @param {*} imageObject 画像データ。
   * @param {*} frame 現在のフレーム数(コマ数)。フレーム % HAND_FORMS.lengthによって0(グー), 1(チョキ), 2(パー)を決める
   */
  function draw(canvas, context, imageObject, frame) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 0: グー, 1, チョキ, 2: パー
    const handIndex = frame % HAND_FORMS.length;
    const sx = HAND_X[handIndex];
    const swidth = HAND_WIDTH[handIndex];

    context.drawImage(
      imageObject,
      sx,
      0,
      swidth,
      imageObject.height,
      0,
      0,
      swidth,
      canvas.height
    );
  }

  function setButtonAction() {
    const rock = document.getElementById("rock");
    const scissors = document.getElementById("scissors");
    const paper = document.getElementById("paper");
    const restart = document.getElementById("restart");

    function onClick(event) {
      // 自分の手と相手の手の値を取得する。
      const myHandType = parseInt(event.target.value, 10);
      const enemyHandType = parseInt(currentFrame % HAND_FORMS.length, 10);

      isPause = true;

      judge(myHandType, enemyHandType);
    }

    rock.addEventListener("click", onClick);
    scissors.addEventListener("click", onClick);
    paper.addEventListener("click", onClick);

    restart.addEventListener("click", function () {
      window.location.reload();
    });
  }

  // 自分の手の値(0~2のいずれか)と相手の手の値(0~2のいずれか)を使って計算を行い
  // 値に応じて勝ち・負け・引き分けを判断して、アラートに結果を表示する。
  function judge(myHandType, enemyHandType) {
    // 0: 引き分け, 1: 負け, 2: 勝ち
    // じゃんけんの勝敗判定のアルゴリズム: https://qiita.com/mpyw/items/3ffaac0f1b4a7713c869
    const result = (myHandType - Math.abs(enemyHandType) + 3) % 3;

    if (result === 0) {
      alert("引き分けです!");
    } else if (result === 1) {
      alert("あなたの負けです!");
    } else {
      alert("あなたの勝ちです!");
    }
  }

  setButtonAction();
  main();
})();
