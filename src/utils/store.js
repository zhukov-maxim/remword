import Firebase from 'firebase';

const appName = 'remword';
let firebaseRefWords = null;

function connectToFirebase(uid) {
  if (!uid) {
    return;
  }

  const pathWords = 'https://' + appName + '.firebaseio.com/' + 'users/' + uid + '/' + 'words/';

  firebaseRefWords = new Firebase(pathWords);
}

function getStore(uid) {
  if (!firebaseRefWords) {
    connectToFirebase(uid);
  }

  return firebaseRefWords;
}

export default getStore;
