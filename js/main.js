document.querySelector('#btn-generate').addEventListener('click', onClickGenerate);
function onClickGenerate(){
    //считать имя
    //если имени нет - предупредить пользователя о том, что он не ввел имя и выйти
    const { isError, name, gender } = inputAndCheckName();
    if(isError){
        return;
    }
    //сгенерировать число для аватара и использовать url из API (0 -- 99)
    //https://randomuser.me/api/portraits/men/77.jpg
    //сгенерировать ссылку на аватар
    const avaN = random(0, 99);
    const avaG = gender == 'female' ? 'women' : 'men';
    const ava = `https://randomuser.me/api/portraits/${ avaG }/${ avaN }.jpg`;
    //сгенерировать ХП и МП
    const hp = random(1, 100);
    const mp = random(1, 100);
    //Сгенерировать расу
    const races = ['Human', 'Elven', 'Orc', 'Dragon', 'Dwarf', 'Undead', 'Troll', 'Night Elf',
        'Draenei', 'Worgen', 'Pandaren', 'Tauren', 'Blood Elf', 'Goblin'];
    const race = races[random(0, races.length - 1)];
    //Сгенерировать класс
    const classes = ['Warrior', 'Mage', 'Warlock', 'Knight', 'Druid', 'Monk', 'Prophet', 'Hunter',
        'Rogue', 'Paladin', 'Shaman', 'Priest', 'Death Knight', 'Demon Hunter'];
    const clas = classes[random(0, classes.length - 1)];
    const LVL = getRndInteger(1, 10);
    //Сформировать HTML и вставить в контейнер(body)
    console.log(name, gender, ava, hp, mp, race, clas, LVL);
    const heroHtml = `
    <div style="margin-left: 15px">
    <div style="margin: 20px;" class="col mb-3">
    <div style="border-radius: 15px; margin: 15px; padding: 20px; width: 200px; background-color: snow; border-color: black; border-width: 2px" class="card h-170 ">
        <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: ${ hp }%" aria-valuenow="${ hp }" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="progress">
            <div class="progress-bar bg-info" role="progressbar" style="width: ${ mp }%" aria-valuenow="${ mp }" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <img src="${ ava }" class="card-img-top" alt="hero avatar">
        <div style="padding: 3px; margin: 3px; background-color: ghostwhite;border-radius: 10px; " class="card-body">
        <div style=" background-color: gainsboro; text-align: right">
        <h5 style="color: darkslategray; text-align: left" id="name" class="card-title">${ name }</h5>
         <b><span style="text-align: right; padding: 3px; margin: 3px; background-color: #eeffcd;color: purple; border-color: #f34c8a; 
         border-radius: 10px; " class="card-text">LVL ${LVL}</span></b>
        </div>
        <p style="text-align: left" class="card-text">${ race }</p>
        <p style="text-align: center; text-decoration: none; font-size: 11pt" class="card-text">${ clas }</p>
        </div>
    </div>
    </div>
    </div>`;
    document.querySelector('#hero-container').innerHTML += heroHtml;
}
function inputAndCheckName(){
    const inpName = document.querySelector('#inp-name');
    const inpNameNot = document.querySelector('#inp-name-notify');
    const inpGender = [...document.querySelectorAll('.inp-gender')];
    const answ = {
        isError : false,
        name : inpName.value,
        gender : inpGender.find(el => el.checked).value
    };
    inpName.value = '';
    inpNameNot.innerText = '';
    const patt1 = /\W/g;
    if(answ.name.length == 0 || answ.name.match(patt1)){
        inpNameNot.innerText = 'ENTER A HERO NAME(!!WITHOUT NON-WORD CHARACTERS!!)!';
        answ.isError = true;
    }
    return answ;
}
function random(from = 1, to = 100){
    return Math.floor(Math.random() * (to - from + 1) + from);
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
