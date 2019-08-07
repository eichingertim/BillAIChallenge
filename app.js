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

var db = firebase.firestore();

const txtEmailRegister = document.getElementById('txt_email_register');
const txtPasswordRegister = document.getElementById('txt_password_register');
const btnRegister = document.getElementById('btn_register');

const txtEmailLogin = document.getElementById('txt_email_login');
const txtPasswordLogin = document.getElementById('txt_password_login');
const btnLogin = document.getElementById('btn_login');

const btnSignOut = document.getElementById('btn_sign_out');
const btnOpenLogin = document.getElementById('btn_open_login');
const btnOpenRegister = document.getElementById('btn_open_register');


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
        var user = firebase.auth().currentUser;
        db.collection("users").doc(user.uid).set({
            email: email
        })
        .then(function() {
            console.log("Document successfully written!");
            document.getElementById('id02').style.display='none';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }).catch(e => console.log(e.message));

});

btnSignOut.addEventListener('click', e => {
    firebase.auth().signOut().catch(function(error) {
        console.log(error.message);
      });
});

var ul = document.getElementById('list_items');

//RealTimeAuthentication Listener
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        btnOpenLogin.style.display = 'none';
        btnOpenRegister.style.display = 'none';
        btnSignOut.style.display = 'block';

        getListUpdates(user);

        console.log(user);
      } else {
        btnOpenLogin.style.display = 'block';
        btnOpenRegister.style.display = 'block';
        btnSignOut.style.display = 'none';
        console.log('not logged in');
      }
});

function getListUpdates(user) {
    db.collection("users").doc(user.uid).collection("bons").onSnapshot(function(querySnapshot) {
        ul.innerHTML = "";
        querySnapshot.forEach(function(doc) {
            renderList(doc);
        });
    });
}

function renderList(doc) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(doc.data().title));
    ul.appendChild(li);
}

//Add a new entry
function addEntry() {
    var entryString = document.getElementById("entry_input").value;

    if (entryString == "") {
        alert('Du musst etwas eingeben um es hinzufügen zu können');
    } else {
        var user = firebase.auth().currentUser;
        if (user != null) {
            db.collection("users").doc(user.uid).collection("bons").add({
                title: entryString
            })
            .then(function(docRef) {
                document.getElementById("entry_input").value = '';
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        } else {
            alert("Du musst dich einloggen um deiner Liste etwas hinzufügen zu können!");
        }

        

    }

}