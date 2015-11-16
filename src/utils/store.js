import Firebase from 'firebase';
import firebaseUtils from './firebaseUtils';

const appName = 'remword';

const pathWords = 'https://' + appName + '.firebaseio.com/' + 'users/' + firebaseUtils.getUid() + '/' + 'words/';

const firebaseRefWords = new Firebase(pathWords);

export default firebaseRefWords;
