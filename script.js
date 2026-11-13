const QUESTIONS = [
  'Bạn muốn ăn tối với ai nhất trên đời?',
  'Bạn có muốn trở nên nổi tiếng không? Bạn muốn nổi tiếng theo cách nào?',
  'Trước khi gọi điện bạn có nghĩ sẵn từ ngữ câu cú không?',
  'Trong mắt bạn, một ngày hoàn hảo sẽ như thế nào?',
  'Lần cuối bạn hát trước gương là khi nào? Lần cuối bạn hát trước mặt người khác là khi nào?',
  'Nếu có thể sống tới 90 tuổi, bạn sẽ chọn sống với tâm trí của tuổi 30 hay với thể xác của tuổi 30?',
  'Bạn từng linh cảm được mình sẽ chết như thế nào chưa?',
  'Liệt kê 3 điểm chung của các bạn.',
  'Điều gì khiến bạn thấy cảm kích nhất.',
  'Nếu có thể thay đổi một chuyện trong quá trình trưởng thành của mình, bạn sẽ thay đổi chuyện gì?',
  'Hãy kể về cuộc đời của bạn trong vòng 4 phút, cố gắng kể chi tiết nhất có thể.',
  'Nếu sáng mai thức giấc, bạn có thể nhận được một tài năng hoặc phẩm chất nào đó, bạn muốn có được điều gì?',
  'Nếu quả cầu thủy tinh có thể cho bạn biết tất cả mọi chuyện, bạn có muốn biết không?',
  'Có chuyện gì mà bạn luôn muốn làm nhưng chưa làm hay không? Tại sao?',
  'Thành tựu lớn nhất trong đời bạn là gì?',
  'Trong tình bạn, điều mà bạn coi trọng nhất là gì?',
  'Hồi ức quý giá nhất của bạn là gì?',
  'Hồi ức đau khổ nhất của bạn là gì?',
  'Nếu chỉ sống được một năm nữa, thì bạn có muốn sống khác đi hay không? Tại sao?',
  'Tình bạn có ý nghĩa thế nào với bạn?',
  'Trong cuộc đời bạn, yêu thương và tình cảm có vai trò thế nào?',
  'Liệt kê 5 phẩm chất ưu tú của đối phương.',
  'Quan hệ giữa bạn và người nhà như thế nào? Bạn có thấy tuổi thơ của mình hạnh phúc hơn những người khác không?',
  'Quan hệ của bạn và mẹ như thế nào?',
  'Đặt 3 câu mở đầu bằng từ "chúng ta", ví dụ như "Chúng ta ở trong phòng, cảm thấy..."',
  'Hoàn thiện 3 câu trên, ví dụ như "Tôi mong được ở bên XXX để sẻ chia..."',
  'Nếu các bạn định trở thành bạn bè thân thiết, hãy cho đối phương biết có lưu ý quan trọng gì mà anh ấy (cô ấy) nhất định phải biết.',
  'Hãy nói thật cho đối phương biết bạn thích anh ấy (cô ấy) ở điểm nào, nói những lời mà bình thường bạn ngại nói ra.',
  'Kể cho đối phương nghe về tình huống xấu hổ mà bạn từng gặp phải.',
  'Lần cuối bạn khóc trước mặt người khác là khi nào? Lần cuối bạn khóc một mình thì sao?',
  'Cho đối phương biết, từ tận đáy lòng mình bạn thấy thích phẩm chất nào ở anh ấy (cô ấy)?',
  'Bạn thấy chuyện gì không thể mang ra đùa giỡn?',
  'Nếu tối nay bạn sẽ qua đời, hơn nữa không có cơ hội tạm biệt bất kỳ ai, bạn thấy tiếc nuối nhất khi không được nói chuyện với ai? Tại sao tới giờ bạn vẫn chưa nói với người đó những lời này?',
  'Giả sử mọi thứ mà bạn có đều ở trong một ngôi nhà, giờ ngôi nhà bốc cháy, sau khi liều mình cứu người nhà và thú cưng, bạn nhận ra còn một cơ hội để chạy vào đám cháy, bạn sẽ chạy vào lấy thứ gì và tại sao?',
  'Trong tất cả người nhà của bạn, sự ra đi của ai sẽ khiến bạn đau khổ nhất? Tại sao?',
  'Hãy kể cho đối phương một vấn đề cá nhân, và hỏi nếu anh ấy (cô ấy) gặp phải vấn đề này thì anh ấy (cô ấy) sẽ làm thế nào? Sau đó cho đối phương biết suy nghĩ của bạn.'
];

const THEME_KEY = 'theme-preference';

const questionText = document.getElementById('questionText');
const card = document.getElementById('card');
const congrats = document.getElementById('congrats');
const actions = document.getElementById('actions');
const nextBtn = document.getElementById('nextBtn');
const skipBtn = document.getElementById('skipBtn');
const retryBtn = document.getElementById('retryBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const timerDisplay = document.getElementById('timer');

const TIMER_DURATION = 5 * 60;

let bag = [];
let currentIndex = null;
let timerInterval = null;
let timeLeft = TIMER_DURATION;

function shuffle(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function stopTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  stopTimer();
  timeLeft = TIMER_DURATION;
  timerDisplay.textContent = formatTime(timeLeft);
  timerDisplay.classList.remove('is-warning');
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      timeLeft = 0;
      stopTimer();
    }
    timerDisplay.textContent = formatTime(timeLeft);
    timerDisplay.classList.toggle('is-warning', timeLeft <= 30);
  }, 1000);
}

function startRound() {
  bag = shuffle(QUESTIONS.map((_, i) => i));
  currentIndex = null;
  congrats.hidden = true;
  card.hidden = false;
  actions.hidden = false;
  showNextQuestion();
}

function showNextQuestion() {
  currentIndex = bag.pop();
  questionText.textContent = QUESTIONS[currentIndex];
  resetTimer();
}

function finishRound() {
  stopTimer();
  card.hidden = true;
  actions.hidden = true;
  congrats.hidden = false;
}

function handleAdvance() {
  if (bag.length === 0) {
    finishRound();
  } else {
    showNextQuestion();
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute(
    'aria-label',
    theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'
  );
}

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

nextBtn.addEventListener('click', handleAdvance);
skipBtn.addEventListener('click', handleAdvance);
retryBtn.addEventListener('click', startRound);
themeToggle.addEventListener('click', () => {
  const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {}
});

applyTheme(getCurrentTheme());
startRound();
