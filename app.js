// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAC-bfchGdgVOHyj5jsLwPCLKUFd8XBrcU",
    authDomain: "bonai-bed7c.firebaseapp.com",
    databaseURL: "https://bonai-bed7c.firebaseio.com",
    projectId: "bonai-bed7c",
    storageBucket: "",
    messagingSenderId: "25809266576",
    appId: "1:25809266576:web:9ddf18d7cbe78159"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const txtEmailRegister = document.getElementById('txt_email_register');
const txtPasswordRegister = document.getElementById('txt_password_register');
const btnRegister = document.getElementById('btn_register');

const txtEmailLogin = document.getElementById('txt_email_login');
const txtPasswordLogin = document.getElementById('txt_password_login');
const btnLogin = document.getElementById('btn_login');


//LoginEvent
btnLogin.addEventListener('click', e => {

    const email = txtEmailLogin.value;
    const password = txtPasswordLogin.value;
    const auth = firebase.auth();

    //login
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.then(e => {
        document.getElementById('id01').style.display='none';
    }).catch(e => console.log(e.message));
    


});

//RegisterEvent
btnRegister.addEventListener('click', e => {

    const email = txtEmailRegister.value;
    const password = txtPasswordRegister.value;
    const auth = firebase.auth();

    //register
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.then(e => {
        document.getElementById('id02').style.display='none';
    }).catch(e => console.log(e.message));


});

//RealTimeAuthentication Listener
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user);
      } else {
        console.log('not logged in');
      }
});

//Add a new entry
function addEntry() {
    var entryString = document.getElementById("entry_input").value;

    if (entryString == "") {
        alert('Du musst etwas eingeben um es hinzufügen zu können');
    } else {
        var newElement = document.createElement("LI");
        var text = document.createTextNode(entryString);
        newElement.append(text);
        document.getElementById("list").appendChild(newElement);
    }

}