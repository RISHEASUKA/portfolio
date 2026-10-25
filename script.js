// 動画ボタンを押すとダイアログで再生できる。JavaScriptが無効な場合は動画URLへ直接移動する。
const dialog = document.getElementById('video-dialog');
const player = document.getElementById('video-player');
const dialogTitle = document.getElementById('video-dialog-title');
const closeButton = document.getElementById('video-close');

if (dialog && player && typeof dialog.showModal === 'function') {
  document.querySelectorAll('[data-video]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      dialogTitle.textContent = link.dataset.title || 'デモ動画';
      player.poster = link.dataset.poster || '';
      player.src = link.getAttribute('href');
      dialog.showModal();
      player.load();
      closeButton.focus();
    });
  });

  const closeVideo = () => dialog.close();
  closeButton.addEventListener('click', closeVideo);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeVideo();
  });
  dialog.addEventListener('close', () => {
    player.pause();
    player.removeAttribute('src');
    player.load();
  });
}

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());