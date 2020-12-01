//TODO VIEW
document.querySelector('#btn-generate').addEventListener('click', onClickGenerate);
document.querySelector('#btn-delete-all').addEventListener('click', onClickDeleteAll);

//TODO CONTROLLER
function onClickGenerate(){
    //считать имя
    //если имени нет - предупредить пользователя о том, что он не ввел имя и выйти
    const { isError, name, gender } = inputAndCheckName();
    if(isError){
        return;
    }

    const user = { name };

    //сгенерировать число для аватара и использовать url из API (0 -- 99)
    //https://randomuser.me/api/portraits/men/77.jpg
    //сгенерировать ссылку на аватар
    //TODO MODEL
    const avaN = random(0, 99);
    const avaG = gender == 'female' ? 'women' : 'men';
    user.ava = `https://randomuser.me/api/portraits/${ avaG }/${ avaN }.jpg`;

    //TODO MODEL
    //сгенерировать ХП и МП
    user.hp = random(1, 100);
    user.mp = random(1, 100);
    user.lvl = random(1, 10);
    user.uid = generateUID();

    //TODO MODEL
    //Сгенерировать расу

    user.human = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRoOJ3wiMGoC1y2NQPkKRCKFcyMD1qrK0n7g&usqp=CAU';
    user.elf = 'https://i.etsystatic.com/9879972/r/il/494959/1531730199/il_570xN.1531730199_8ero.jpg';
    user.orc = 'https://cdn.dribbble.com/users/2043038/screenshots/4708721/orc.png';
    user.dragon = 'https://media.istockphoto.com/vectors/dragon-icon-with-fire-symbol-vector-id1191986285?b=1&k=6&m=1191986285&s=612x612&w=0&h=XGvPRd8BjmkRgv4eQUFq4tHNoMYReL9tm8qEf7nUoxA=';
    user.dwarf = 'https://www.creativefabrica.com/wp-content/uploads/2019/04/Garden-gnome-line-art-drawing-4-580x386.jpg';
    user.undead = 'https://i.pinimg.com/originals/74/e2/21/74e22176c7c930ce2518bb2e45cebc31.jpg';
    user.troll = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdGHuvLLMoqvCKo0XzHVRoxlxR_205AkAOSA&usqp=CAU';
    user.nightElf = 'https://i.pinimg.com/originals/8b/eb/97/8beb977853c4819b27c1e33c3e45c7ca.jpg';
    user.draenei = 'https://lh3.googleusercontent.com/proxy/tmXkMMuYCH3zgsfhp8wQxX3ifk0fFu1xr8Eoa0Tfp_BdNq8OJJ_kCapgMZBwU482pSb9a8XjxJvLv9NFfxMlGl7Zxv8_Mdg664ITCiDtYhxy1eV2XiUzu_4pLFR0Te9x6RtV1pP3ARvJcTrKNh6IAKUzvcPotYWR3JPZfSM';
    user.worgen = 'https://disciplinaryaction.files.wordpress.com/2012/04/icon_wooden_worgen.png';
    user.pandaren = 'https://mir-s3-cdn-cf.behance.net/projects/404/e147ee91583457.Y3JvcCw5MDcsNzEwLDYwLDA.png';
    user.tauren = 'https://www.kindpng.com/picc/m/28-289775_wow-tauren-symbol-hd-png-download.png';
    user.bloodElf = 'https://i.pinimg.com/originals/7c/37/bf/7c37bf2f28aefca6e5335da6d1a933fe.jpg';
    user.goblin = 'https://icon-library.com/images/goblin-icon/goblin-icon-6.jpg';

    const iconR = [user.human, user.elf, user.orc, user.dragon, user.dwarf, user.undead,
        user.troll, user.nightElf, user.draenei, user.worgen, user.pandaren, user.tauren, user.bloodElf, user.goblin];
    const races = ['Human', 'Elven', 'Orc', 'Dragon', 'Dwarf', 'Undead', 'Troll', 'Night Elf',
        'Draenei', 'Worgen', 'Pandaren', 'Tauren', 'Blood Elf', 'Goblin'];
    user.race = races[random(0, races.length - 1)];
    switch (user.race) {
        case 'Human' :
            user.icon = iconR[0];
            break;
        case 'Elven' :
            user.icon = iconR[1];
            break;
        case 'Orc' :
            user.icon = iconR[2];
            break;
        case 'Dragon' :
            user.icon = iconR[3];
            break;
        case 'Dwarf' :
            user.icon = iconR[4];
            break;
        case 'Undead' :
            user.icon = iconR[5];
            break;
        case 'Troll' :
            user.icon = iconR[6];
            break;
        case 'Night Elf' :
            user.icon = iconR[7];
            break;
        case 'Draenei' :
            user.icon = iconR[8];
            break;
        case 'Worgen' :
            user.icon = iconR[9];
            break;
        case 'Pandaren' :
            user.icon = iconR[10];
            break;
        case 'Tauren' :
            user.icon = iconR[11];
            break;
        case 'Blood Elf' :
            user.icon = iconR[12];
            break;
        case 'Goblin' :
            user.icon = iconR[13];
            break;
    }


    //TODO MODEL
    //Сгенерировать класс
    const classes = ['Warrior', 'Mage', 'Warlock', 'Knight', 'Druid', 'Monk', 'Prophet', 'Hunter',
        'Rogue', 'Paladin', 'Shaman', 'Priest', 'Death Knight', 'Demon Hunter'];
    user.clas = classes[random(0, classes.length - 1)];

    //Сформировать HTML и вставить в контейнер(body)
    //TODO MODEL
    saveUser(user);

    renderUser(user);


}

