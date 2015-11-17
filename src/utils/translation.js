function translate(wordToTranslate, cb) {
  const yandexApi = 'https://translate.yandex.net/api/v1.5/tr.json/translate?';

  // TODO: Remove API key from client code and generate new key.
  const privateYandexApiKey = 'trnsl.1.1.20150409T154545Z.47a7912318b110d7.' +
                                '8041c137864c7adcafb91abcefc0a49c3ba853fb';

  const translationDirection = 'ru';

  let requestText = yandexApi + 'key=' + privateYandexApiKey;

  requestText += '&text=' + wordToTranslate + '&lang=' + translationDirection;

  var request = new XMLHttpRequest();

  request.open('GET', requestText, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);

      cb(data.text[0]);
    }
  };

  request.onerror = function() {
    // TODO
  };

  request.send();
}

export { translate };