//TODO CONTROLLER
function onClickDeleteAll(){
    //TODO MODEL
    Cookie.set('users', JSON.stringify([]), 30);

    firstLoad();
}

//TODO VIEW
function renderUser({ name, ava, hp, mp, race, icon, clas, lvl, uid}) {
    const delClass = `btn-del-${uid}`;

    const heroHtml = `
    <div class="col mb-4">
    <div class="card h-100">
        <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: ${hp}%" aria-valuenow="${hp}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="progress">
            <div class="progress-bar bg-info" role="progressbar" style="width: ${mp}%" aria-valuenow="${mp}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <img src="${ava}" class="card-img-top" alt="hero avatar">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
             
               <div class="col-md-4"><div class="float-left">
                <img src="${icon}" 
                class="card-img" alt="icon">
                </div>
           </div>
            <p class="card-text">   ${race}</p>
            <div class="float-right">
                <span style="background-color: #eeffcd; color: purple; border-color: #f34c8a; 
                border-radius: 10px;" class="card-text p-2">LVL ${lvl}</span>
            </div>
            <!--
            <div class="col-md-4"><div class="float-left">
                <img src="" 
                class="card-img" alt="icon">
                </div>
           </div>-->
            <p class="card-text">${clas}</p>
            <div>
                <button type="button" class="btn btn-warning ${delClass}" data-uid="${uid}">Delete</button>
            </div>
        </div>
    </div>
    </div>`;

    document.querySelector('#hero-container').insertAdjacentHTML('afterbegin', heroHtml);

    document.querySelector(`.${delClass}`).addEventListener('click', deleteUser);
}//TODO CONTROLLER
function deleteUser({ target }){
    const uidF = target.dataset.uid;

    //TODO MODEL
    let users = Cookie.get('users');
    users = users === '' ? [] : JSON.parse(users);

    //TODO MODEL
    users = users.filter(({ uid }) => uid != uidF);
    Cookie.set('users', JSON.stringify(users), 30);

    firstLoad();
}

//TODO MODEL
function inputAndCheckName(){
    //TODO VIEW
    const inpName = document.querySelector('#inp-name');
    const inpNameNot = document.querySelector('#inp-name-notify');
    const inpGender = [...document.querySelectorAll('.inp-gender')];

    //TODO MODEL
    const answ = {
        isError : false,
        name : inpName.value,
        gender : inpGender.find(el => el.checked).value
    };

    //TODO VIEW
    inpName.value = '';
    inpNameNot.innerText = '';

    //TODO MODEL
    const regName = /\W/g;
    if(answ.name.length == 0 || answ.name.match(regName)){
        //TODO VIEW
        inpNameNot.innerText = 'ENTER A HERO NAME(!!WITHOUT NON-WORD CHARACTERS!!)!';
        answ.isError = true;
    }

    return answ;
}

//TODO MODEL
function random(from = 1, to = 100){
    return Math.floor(Math.random() * (to - from + 1) + from);
}

//TODO MODEL
function saveUser(user){
    let users = Cookie.get('users');
    users = users === '' ? [] : JSON.parse(users);
    users.push(user);
    Cookie.set('users', JSON.stringify(users), 30);
}

function firstLoad(){
    //TODO MODEL
    let users = Cookie.get('users');
    users = users === '' ? [] : JSON.parse(users);

    //TODO VIEW
    document.querySelector('#hero-container').innerHTML = '';
    users.forEach(renderUser);
}

//TODO HELPER
class Cookie{
    static set(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    }
    static get(cname) {
        const name = `${cname}=`;
        const coo = document.cookie.split(';').find(el => (el.trim()).startsWith(name));

        return coo ? coo.trim().slice(name.length) : '';
    }
    static del(cname){
        document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

//TODO MODEL
function generateUID(){
    const r = (Math.floor(Math.random() * 1000000)).toString(16);
    const d = Date.now().toString(16);
    return r + d;
}


function lastVisit(){
    //TODO MODEL
    let visit = Cookie.get('visit');
    visit = visit == '' ? Date.now() : visit;

    const curTime = Date.now();
    let interv = Math.floor((curTime - visit) / 1000);

    Cookie.set('visit', curTime, 365);
    let timeFormat = '';

    switch(true){
        case interv < 60 : {
            timeFormat = 's';
            break;
        }
        case interv >= 60 && interv < 3600 : {
            interv = Math.floor(interv / 60);
            timeFormat = 'm';
            break;
        }
        case interv >= 3600 && interv < 3600 * 24 : {
            interv = Math.floor(interv / 3600);
            timeFormat = 'h';
            break;
        }
        case interv >= 3600 * 24: {
            interv = Math.floor(interv / 3600 * 24);
            timeFormat = 'd';
            break;
        }
    }

    //TODO VIEW
    document.querySelector('#info-last-visit').innerText = `: ${ interv }${ timeFormat} ago`;
}

//TODO CONTROLLER
firstLoad();
lastVisit();