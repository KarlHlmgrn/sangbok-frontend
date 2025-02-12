import { defineStore, acceptHMRUpdate } from 'pinia';
import axios from 'axios';

export const useMainStore = defineStore('main', {
    state: () => ({
        events: {
            // 'c9b2c3af55abe': {
            //     name: 'KWFXQ',
            //     imgSrc: 'https://picsum.photos/1024/640',
            //     startDate: new Date(),
            //     endDate: new Date(new Date().valueOf() + 24 * 60 * 60 * 1000),
            //     description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Semper aptent mi finibus ultrices aliquam aenean. Neque porttitor ad congue dapibus fames et in venenatis potenti. Sollicitudin vehicula inceptos luctus a suspendisse convallis nunc. Est ad faucibus mollis euismod; rutrum lobortis ligula. Condimentum gravida conubia metus dapibus lacus natoque. Metus convallis ad vulputate eros lacinia quisque dignissim vivamus nisl. Facilisis sagittis blandit nam porttitor ultrices nisi eleifend. Pulvinar sem suspendisse dictum sem maximus hac id volutpat.',
            //     location: 'Stockholms Nation',
            //     hosts: ['K', 'W', 'F', 'X', 'Q'],
            //     pdfSrc: 'https://www.sldttc.org/allpdf/21583473018.pdf'
            // },
            // 'aa850e9982045': {
            //     name: 'Finanspong med STS',
            //     imgSrc: 'https://picsum.photos/1024/640',
            //     startDate: (new Date()).setDate((new Date()).getDate() + 15),
            //     endDate: (new Date()).setDate((new Date()).getDate() + 15),
            //     description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Semper aptent mi finibus ultrices aliquam aenean. Neque porttitor ad congue dapibus fames et in venenatis potenti. Sollicitudin vehicula inceptos luctus a suspendisse convallis nunc. Est ad faucibus mollis euismod; rutrum lobortis ligula. Condimentum gravida conubia metus dapibus lacus natoque. Metus convallis ad vulputate eros lacinia quisque dignissim vivamus nisl. Facilisis sagittis blandit nam porttitor ultrices nisi eleifend. Pulvinar sem suspendisse dictum sem maximus hac id volutpat.',
            //     location: 'Bridgens Hus',
            //     hosts: ['F', 'STS'],
            //     pdfSrc: 'https://www.sldttc.org/allpdf/21583473018.pdf'
            // },
            // '7981f1dffd375': {
            //     name: 'Fankta LuSTSia',
            //     imgSrc: 'https://picsum.photos/1024/640',
            //     startDate: (new Date()).setDate((new Date()).getDate() + 2),
            //     endDate: (new Date()).setDate((new Date()).getDate() + 2),
            //     description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Semper aptent mi finibus ultrices aliquam aenean. Neque porttitor ad congue dapibus fames et in venenatis potenti. Sollicitudin vehicula inceptos luctus a suspendisse convallis nunc. Est ad faucibus mollis euismod; rutrum lobortis ligula. Condimentum gravida conubia metus dapibus lacus natoque. Metus convallis ad vulputate eros lacinia quisque dignissim vivamus nisl. Facilisis sagittis blandit nam porttitor ultrices nisi eleifend. Pulvinar sem suspendisse dictum sem maximus hac id volutpat.',
            //     location: 'Bridgens Hus',
            //     hosts: ['F', 'STS'],
            //     pdfSrc: 'https://www.sldttc.org/allpdf/21583473018.pdf'
            // },
            // '907b5991f35bb': {
            //     name: 'SläXtFest',
            //     imgSrc: 'https://picsum.photos/1024/640',
            //     startDate: (new Date()).setDate((new Date()).getDate() - 14),
            //     endDate: (new Date()).setDate((new Date()).getDate() - 14),
            //     description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Semper aptent mi finibus ultrices aliquam aenean. Neque porttitor ad congue dapibus fames et in venenatis potenti. Sollicitudin vehicula inceptos luctus a suspendisse convallis nunc. Est ad faucibus mollis euismod; rutrum lobortis ligula. Condimentum gravida conubia metus dapibus lacus natoque. Metus convallis ad vulputate eros lacinia quisque dignissim vivamus nisl. Facilisis sagittis blandit nam porttitor ultrices nisi eleifend. Pulvinar sem suspendisse dictum sem maximus hac id volutpat.',
            //     location: 'Bridgens Hus',
            //     hosts: ['F', 'X'],
            //     pdfSrc: 'https://www.sldttc.org/allpdf/21583473018.pdf'
            // }
        },
        eventsFetched: false,
        originalSongs: [
            {
                name: "Festsång till UTN",
                melody: "Nu grönskar det",
                lyrics: "Vi samlats har i munter sal<br>att festa natten lång.<br>För att glömma trista tentatal<br>och vardags tråk och tvång.<br>Ett välbehag i vänners lag där glädjen står oss bi.<br>Så drick min vän, och festa glatt,<br>i UTNs regi!<br><br>All världens ting behärskar vi:<br>teknik och vetenskap.<br>De samlas här i harmoni,<br>i lyckligt äktenskap.<br>Men ett vi vet: att tid som gått den kommer ej igen.<br>Så lyft ditt glas, för framtids lott,<br>till skål för UTN!",
                id: "song0"
            },
            {
                name: "Sång till reccarna",
                melody: "Månvisa",
                lyrics: "Som ny student kan man lida brist,<br>på både nöjen och vänner.<br>Att bara plugga kan lätt bli trist,<br>det är väl därför man känner.<br>Att ett kårliv nog är det rätta<br>om själens hunger man söker mätta.<br>Vill ge igen, sök UTN!",
                id: "song1"
            },
            {
                name: "Civerth",
                melody: "Sjösala vals",
                lyrics: "Civerth, ja han rullar med ett brak ur sin säng;<br>håller sig för huvudet<br>åh, vad det bankar.<br>Firade sin tenta<br>som var värd fem poäng,<br>letar efter ölen han fick med sig hem.<br>Tuborg, lille Tuborg du hjälpte mig igår.<br>”Hej Tupp!”, sa mina vänner<br>som bar mig hem på bår,<br>och se så många tentor som redan klarats av på vägen:<br>Elläran, funktrean, statmek och analys!",
                id: "song2"
            },
            {
                name: "När Uppsala ekar",
                melody: "Uti vår hage",
                cred: "Leonardo Alvarez Urrutia, Andreas Bodegård, Erik Victorin",
                lyrics: "I våran labbsal där kopplas med vett<br>Höj spänningen<br>Händer det något så har du gjort rätt<br>När strömmen rinner igenom<br>När kretsen den mera ber om<br>När Uppsala ekar; hörs då ett E<br>Kom med oss rosa vi bjuder till dans<br>Hör Ohm Ampere<br>Med kära Kirschhoff vi har en romans<br>När strömmen rinner igenom<br>När kretsen den mera ber om<br>När Uppsala svänger, hörs då ett E<br>Morgonen efter så hänger jag kvar<br>På efterfest<br>Bredvid mig käraste Britta jag har<br>När strömmen rinner igenom<br>När kretsen den mera ber om<br>När Uppsala sover, hörs än ett E.",
                id: "song3"
            },
            {
                name: "Etanolhymnen",
                melody: "Änglamark",
                cred: "Tomas Källberg och Thomas Jönsson (2007), Kajsa Paulsson (2019)",
                lyrics: "Kalla oss ES-kåren<br>eller Salixvänner om ni vill.<br>Pollax små bönder<br>Som jorden ska rädda<br>Solceller och värmepumpar<br>Som ska fria oss från Peak Oil.<br>När oljan sinar så står vi beredda!<br>Låt oss få lyssna till talet om stenhårt bröd,<br>Finna vår frälsning av ångtrycksturbiner.<br>Låt oss få bada till Dalarnas pool är död,<br>Låt låren kämpa när motvinden viner.<br>Sluta förskjuta referaten till SLU.<br>Låt tysken skriva med tavlan mot bålen.<br>Ta första steget mot framtiden här och nu.<br>Allas vår lösning finns i etanolen.<br>Kalla oss ES-kåren…<br>Låt oss få kugga tills svaret är 42,<br>finna vår Esbjörn i sektionskrypinet.<br>Låt tvåor vråla till ES hallå hallå,<br>låt Physics Handbook få ersätta minnet.<br>Låt oss få vakna tillsammans på SLU.<br>Strunta i märkena på overallen.<br>Rädda planeten i framtiden jag och du.<br>Allas vår lösning finns i etanolen!",
                id: "song4"
            },
            {
                name: "Kul nästan jämt",
                melody: "Pärleporten",
                cred: "Spex - herrmiddagen 2016",
                lyrics: "Som I våra fäders fotspår<br>Kul nästan jämt, är våran tro<br>all den intelligens och hybris<br>som på F-sektionen bo<br>Vi har på oss overaller<br>Dricker bara hemjäst vin<br>Umgås aldrig med nån annan<br>Vi är högst i hierarkin<br>Om vi någonsin är vilsna<br>Physics Handbok ger oss råd<br>Kaffe, alkohol och Uwe<br>det är källan till all nåd<br>Vi har på oss overaller<br>Dricker bara hemjäst vin<br>Umgås aldrig med nån annan<br>Vi är högst i hierarkin<br>Avlar bara med varandra<br>Allting annat vore skam<br>Om ni sneglar på nån annan<br>kommer vårat brännjärn fram<br>Vi har på oss overaller<br>Dricker bara hemjäst vin<br>Umgås aldrig med nån annan<br>Vi är högst i hierarkin",
                id: "song5"
            },
            {
                name: "Jag ser eld",
                melody: "I see fire",
                cred: "K:s Konnässörer",
                lyrics: "Åh, tänkte på labben igår<br>Undrar hur labbläraren mår<br>Men det som hände var inte mitt fel<br>Jag bara bidrog en del<br>Jag hade fått lära mig att eter brinner bra<br>Att peroxider bildas om den får stå ett tag<br>Den är väldigt flyktig, kokpunkt 307,75 K<br>Se den fylla dragskåpet om den står utan lock<br>Hade festat till klockan sex, kvällen innan<br>Jag var bakis som satan<br>Riskbedömningen ofullständig<br>Satte etern på kokning, det var dumt gjort<br>Och därefter gick allting väldigt fort<br>Jag ser eld, inuti mitt dragskåp<br>Jag ser eld, det brinner som fan<br>Jag ser lågorna, två meter höga<br>Jag ser eld, labbläraren sprang<br>Och jag hoppas att han inte kuggar mig.<br>Om nu labbet brinner hoppas jag det brinner ner<br>För om bevisen försvinner så kan jag bränna fler<br>När jag ser elden sprida sig, i denna labbsal<br>Och av den hetta som jag känner, ser jag klassen skrika ut<br>Jag ser eld…",
                id: "song6"
            },
            {
                name: "Vikingen",
                melody: "When Johnny comes Marching Home",
                lyrics: "En viking älskar livets vann,<br>hurra, hurra!<br>Så hastigt i hans svalg försvann,<br>hurra, hurra!<br>Till kalv, till oxe, till fisk, till fläsk,<br>när gamlingar bara dricker läsk,<br>ja då vill alla vikingar ha en bäsk!<br>När bäsken småningom är slut,<br>tragik, tragik!<br>Då bäres varje viking ut,<br>som lik, sig lik!<br>Och när vi vaknar, vi sjunger en bit,<br>och korkar upp Skånes aquavit.<br>Skål för alla vikingar som kom hit!",
                id: "song7"
            },
            {
                name: "IT-marschen",
                melody: "When Johnny comes Marching Home",
                lyrics: "Till Polacksbacken marscherar vi,<br>hurra hurra!<br>För vi ska teknologer bli,<br>hurra hurra!<br>För vi ska vinna och vi ska ta dom,<br>vi ska göra köttfärs av dom.<br>Allting dör när IT-marscherar fram!<br>Lala lala lala<br>…<br>Allting dör när IT-marscherar fram!",
                id: "song8"
            },
            {
                name: "En BASic viking",
                melody: "Melodi: When Johnny comes Marching Home",
                lyrics: "Och vekast utav vikingarna<br>Det är vi!<br>Från Hum och Sam och estetik<br>Är komna hit!<br>Första räden börjar nu!<br>Promillen den är större än 7!<br>Ja skål för BASAR, gult är inte fult!",
                id: "song9"
            },
            {
                name: "Jag är utbildad jag lovar",
                melody: "Fångad av en stormvind",
                cred: "Lisa Stahl",
                lyrics: "Jag har lite svårt för mol<br>Men vad som är ett BÄR, kan jag säga dig<br>Fast jag inte kan förstå<br>Din jämnviktsreaktion, när du visar den för mig<br>Känner doften av en dissekerad fisk<br>Allt jag vill är att få se dess inre skikt<br>Jag är utbildad jag lovar<br>Fråga mig, för då ska jag visa dig<br>Hur ett blötdjur får sin föda<br>Sex-pili och slemsvamp<br>Fråga mig, för då ska jag visa dig<br>Vad det innebär att sporulera<br>Om du frågar oss om log<br>Så blir det nog rätt tyst, här i klassrummet<br>Men din lilla subenhet<br>Den vet jag hur den gör, när den läser ditt genom<br>Om du ger mig lite av ditt DNA<br>Så vet jag plötsligt vem din mammas mormor va<br>||: Jag är utbildad jag lovar<br>Fråga mig, för då ska jag visa dig<br>Hur ett blötdjur får sin föda<br>Sex-pili och slemsvamp<br>Fråga mig, för då ska jag visa dig<br>Vad det innebär att sporulera :||<br>Jag är biolog så fråga mig!",
                id: "song10"
            },
            {
                name: "Vi äro studenter av jord",
                melody: "Vi gå över daggstänkta berg",
                lyrics: "Vi äro studenter av jord, makadam!<br>Till grus och gegga finner vi snabbt ord, makadam!<br>Fast sorger har vi många,<br>våra tentor är långa,<br>för vi är studenter av jord, makadam!<br>Vi äro studenter av berg, Krakatau!<br>Är geologer ändå in till märg, Krakatau!<br>Våra hammare, de sjunga<br>när de slår mot malmer tunga<br>för vi är studenter av berg, Krakatau!<br>De gamla och kloka brevé, SGU!<br>Vi äro ej anställda såsom de, SGU!<br>För jobben de är ringa,<br>och kontakter har vi inga,<br>men likväl kan vi festa och le, SGU!",
                id: "song11"
            },
            {
                name: "Ode till Breznak",
                melody: " Månvisa",
                cred: "Viktor Holmquist, Max Isacsson, Erik Sjöström, Johan Asplund, Pontus Södergren",
                lyrics: "Det stod en Březňák i Uthgårds kyl<br>Det var den ädlaste ölen<br>Den hade folie på sin kapsyl<br>Bara 25 kronor för den<br>Ja det var gott hördes folket ropa<br>Klubbverket svarte nu var det nog, va?<br>Det var det ej, det var det ej!<br>En flaska Březňák är inte dum<br>Och passar bra uti punschen<br>Ty punschen blivit ett Březňákrum<br>Jag skulle haft en till lunchen<br>En flaska Březňák går snabbt att dricka<br>Jag vill ha flera tills jag fått hicka<br>Nu dricks det ur, nu dricks det ur!<br>Jag ser en Březňák och den blir två<br>Jag vetifan vad som händer<br>Jag tror nog snart jag får svårt att stå<br>Jag prövar vandra på händer<br>Men det gick inte för uti handen<br>Jag hade Březňák men sen försvann den<br>Hårt föll jag sen, På Březňáken!<br>Ja, dimman lagt sig och jag är full<br>Jag bara sluddrar och svamlar<br>På huvvet har jag fått en kastrull<br>Den ska jag ha när jag ramlar<br>Och bakom disken hörs Mattsson vråla,<br>Ni är för fulla gå hem och sov, va<br>Två Březňák till, Två Březňák till!<br>Men ut från gården jag sparkad blev<br>så var det slut på den kvällen<br>På vägen hem så var världen skev<br>Då fick kastrullen ta smällen<br>Å när jag ligger där uti riset<br>Så slocknar stjärnorna genom diset<br>Vi ses igen, med Březňákeeen!",
                id: "song12"
            },
            {
                name: "Längtan till bioteknik",
                melody: "Längtan till landet",
                cred: "Alfred Andersson, Hannes Thorell, William Eulau",
                lyrics: "Bioteknik kan vi allihopa<br>Vårt genom är fyllt av ATP<br>Hör hur stolt varenda stämma ropa<br>DNA av högsta kvalité<br>I vårt labb så jobbar våra händer<br>Labbrocken den är vår vita särk<br>Med vår skicklighet blir vi legender<br>Biotech, det är vårt mästerverk",
                id: "song13"
            },
            {
                name: "Balladen om kemikum",
                melody: "Hujedamej",
                cred: "Peter Sylwander",
                lyrics: "Kom nu här go’ vänner så ska jag för er berätta<br>Sagan om det rätta stället för kemi.<br>En ståtlig kloss vid engelsk park med ljusrosa paneler<br>Och en samling av kameler som ej led av arytmi.<br>Hujedamej sånt plejs det var, ej bättre tänkas kan<br>Varannan labbsal sprängde vi, varannan labbsal brann.<br>Och vårt labb var inrett medelst furuplank och plywood<br>Labbsalen var trångbodd men vad gör väl det? E-kolvarna<br>läckte och pipetten var rätt trögstyrd<br>Träbänken var inpyrd av bensen och DDT.<br>Hujedamej sånt plejs det var, ej bättre tänkas kan Där<br>psykopat och pyroman glatt labba’ med varann.<br>Från taket droppa’ syror, explosioner hördes ofta<br>Hela stället dofta’ liksom kemikalier gör<br>Labbar oftast avbröts först när doktoranden ropa’<br>”Ge er allihopa! Lägg ner kolven, eld upphör!”<br>Hujedamej sånt plejs det var, ej bättre tänkas går Där<br>laboranter chansa’ vilt och sen bars ut på bår.<br>Kvällstid fylldes stället utav fulla beduiner<br>Berusade på viner som de bryggt utan talang<br>Labbsprit fanns i kranen liksom varmvatten och eter<br>Omrörarmagneter, ja det är finemang!<br>Hujedamej sånt plejs det var ej bättre tänkas kan Men<br>humanisten kom en dag... och Kemikum försvann",
                id: "song14"
            },
            {
                name: "Lärarsången",
                melody: "trad. If you’re happy and you know it clap your hands",
                lyrics: "Vem har status, karaktär och disciplin? LÄRARE!<br>Får ta hand om obstinata tonårssvin? LÄRARE!<br>Vem kan sköta overheaden, vem kan skriva snyggt på<br>snedden.<br>Vem kan sätta mål och skriva prov i tid? LÄRARE!<br>Vem har 8 veckors soligt sommarlov? LÄRARE!<br>Vem är ledig höst och vinter, sommar,vår? LÄRARE!<br>Vem har rast varannan timme, vem får peka med sin<br>pinne,<br>vem får pimpla 15 kaffe varje dag? LÄRARE!<br>Nu så byter vi vårt kaffe emot vin, GÅ PÅ FEST!<br>Slutar inte bättre än ett fyllesvin, GÅ PÅ FEST!<br>Vi har inga mål att uppnå, mer än kvällen att stå upp på.<br>Dags att höja våra glas och säga skål, SKÅL!",
                id: "song15"
            },
            {
                name: "Då går jag ner i min källare (A/N: Det är nån copyright-grej i sångboken. help!)",
                melody: "Pierre Isacsson Musik: Håkan Thanger",
                lyrics: "Hemma gillar dom fester<br>Med pompa och med ståt<br>Med smoking bland våra gäster<br>Jag smilar och går åt<br>Och efter några timmar<br>Är allt ett stort hallå<br>Jag söker då en lugnare nivå<br>Då går jag ner i min källare<br>Där lever jag sällare<br>För där har jag kvar<br>Min gamla ångmaskin<br>Jag matar metatabletter i den<br>Lyssnar och glömmer tiden<br>Tar ett glas vin<br>I ångan från maskin<br>Många dagar är trista<br>Och många himlar grå<br>Om nästa dag är den sista<br>Ser jag helst att den är blå<br>Men skulle något hända<br>Som ingen kan rå för<br>Så vet jag ganska säkert vad jag gör<br>Då går jag ner i min källare<br>Där lever jag sällare<br>För där har jag kvar<br>Min gamla ångmaskin<br>Jag matar metatabletter i den<br>Lyssnar och glömmer tiden<br>Tar ett glas vin<br>I ångan från maskin<br>Då går jag ner i min källare<br>Där lever jag sällare<br>För där har jag kvar<br>Min gamla ångmaskin<br>Jag matar metatabletter i den<br>Lyssnar och glömmer tiden<br>Tar ett glas vin<br>I ångan från maskin<br>Då går jag ner i min källare<br>Där lever jag sällare<br>För där har jag kvar<br>Min gamla ångmaskin<br>Jag matar metatabletter i den<br>Lyssnar och glömmer tiden<br>Tar ett glas vin<br>I ångan från maskin",
                id: "song16"
            },
            {
                name: "Lille Olle",
                melody: "Katjuscha",
                cred: "Calle Isaksson",
                lyrics: "Lille Olle skulle gå på disco,<br>Lille Olle hade inte någon sprit.<br>Lille Olle fixa’ lite hembränt,<br>Lille Olle gick då på en nit.<br>La la la laa laa laa la la…<br>Lille Olle började att festa,<br>spriten blandade han med Äppelmer.<br>Lille Olle drack upp femton flaskor,<br>Lille Olle ser nu inte mer.<br>La la la laa laa laa la la…<br>Lille Olle skaffade en ledhund,<br>den var ful och även ganska trind.<br>Olles ledhund drack upp hela bålen,<br>Olles ledhund är nu också blind.<br>La la la laa laa laa la la...<br>Lille Olle började med droger,<br>blandade sin LSD med juice.<br>Lille Olles hjärna stod i lågor,<br>lille Olle dog av överdos.<br>La la la laa laa laa la la…<br>Lille Olle sitter nu i himlen,<br>festa kan man göra även där.<br>Lille Olle skaffade en ölback,<br>capsar nu med Gud och Sankte Per.<br>La la la laa laa laa la la…",
                id: "song17"
            },
            {
                name: "Tjugo år sen ungefär",
                melody: "Ovan där",
                cred: "Anders Ekman",
                lyrics: "För tjugo år sen ungefär,<br>Conny sade si så här:<br>Rädda världen, det gör ingen,<br>Allt är hemskt och blott misär.<br>En förändring måste ske.<br>Jo, jag startar W.<br>Ingenjörer, de fixar allt det där.<br>W - jordens enda hopp.<br>W - på fördärvet sätter stopp.<br>W - här är alltid fest.<br>Bland sektioner så är du allra bäst.<br>Under åren som sen gått,<br>Sin examen många fått.<br>Vilken jättestor framgång,<br>För en examen det är flott.<br>Och en dag ska även ja’<br>Bli så jätte-, jättebra<br>Men först så ska vi festa natten lång.<br>W - jordens enda hopp… …<br>Bland sektioner så är du allra bäst<br>Bland sektioner så är vi allra bäst",
                id: "song18"
            },
            {
                name: "Schlager i Teknik och Samhälle",
                melody: "Eloise",
                cred: "Adam Linde",
                lyrics: "Sommaren är lång när man för det mesta bara längtar hit<br>Är inte lika kul ens att dricka sprit<br>Ahahaa<br>Längtar efter er och att börja på ännu en termin<br>På det bästa program i detta land<br>Där vi skapar så starka band<br>Bapapapa…<br>STS<br>Vi är mer än ingenjörer<br>Och nu så tar vi över<br>För vi får Uppsala att tända<br>STS<br>Vi får vindarna att vända<br>Ikväll kan allting hända<br>De säger ju att vi är bäst på fest<br>STS<br>Vi kan nästan allting om IT och energisystem<br>Löser nästan alla världens program<br>Ahahaa<br>Det förbereder oss för en framtid där vi står först i kön<br>Med det vi lär oss bäst<br>Är att ha fest<br>Ikväll blir detta ert stora test<br>Bapapapa…<br>STS…",
                footnote: "Till Bapapapa slår alla i bordet",
                id: "song19"
            },
            {
                name: "DV:s sektionssång",
                melody: "Härja-visan",
                lyrics: "Nu ska vi kompilera,<br>supa och penetrera<br>söka rekusioner ända in<br>till fixpunktssemantik.<br>Av induktion och basfall<br>blir man med lätthet asknall.<br>Hashtabeller parsas rekursivt<br>ifrån hår till häl",
                id: "song20"
            },
            {
                name: "O gamla klang- och jubeltid",
                melody: "O alte burschenherrlichkeit",
                cred: "August Lind",
                lyrics: "O gamla klang- och jubeltid<br>ditt minne skall förbliva<br>och än åt livets bistra strid,<br>ett rosigt skimmer giva.<br>Snart tystnar allt vårt yra skämt,<br>vår sång blir stum, vårt glam förstämt.<br>O, jerum, jerum, jerum.<br>O, quae mutatio rerum!<br>Var äro de som kunde allt,<br>blott ej sin ära svika,<br>som voro män av äkta halt<br>och världens herrar lika?<br>De drogo bort från vin och sång<br>till vardagslivets tråk och tvång.<br>O, jerum, jerum, jerum.<br>O, quae mutatio rerum!<br>(Filosofer)<br>Den ene vetenskap och vett in i scholares mänger,<br>(Jurister)<br>Den andre i sitt anlets svett på paragrafer vränger,<br>(Teologer)<br>en plåstrar själen, som är skral,<br>(Medicinare)<br>en lappar hop dess trasiga fodral.<br>O, jerum, jerum, jerum,<br>O, quae mutatio rerum!<br>Men hjärtat i en sann student,<br>kan ingen tid förfrysa.<br>Den glädjeeld, som där han tänt,<br>hans hela liv skall lysa.<br>Det gamla skalet brustit har<br>men kärnan finnes frisk dock kvar<br>och vad han än må mista,<br>den skall dock aldrig brista!<br>Så sluten, bröder, fast vår krets,<br>till glädjens värn och ära!<br>Trots allt vi tryggt och väl tillfreds,<br>vår vänskap trohet svära.<br>Lyft bägarn högt, och klinga vän!<br>De gamla gudar leva än<br>Bland kvarkar och leptoner!<br>Bland kvarkar och leptoner! ",
                footnote: "Vid ”kärnan” dunkas näven i bordet en gång. Det anses ohyfsat<br>att dunka vid annat tillfälle. Den sista versen sjungs stående på stolen. Efteråt<br>sätter sig ingen åter till bords, då det sägs att gör något det kommer denne<br>aldrig att ta examen.",
                id: "song21"
            },
            {
                name: "De brevitate vitæ",
                melody: "Biskop Stradas botpsalm",
                lyrics: "||: Gaudeamus igitur, iuvenes dum sumus! :||<br>Post iucundam iuventutem,<br>post molestam senectutem<br>||: nos habebit humus. :||<br>||: Ubi sunt, que ante nos in mindo fuere? :||<br>Vadite ad superos,<br>transite ad inferos!<br>||: Ubi iam? Fuere! :||<br>||: Vita nostra brevis est brevi finietur. :||<br>Venit mors velociter,<br>rapit nor atrociter,<br>||: nemini parcetur. :||<br>||: Vivat academia, vivant profesores! :||<br>Vivat membrum quodlibet<br>vivant membra quælibet,<br>||: semper sint in flore! :||<br>||: Vivant omnes virgines, faciles, formosæ! :||<br>Vivant et mulieres,<br>teneræ, amabiles,<br>||: bonæ, laboriosæ. :||<br>||: Vivat et respublica et qui illam regit! :||<br>Vivant nostra civitas,<br>Mæcenatum caritas,<br>||: quæ nos hic protegit! :||<br>||: Pereat tristitia, pereant osores! :||<br>Pereant diabolus,<br>puivis antiburschiius,<br>||: atque irrisores! :||",
                footnote: "Världens äldsta studentsång, baserad på ett latinskt manuskript<br>från 1267. Nuvarande variant allvarligt förtyskad av C. W. Kindleben 1781.",
                id: "song22"
            },
            {
                name: "Här är gudagott att vara",
                melody: "Ur Glunt N:o 25 “Examenssexa på Eklundshof”",
                cred: "Gunnar Wennerberg",
                lyrics: "Här är gudagott att vara,<br>o, vad livet dock är skönt!<br>Hör vad fröjd från fåglars skara,<br>se, vad gräset lyser grönt!<br>Humlan surrar, fjäriln prålar,<br>lärkan slår i skyn sin drill,<br>och ur nektarfyllda skålar<br>dricka oss små blommor till.",
                footnote: "Vid tidpunkten för visans tillkomst ansångs värdshuset Eklundshof vara beläget i de lugna omgivningarna utanför stan. Idag beskrivs<br>samma läge som ”bakom Polacksbacken”",
                id: "song23"
            },
            {
                name: "Fredmans sång N:o 10",
                melody: "Carl Michael Bellman",
                lyrics: "Supa klockan öfver tolf,<br>Lefva bland förryckta!<br>Jorden är mitt kammargolf,<br>Solen är min lyckta!<br>Jag bryr mig om ingenting,<br>blott at hjernen löper kring.<br>Löper kring, löper kring,<br>löper kring, löper kring,<br>Intil dess hon domnar,<br>Och jag fattig somnar.<br>I min Farfars gamla rock,<br>hål uppå armbågen,<br>står jag bland en lustig flock,<br>super bara rågen,<br>tar mig ur de vackra krus.<br>Morgon-, middags-, afton-rus.<br>Afton-rus, afton-rus,<br>afton-rus, afton-rus,<br>och så blir jag röder,<br>som de ägta bröder.<br>Blefve jag en riker man,<br>finge mynt i pungen,<br>skulle jag til Jul min sann,<br>klä mig grann som Kungen,<br>köpa mig förr’n någon tror,<br>rock och väst och nya skor.<br>Nya skor, nya skor,<br>nya skor, nya skor,<br>och så pung i håret,<br>och så ur på låret.<br>Men min strupe vil bli full,<br>tål ej denna torken;<br>guld ej annat är än mull,<br>gubbar ta ur korken;<br>låtom oss i ro och fred,<br>svälja sista klunken ned.<br>Klunken ned, klunken ned,<br>klunken ned, klunken ned,<br>och oss sedan döda,<br>i det våta röda.",
                footnote: "Rågen: Rågbrännvin. | Pung i håret: Nackhår omslutet av en<br>pung av tyg eller läder",
                id: "song24"
            },
            {
                name: "Fredmans sång N:o 21",
                cred: "Carl Michael Bellman",
                lyrics: "Så lunka vi så småningom<br>från Bacchi buller och tumult,<br>när döden ropar, granne kom,<br>ditt timglas är nu fullt.<br>Du Gubbe fäll din krycka ner,<br>och du, du yngling, lyd min lag.<br>Den skönsta Nymph som åt dig ler<br>inunder armen tag.<br>||: Tycker du at grafven är för djup,<br>nå välan så tag dig då en sup.<br>Tag dig sen dito en, dito två, dito tre.<br>Så dör du nöjdare. :||<br>Du vid din remmare och präss,<br>rödbrusig och med hatt på sned,<br>snart skrider fram din likprocess<br>i några svarta led;<br>och du som pratar där så stort,<br>med band och stjernor på din rock.<br>Ren snickarn kistan färdig gjort,<br>och hyflar på des lock<br>Tycker du …<br>Men du som til din återfärd,<br>ej klingat för din raska värd,<br>fastän han ropar: Drick!<br>Drif sådan gäst från mat och vin,<br>kör honom med sitt anhang ut,<br>och sen med en ovänlig min,<br>ryck remmarn ur hans trut.<br>Tycker du …<br>Säg är du nöjd? Min granne säg,<br>så prisa värden nu til slut;<br>om vi ha en och samma väg,<br>så följoms åt; drick ut.<br>Men först med vinet rödt och hvitt<br>för vår värdinna bugom oss,<br>och halkom sen i grafven fritt,<br>vid Aftonstjernans bloss.<br>Tycker du …",
                footnote: "Remmare: Bägare | Band och stjernor: Ordnar",
                id: "song25"
            },
            {
                name: "Bort allt vad oro gör",
                melody: "Sång nr 17 ur Bacchi tempel",
                lyrics: "Bort alt hvad oro gör,<br>bort alt hvad hjertat qväljer!<br>Bäst at man väljer<br>Bland desse Bouteiller<br>Sin mag-ligueur.<br>||: Granne! gör du just som jag gör,<br>Vet denna oljan ger humeur.<br>Hvad det var läckert!<br>Hvad var det? Renskt Bläckert?<br> Oui Monseigneur. :||<br>Bort alt hvad oro gör,<br>Alt är ju stoft och aska,<br>Lät oss bli raska,<br>Och tömma vår flaska<br>Bland Bröderna.<br>||: Granne! gör du just som jag gör,<br>Vet denna oljan ger humeur.<br>Hvad det var mägtigt!<br>Hva var det? ... Jo präktigt,<br> Mallaga - ja. :||",
                footnote: "Rhenskt Bleckert, egentligen Bleichert, kallar man ett skönt<br>blekrött vin från Koblenz och flera trakter vid Rhenströmmen.",
                id: "song26"
            },
            {
                name: "Fredmans epistel No 2        ",
                melody: "Carl Michael Bellman",
                lyrics: "Nå skrufva Fiolen,<br>Hej, spelman skynda dej!<br>Kära syster, hej!<br>Svara inte nej,<br>Svara ja så bli vi glada.<br>Sätt dej du på stolen,<br>Och stryk din Silfversträng;<br>Röda stråken släng,<br>Och med armen sväng;<br>Gör ej fiolen skada.<br>Du svettas, stor sak,<br>I Brännvin skall du bada;<br>Ty under detta tak Är Bacchi lada.<br>Sum sum sum sum,<br>sum sum sum,<br>sum sum<br>Ganska riktigt,<br>Ditt kall är viktigt<br>Båd för Öra,<br>Syn och Smak.",
                footnote: "”Så satt jag naken, full och ful. Och så kom jul.”<br>- Carl Michael Bellman",
                id: "song27"
            },
            {
                name: "Fredmans epistel No 9",
                melody: "Carl Michael Bellman",
                lyrics: "Käraste bröder, systrar och vänner,<br>Si, fader Berg, han skrufvar och spänner<br>Strängarna på fiolen,<br>Och stråken han tar i hand.<br>Ögat är borta, näsan är klufven;<br>Si hur han står och spottar på skrufven;<br>Ölkannan står på stolen;<br>Nu knäpper han lite grand,<br>Dun dun dun dun dun,<br>Grinar mot solen,<br>Dun dun dun dun dun,<br>Pinar Fiolen,<br>Hmm mm mm mmm<br>Han sig förvillar, drillar ibland.<br>Käraste bröder, dansa på tå,<br>Handskar i hand och hattarna på!<br>Si på jungfru Lona,<br>Röda band i skorna,<br>Nya strumpor, himmelsblå.",
                footnote: "”Thermopolium Boreale” är en blandning av grekiska och latin<br>och betyder ungefär ”Nordens varma drycker”",
                id: "song28"
            },
            {
                name: "Vårvindar friska",
                cred: "Julia Nyberg",
                lyrics: "Vårvindar friska, leka och viska<br>lunderna kring likt älskande par.<br>Strömmarna ila, finna ej vila förrän i havet störtvågen far.<br>||: Klappa mitt hjärta, klaga och hör.<br>Vallhornets klang bland klipporna dör.<br>Strömkarlen spelar, sorgerna delar vakan kring berg och<br>dal. :||<br>Hjärtat vill brista. Ack! När den sista,<br>gången jag hörde kärlekens röst:<br>Avskedets plåga, ögonens låga, mun emot mun vid klappande bröst.<br>||: Fjälldalen stod i blomstrande skrud, trasten slog drill<br>på drill för sin brud: Strömkarlen spelte, sorgerna delte,<br>suckande, berg och dal. :||",
                id: "song29"
            },
            {
                name: "Visa vid vindens ängar (A/N: Nån copyright-grej här med :))",
                melody: "Mats Paulson",
                lyrics: "Det går en vind över vindens ängar, det fladdrar till i en<br>tyllgardin.<br>Och jag ska skriva en sommarvisa med sol och blomdoft<br>i melodin.<br>Jag ville sjunga om Katarina, till träklangsflöjter och alcymbal men vindens toner blir sommarns sånger, jag bara<br>lyssnar i björklövssal.<br>Det går en vind över vindens ängar…<br>Det går en flicka i aspelunden, jag har ett gulnat fotografi.<br>Med åren blev hon en dröm, en saga, en ensam vandrares<br>sympati.<br>Jag ville skriva en liten visa, där ögonblick blir till evighet.<br>Men ord blir stumma och toner döva, och visans tanke blir<br>hemlighet.<br>Det går en flicka i aspelunden…<br>Det går en vind över vindens ängar…",
                id: "song30"
            },
            {
                name: "Kristallen den fina",
                melody: "Folkvisa från Skattungsby i Dalarna",
                lyrics: "Kristallen den fina<br>som solen månd’ skina<br>som stjärnorna blänka i skyn.<br>Jag känner en flicka i dygden den fina<br>en flicka i denna här byn.<br>Min vän, min vän och älskogsblomma!<br>Ack om vi kunde tillsammans komma<br>och jag vore vännen din.<br>och du allra kärestan min!<br>du ädela ros och förgyllande skrin.<br>Och om jag än fore till värdenes ände<br>så ropar mitt hjärta till dig.<br>Och om jag än fore till värdenes ände<br>så ropar mitt hjärta till dig.<br>Till dig, min vän och älskogsblomma!<br>Ack om vi kunde tillsammans komma<br>och jag vore vännen din.<br>och du allra kärestan min!<br>du ädela ros och förgyllande skrin.",
                id: "song31"
            },
            {
                name: "I dag ska Martin i jorden",
                lyrics: "I dag ska Martin i jorden<br>fram med de dukade borden<br>Ack vilken glädje<br>och ack vilken fröjd.<br>Får vi int’ peppar och kringlor<br>så får vi väl brännvin och semlor,<br>det gör detsamma<br>blott själen är nöjd.<br>||: Hej da di di dn da di da da<br>Hej da di di dn da di da da<br>Det gör detsamma<br>blott själen är nöjd. :||",
                id: "song32"
            },
            {
                name: "Nikolajev",
                melody: "Государственный гимн Российской Федерации",
                lyrics: "Jag heter Nikolajev och kommer från Sovjet.<br>Jag flyger runt jorden i min rymdraket<br>och jag ska stanna uppe i 84 varv<br>för det har Chrustjov sagt,<br>men det tycker jag är larv.<br>Jag längtar hem, hem till min planet,<br>till fru och barn där hemma i Sovjet.<br>Men mest utav allt längtar jag till ett rum<br>med ett hjärta på dörren.<br>Jag längtar hem till min planet,<br>till fru och barn där hemma i Sovjet.<br>Min kapsel innehåller många instrument,<br>ja, mycket av sådant som ännu ej är känt.<br>Men lika förbannat vad du än tror,<br>jag glömde gå på muggen innan jag for.<br>Jag längtar hem …",
                footnote: "Nikita Chrusjtjov var Sovjetunionens premiärminister 1958-1964.",
                id: "song33"
            },
            {
                name: "Du gamla, Du fria",
                cred: "Richard Dybeck",
                lyrics: "Du gamla, Du fria, Du fjällhöga Nord<br>Du tysta, Du glädjerika sköna!<br>Jag hälsar Dig, vänaste land uppå jord,<br>||: Din sol, Din himmel, Dina ängder gröna. :||<br>Du tronar på minnen från fornstora dar,<br>då ärat Ditt namn flög över jorden.<br>Jag vet att Du är och Du blir vad du var.<br>||: Ack, jag vill leva jag vill dö i Norden. :|| ",
                footnote: "Allmänt erkänd som Sveriges nationalsång, ehuru inte officiellt antagen som sådan. De två sista verserna sjungs sällan.",
                id: "song34"
            },
            {
                name: "Majsång",
                melody: "Lars Magnus Béen",
                cred: "Johan Ludvig Runeberg",
                lyrics: "Sköna maj, välkommen till vår bygd igen!<br>Sköna maj, välkommen, våra lekars vän!<br>Känslans gudaflamma<br>väcktes vid din ljusning;<br>jord och skyar stamma<br>kärlek och förtjusning;<br>sorgen flyr för våren,<br>glädje ler ur tåren,<br>morgonrodnad ur bekymrens moln",
                id: "song35"
            },
            {
                name: "Nu grönskar det (A/N copyright igen)",
                melody: "J S Bach",
                cred: "Evelyn Lindström",
                lyrics: "Nu grönskar det i dalens famn,<br>nu doftar äng och lid.<br>Kom med, kom med på vandringsfärd<br>i vårens glada tid.<br>Var dag är som en gyllne skål<br>till brädden fylld med vin.<br>Så drick, min vän, drick sol och doft<br>ty dagen den är din.<br>Långt bort från stadens gråa hus<br>vi glatt vår kosa styr,<br>och följer vägens vita band<br>mot ljusa äventyr.<br>Med öppna ögon låt oss se<br>på livets rikedom<br>som gror och sjuder överallt<br>där våren går i blom.",
                id: "song36"
            },
            {
                name: "Än en gång däran (A/N copyright)",
                melody: "Evert Taube",
                lyrics: "Än en gång däran, bröder! Än en gång däran!<br>Följom den urgamla seden!<br>Intill siste man, bröder, intill siste man,<br>trotsa vi hatet och vreden!<br>Blankare vapen sågs aldrig i en här<br>än dessa glasen, kamrater: I gevär!<br>Än en gång däran, bröder,<br>än en gång däran!<br>Svenska hjärtans djup<br>här är din sup!<br>Livet är så kort, bröder! Livet är så kort!<br>Lek det ej bort, nej, var redo!<br>Kämpa mot allt torrt, bröder, kämpa mot allt torrt!<br>Tänk på de gamle som skredo<br>fram utan tvekan i floder av champagne,<br>styrkta från början av brännvin från vårt land!<br>Kämpa mot allt torrt, bröder,<br>kämpa mot allt torrt!<br>Svenska hjärtans djup<br>här är din sup.",
                id: "song37"
            },
            {
                name: "Sjösala Vals (A/N Copyright)",
                melody: "Evert Taube",
                lyrics: "Rönnerdahl han skuttar, med ett skratt, ur sin säng.<br>Solen står på Orrberget. Sunnanvind brusar.<br>Rönnerdahl han valsar över Sjösala äng.<br>Hör min vackra visa, kom, sjung min refräng!<br>Tärnan har fått ungar och dyker i min vik,<br>ur alla gröna dungar hörs finkarnas musik,<br>och se, så många blommor<br>som redan slagit ut på ängen.<br>Gullviva, mandelblom, kattfot och blå viol.<br>Rönnerdahl han virvlar sina lurviga ben,<br>under vita skjortan som viftar kring vaderna.<br>Lycklig som en lärka uti majsolens sken,<br>sjunger han för ekorr’n, som gungar på en gren!<br>Kurre, kurre, kurre! Nu dansar Rönnerdahl!<br>Kokó! Och göken ropar uti hans gröna dal<br>och se, så många blommor<br>som redan slagit ut på ängen.<br>Gullviva, mandelblom, kattfot och blå viol.<br>Rönnerdahl han binder utav blommor en krans,<br>binder den kring håret, det gråa och rufsiga,<br>valsar in i stugan och har lutan till hands,<br>väcker frun och barnen med drill och kadans.<br>Titta, ropar ungarna, Pappa är en brud<br>med blomsterkrans i håret och nattskjorta till skrud!<br>Och se, så många blommor<br>som redan slagit ut på ängen.<br>Gullviva, mandelblom, kattfot och blå viol.<br>Rönnerdahl är gammal, men han valsar ändå!<br>Rönnerdahl har sorger och ont om sekiner.<br>Sällan får han rasta, han får slita för två.<br>Hur han klarar skivan kan ingen förstå,<br>ingen, utom tärnan i viken, hon som dök<br>och ekorren och finken och vårens första gök<br>och blommorna, de blommor<br>som redan slagit ut på ängen.<br>Gullviva, mandelblom, kattfot och blå viol.",
                id: "song38"
            },
            {
                name: "Längtan till landet",
                melody: "Otto Lindblad",
                cred: "Herman Sätherberg",
                lyrics: "Vintern rasat ut bland våra fjällar<br>drivans blommor smälta ned och dö.<br>Himlen ler i vårens ljusa kvällar,<br>solen kysser liv i skog och sjö.<br>Snart är sommarn här! I purpurvågor,<br>guldbelagda azurskiftande,<br>ligga ängarne i dagens lågor,<br>och i lunden dansa källorne.<br>Ja, jag kommer! Hälsen glada vindar<br>ut till landet, ut till fåglarne,<br>att jag älskar dem, till björk och lindar,<br>sjö och berg, jag vill dem återse,<br>se dem än, som i min barndoms stunder,<br>följa bäckens dans till klarnad sjö,<br>trastens sång i furuskogens lunder,<br>vattenfågelns lek kring fjärd och ö.",
                footnote: "Det ”land” Herman längtade till när texten skrevs var Nolinge säteri i Grödinge socken",
                id: "song39"
            },
            {
                name: "Änglamark (A/N Cpoyrtihht)",
                melody: "Evert Taube",
                lyrics: "Kalla den Änglamarken eller<br>Himlajorden om du vill,<br>jorden vi ärvde och lunden den gröna.<br>Vildrosor och blåsippor och<br>lindblommor och kamomill,<br>låt dem få leva, de är ju så sköna!<br>Låt barnen dansa som änglar kring lönn och alm,<br>leka tittut mellan blommande grenar.<br>Låt fåglar leva och sjunga för oss sin psalm,<br>låt fiskar simma kring bryggor och stenar.<br>Sluta att utrota skogens alla djur!<br>Låt örnen flyga, låt rådjuren löpa!<br>Låt sista älven som brusar i vår natur<br>brusa alltjämt mellan fjällar och gran och fur!<br>Kalla den Änglamarken eller<br>Himlajorden om du vill,<br>jorden vi ärvde och lunden den gröna.<br>Vildrosor och blåsippor och<br>lindblommor och kamomill,<br>låt dem få leva, de är ju så sköna!",
                id: "song40"
            },
            {
                name: "Studentsången",
                melody: "Prins Gustaf",
                cred: "Herman Sätherberg",
                lyrics: "Sjungom studentens lyckliga dag,<br>låtom oss fröjdas i ungdomens vår!<br>Än klappar hjärtat med friska slag,<br>och den ljusnande framtid är vår.<br>Inga stormar än, i våra sinnen bo,<br>hoppet är vår vän, och vi dess löften tro,<br>när vi knyta förbund i den lund,<br>där de härliga lagrarna gro!<br>Där de härliga lagrarna gro!<br>Hurra!<br>Svea vår moder hugstor och skön,<br>manar till bragd som i fornstora da’r,<br>vinkar med segerns och ärans lön,<br>men den skörd utan strid man ej tar.<br>Aldrig slockne då, känslans rena brand,<br>Aldrig brista må, vår trohets helga band,<br>så i gyllene frid som i strid.<br>Liv och blod för vårt fädernesland!<br>Liv och blod för vårt fädernesland!<br>Hurra",
                footnote: "Hette från början endast ”Marsch”. Prins Gustaf var en engagerad uppsalastudent som skrev sången till en hyllning åt Uppsalas studenter.",
                id: "song41"
            },
            {
                name: "Helan går",
                lyrics: "Helan går,<br>sjung hoppfaderallanlallanlej.<br>Helan går,<br>sjung hoppfaderallanlej.<br>Och den som inte Helan tar<br>den heller inte Halvan får.<br>Helan går!<br>Sjung hoppfaderallanlej!",
                id: "song42"
            },
            {
                name: "Hell and gore",
                melody: "Helan går",
                lyrics: "Hell and gore, chung hop father Allan, lallan ley.<br>Hell and gore, chung hop father Allan ley.<br>Oh, handsome in the hell and tar<br>and hell are in the half and four.<br>Hell and gore!<br>Chung hop father Allan ley",
                id: "song43"
            },
            {
                name: "Imbelupet",
                melody: "Kors på Idas grav",
                lyrics: "Imbelupet glaser står på bräcklig fot,<br>kalla pilsnerflaskor luta sig däremot!<br>Men där nere, miserere<br>uti magens dunkla djup<br>sitter djävulen och väntar på en sup.<br>...uti magens dunkla valv<br>vandrar djävulen och ropar på en halv.<br>...uti magen härs och tvärs<br>kilar djävulen och skriker på en ters.<br>...uti magens djup så svart<br>löper djävulen och skränar på en kvart.<br>...uti magens labyrint<br>irrar djävulen i väntan på en kvint.<br>...uti magens slingerväxt<br>springer djävulen och skriar på en sext.<br>...uti magen halvuppknäppt<br>rusar själve fan och vrålar på en sept.<br>...sitter allas våran far<br>det är fan och vill ha det som är kvar!",
                id: "song44"
            },
            {
                name: "Ångbåten",
                melody: "Jazzgossen",
                lyrics: "Och så kommer det en ångbåt,<br>som säger: Tuuuuuut!<br>Och så kommer det en ubåt,<br>som säger: gurgelliblurgelligurg",
                footnote: "Vid gurgelli...<br>1. Svep<br>2. Gurgla<br>3. Svälj",
                id: "song45"
            },
            {
                name: "Halvan",
                melody: "Hur länge skall i norden",
                lyrics: "||: Hur länge skall på borden,<br>den lilla Halvan stå.<br>Skall snart ej höras orden;<br>nu Halvan går låt gå. :||<br>||: Det ärvda vikingsinne till supen trår igen<br>och Helans trogna minne i Halvan går igen. :||",
                id: "song46"
            },
            {
                name: "Helangorakatten",
                melody: "Vi går över daggstänkta berg",
                lyrics: "Det var en gång en helangorakatt, fallera.<br>Som älskade en vanlig gårakatt, fallera.<br>Och följden blev en jamare, fast den var mycket tamare,<br>för den var blott en halvan-går-akatt, fallera!",
                id: "song47"
            },
            {
                name: "Det naturliga urvalet",
                melody: "Skånska slott och herresäten",
                lyrics: "När Darwin studerade liv å naturen<br>Så fann han att först dör de svagaste djuren<br>De sämsta bland hjärnceller dör också först<br>Så öka din IQ och minska din törst.<br>När Einstein studerade massan och ljuset<br>Så ljusnade plötsligt problemet med ruset<br>Ett glas med en hel massa renat uti<br>Förvandlas i kroppen till ren energi",
                id: "song48"
            },
            {
                name: "Ha’nt vi nå brännvin",
                melody: "Horgalåten",
                lyrics: "Ha’nt vi nå brännvin ä de sorglitt<br>dä ä de sorglitt, ja då vill en bare dö.<br>För ha’nt vi nå brännvin ä de sorglitt<br>då vill en lägg se´ ner och tvärdö!<br>Men ha vi brännvin, ja ha vi brännvin<br>då kan en danse natten lång.<br>Ja ha vi brännvin, ja ha vi brännvin,<br>då kan en danse natten lång!<br>Ha´nt vi nå brännvin ä de sorglitt<br>dä ä de sorglitt, ja då vill en bare dö.<br>För ha´nt vi nå brännvin ä de sorglitt<br>då vill en lägg se´ner och tvärdö!",
                id: "song49"
            },
            {
                name: "Mein Schnaps",
                melody: "Karneval i Venedig",
                lyrics: "Mein Schnaps den är ein Trea,<br>ein Trea är mein Schnaps.*<br>Och är det ej ein Trea,<br>beschteller jag noch ein’.<br>En andra Schnaps jag dricker,*<br>ein Trea äfven den.<br>Och sen en tredje Trea,<br>så trefligt trilla ner.*<br>Ein trillad Schnaps jag vilja,<br>min Vilja sinnat trill<br>Och frallar den ein fjärde,*<br>så trillar Tratten trött.",
                id: "song50"
            },
            {
                name: "Planksaft",
                melody: "Längtan till landet",
                lyrics: "Fordom odlade man vindruvsranka<br>av vars saft man gjorde ädelt vin.<br>Nu man pressar saften ur en planka<br>doftande av äkta terpentin.<br>Töm nu bägaren o broder, syster,<br>låt den svenska skogen rinna kall<br>ner i strupen och om du är dyster<br>låt oss supa upp en liten tall.",
                id: "song51"
            },
            {
                name: "Plancksaft",
                melody: ":Rövarvisan från Ronja Rövardotter ",
                cred: "Johannes Zeltner Wolff",
                lyrics: "Först var det ljus<br>och en kvark och en lepton.<br>Miljarders celsius.<br>Här måhända det blev inflation.<br>Näst kom atomerna,<br>gasmoln, galaxer och stjärnor.<br>Sen kom liv,<br>djuren och så vi,<br>druvor och vin.<br>Tager oss ett glas, gutår!<br>I Bacchi hus<br>det smäller högt och stort.<br>Genom druvans rus<br>kan eonerna passera fort.<br>Gör du vin från grunden<br>ska du först uppfinna universum.<br>Fat av ek<br>får och gammal grek.<br>Drick, var inte vek.<br>Tag dig nu ett glas, gutår!",
                id: "song52"
            },
            {
                name: "Mera brännvin",
                melody: "Internationalen (REFRÄNGEN!!!! /~)",
                cred: "Hans Dalborg",
                lyrics: "Mera brännvin i glasen,<br>mera glas på vårt bord,<br>mera bord på kalasen,<br>mer kalas på vår jord.<br>Mera jordar med måne,<br>mera månar i mars,<br>mera marscher till Skåne,<br>mera Skåne, Gud bevars",
                id: "song53"
            },
            {
                name: "Djurisk snapsvisa",
                melody: "If you’re happy and you know it clap your hands",
                lyrics: "Tigern slukar snabbt buteljen med ett vrål.<br>Hamstern sparar sina flaskor, han är snål.<br>Björnen nallar sprit om natten<br>och en jamare tar katten,<br>men vi apor tömmer snapsen i en skål!",
                id: "song54"
            },
            {
                name: "Dansk snapsvisa",
                lyrics: "Ikke nu! Men NU!",
                id: "song55"
            },
            {
                name: "Finsk snapsvisa",
                lyrics: "NU!",
                footnote: "Jos terva, viina tai sauna ei auta niin kuolema on lähella.<br>Denna sång inleds med 17 sekunders tystnad.",
                id: "song56"
            },
            {
                name: "Livet är härligt",
                melody: "Röda kavalleriet (Polyushko-Pole)",
                lyrics: "Sjung tyst<br>Livet är härligt,<br>tavaritj, vårt liv är härligt.<br>Vi alla våra små bekymmer glömmer,<br>när vi har fått en tår på tanden, skål!<br>Tag dig en vodka,<br>tavaritj, en liten vodka.<br>Glasen i botten vi tillsammans tömmer,<br>det kommer mera efter ha-a-and.<br>Sjung högt:<br>Livet är härligt!<br>Tavaritj, vårt liv är härligt!<br>Vi alla våra små bekymmer glömmer!<br>När vi har fått en tår på tanden, skål!<br>Tag dig en vodka!<br>Tavaritj, en liten vodka!<br>Glasen i botten vi tillsammans tömmer!<br>Det kommer mera efter hand, en skål!",
                id: "song57"
            },
            {
                name: "Tänk om jag inte var så tråkig",
                melody: "Hej tomtegubbar",
                cred: "Anders Byström",
                lyrics: "Tänk om jag inte var så tråkig,<br>tänk om jag vore rolig.<br>Tänk om jag inte var så blyger,<br>tänk om sommarn var solig.<br>Tänk om jag vore mer spontan,<br>och dansa samba mest hela dan!<br>Inbunden, tyst och sammanbiten:<br>Tack potatis för spriten!",
                id: "song58"
            },
            {
                name: "Vi går över ån",
                melody: "Vi går över daggstänkta berg",
                lyrics: "Vi gå över ån efter sprit, fallera,<br>men efter vatten gå vi ej en bit, fallera.<br>Ja, sup kära bröder<br>fast näsan är röder,<br>för tids nog blir ack va vit, fallera!",
                id: "song59"
            },
            {
                name: "Vi äro små humlor",
                melody: "Här kommer Karl-Alfred Boy",
                lyrics: "Vi äro små humlor vi, bzzz,bzzz.<br> Vi äro små humlor vi, bzzz,bzzz.<br> Vi äro små humlor som tar oss en geting.<br> Vi äro små humlor vi, bzzz,bzzz.",
                id: "song60"
            },
            {
                name: "Domkyrkan",
                melody: "Karl-Alfred Boy",
                lyrics: "Domkyrkan stilla står.<br>Har gjort så i många år.<br>Så synes den gunga,<br>när vi slutat sjunga,<br>beror det å nubben vår,<br>gutår!",
                id: "song61"
            },
            {
                name: "Hålet",
                melody: "Uti vår hage",
                lyrics: "Uti vår mage, där växer ett hål<br>Ett alkohol<br>Ingen jag ser som åt mig ropar: “Skål!”<br>Men mitt i de tankar tunga<br>Så börjar visst alla sjunga<br>Jag griper då glaset<br>Och spriten tål!",
                id: "song62"
            },
            {
                name: "Snapsen var kall och klar",
                melody: "Sankta Lucia",
                lyrics: "Snapsen var klar och kall.<br>Jag drack rätt många.<br>Strax blev jag full och knall,<br>Ågren mig fånga.<br>NU ligger jag på dass,<br>känner mig ganska kass.<br>Ja, jag är nog dagen efter,<br>ja, dagen efter.<br>Aldrig, nej, aldrig mer<br>rör jag ett nubbeglas.<br>Mjölk, juice och äppelmer<br>skall jag ha på kalas.<br>Men om man tänker rätt<br>går det ju över lätt.<br>Snart så tar jag en ny pärla,<br>en liten pärla.<br>",
                id: "song63"
            },
            {
                name: "Solen",
                melody: "Camptown ladies",
                lyrics: "Solen den går upp och ner,<br>doo da, doo da.<br>Jag ska aldrig supa mer,<br>hej doo da dej.<br>Hej doo da dej,<br>hej doo da dej.<br>Jag ska aldrig supa mer,<br>hej doo da dej.<br>Men detta var ju inte sant,<br>doo da, doo da.<br>I morgon gör jag likadant,<br>hej doo da dej.<br>Hej doo da dej,<br>hej doo da dej.<br>I morgon gör jag likadant, hej doo da dej.",
                id: "song64"
            },
            {
                name: "Korta solen",
                melody: "Solen, ungefär",
                lyrics: "Solen den går upp och ner,<br>doo da, doo da.<br>I morgon gör jag likadant!",
                id: "song65"
            },
            {
                name: "Riktigt korta solen",
                melody: "Korta solen, ungefär",
                lyrics: "Solen den gör likadant!",
                id: "song66"
            },
            {
                name: "Pensionärsvisa",
                melody: "Med en enkel tulipan",
                lyrics: "Jag är en dyster pensionär,<br>som sitter hemma och svär,<br>för jag har glömt bort,<br>för jag har glömt bort,<br>var jag lagt spriten!<br>Jag dåligt mår, har yrsel svår,<br>om inte snapsen jag får,<br>så var så snälla, ja, var så snälla<br>och langa hit den.",
                id: "song67"
            },
            {
                name: "Levern",
                melody: "I Apladalen",
                lyrics: "När jag var liten i skolmatsalen<br>All denna lever gjorde mig galen<br>Nu tar jag hämnd på detta organ<br>Min egen lever ska se på fan",
                id: "song68"
            },
            {
                name: "Alla Tallarna",
                melody: "Valfri",
                lyrics: "Alla tallarna, alla tallarna,<br>alla stora , alla små.<br>Alla tallarna, alla tallarna<br>ska vi koka ’rännvin på.<br>Alla tallarna, alla tallarna,<br>ifrån roten till dess topp.<br>Alla tallarna, alla tallarna,<br>ska vi ta och ’ricka opp.<br>SKÅL!",
                id: "song69"
            },
            {
                name: "Snålskål",
                melody: "Jag fångade en räv",
                lyrics: "Jag la mig på min franska bil<br>med magen ner mot huven,<br>till spolarvätskans sprutmunstycke<br>lossade jag skruven.<br>Strålen var kall och klar, men smaken något rå.<br>Trots allt ett billigt sätt, bli full på svart Renault.",
                id: "song70"
            },
            {
                name: "Hyfsvisa",
                melody: "Helan går",
                lyrics: "Vad i allsin dar,<br>har du brännvin kvar?<br>Är du sparsam eller snål?<br>Skål!",
                id: "song71"
            },
            {
                name: "Punschen kommer",
                melody: "Lippen schweigen",
                cred: "Lillie Värjare",
                lyrics: "Punschen kommer, punschen kommer<br>ljuv och sval<br>Glasen imma, röster stimma i vår sal<br>skål för glada minnen, skål för varje vår<br>inga sorger finnas mer när punsch vi får.",
                footnote: "Sjungs ofta tre gånger i följd, med olika rörelsemönster under respektive vers.",
                id: "song72"
            },
            {
                name: "Varför är där ingen is till punschen?(A/N ©)",
                melody: "Förkortad version",
                cred: "Povel Ramel",
                lyrics: "Varför är där ingen is till punschen?<br>Varför är där ingen is till punschen?<br>Varför är där ingen is till punschen?<br>Detta hände sig på den goda tiden,<br>den gamla goda tiden<br>då landet var en enda lycklig<br>- Skål Moder Svea! -<br>idyll.",
                id: "song73"
            },
            {
                name: "Varför är där ingen is till punschen?(A/N ©)",
                melody: "Förkortad version (Förkortad version, ungefär)",
                cred: "Povel Ramel",
                lyrics: "Varför är där ingen is till punschen?<br>Varför är där ingen is till punschen?<br>Varför är där ingen is till punschen?",
                id: "song74"
            },
            {
                name: "Varför är där ingen is till punschen?(A/N ©)",
                melody: "Förkortad version (Förkortad version, ungefär)",
                cred: "Povel Ramel",
                lyrics: "Varför är där ingen is till punschen?",
                id: "song75"
            },
            {
                name: "Varför är där ingen is till punschen?(A/N ©)",
                melody: "Förkortad version (Förkortad version, ungefär)",
                cred: "Povel Ramel",
                lyrics: "Punschen?",
                id: "song76"
            },
            {
                name: "Baileysvisan",
                melody: "Flickan i Havanna",
                lyrics: "Jag vill ej ha punsch till gasque,<br>den är gul och smakar blask,<br>hellre något med choklad,<br>så kan jag bli glad.<br>När jag dricker på kalas,<br>vill jag ej ha lowballglas,<br>whiskey luktar bara rök,<br>smakar gammalt ök.<br>Konjak anses vara fin,<br>men är bara gammalt vin,<br>hellre då en mjölkprodukt,<br>med dess fräscha lukt.<br>Baileys är en gudadryck,<br>sjunger vi med eftertryck,<br>mjölkchoklad med sprit är bäst,<br>avrundar vår fest.",
                id: "song77"
            },
            {
                name: "Djungelpunsch",
                melody: "Var nöjd mer allt som livet ger",
                lyrics: "Jag gillar alla tiders punsch,<br>punsch till frukost, punsch till lunch,<br>punsch till förrätt, varmrätt och dessert.<br>Jag gillar punsch för vet du va’,<br>rent kaffe gör ju ingen gla’.<br>Så punsch i fulla muggar vill jag ha!<br>Med konjak du lockar,<br>den bästa Renault.<br>Förlåt om jag chockar,<br>och tar punsch ändå.<br>Och bjuder du på fin likör,<br>får du ursäkta om det stör,<br>men jag väljer hellre en Grönstedts Blå,<br>en Cederlunds eller Flaggpunsch å,<br>kanske du har ren Platin?<br>Jag gillar punsch,<br>så ge mig punsch<br>och jag är din.<br>För evigt din!",
                id: "song78"
            },
            {
                name: "Gudars konjaksvisa (A/N ©)",
                melody: "Längtan till landet",
                cred: "Gunnar Sandberg",
                lyrics: "Punschen kommer,<br>ljuv och sval den sitter I var strupe,<br>här på vårt kalas<br>Undra på att jag är lite bitter<br>Där jag sitter vid mitt tomma glas!<br>”Fån’t jag kônjak hupper ja ute älva!”<br>Har dom aldrig ens hört talas om den<br>”Kômmer” den ej snart, så var det då själva<br>Den!<br>Och se’n, ”ja hupper i” igen!",
                id: "song79"
            },
            {
                name: "Punschens lov",
                melody: "Rövarvisan",
                lyrics: "Punschen är och punschen var och punschen skall<br>förbliva,<br>en lidelse vi alla har som ingen kan fördriva.<br>Ja, punschen tinar upp så väl<br>och svalkar både kropp och själ.<br>Den botar begären och lindrar besvären.<br>Ja, punschen den gör både gott och väl!",
                id: "song80"
            },
            {
                name: "Tucks punschvisa",
                melody: "Jag fångade en räv",
                lyrics: "Jag hällde upp en punsch en dag,<br>den punschen den var frusen.<br>Men jag blev varm i buk och tarm<br>och knoppen blev på snusen.<br>Åh, vad man kan bli glad<br>av punschen ljuv och sval!<br>Så nu vill jag ha en till och lyckan blir total.",
                id: "song81"
            },
            {
                name: "Vädjan till punschen",
                melody: " Sov du lilla videung",
                lyrics: "Kom nu lilla punschen min,<br>följ nu efter supen.<br>Snart skall du åka in<br>ner igenom strupen.<br>Till mitt stora magpalats,<br>där det finns så mycket plats.<br>Kom nu lilla punschen,<br>följ nu efter supen",
                id: "song82"
            },
            {
                name: "Min pilsner",
                melody: "My Bonnie Lies over the Ocean",
                lyrics: "Min pilsner skall svalka min tunga.<br>Min pilsner skall duscha min gom.<br>Min pilsner skall få mig att sjunga,<br>om ser jag att flaskan är tom:<br>Pilsner, pilsner,<br>hämta en pilsner till mig, till mig.<br>Pilsner, pilsner,<br>hämta en pilsner till mig",
                id: "song83"
            },
            {
                name: "Öluppdrickarvisa-visan",
                melody: "Huvud, axlar, knä och tå",
                cred: "M. Berg, KTH",
                lyrics: "||: Ölens färg är ljus och klar<br>Ljus och klar<br>Snart jag den uppdruckit har<br>Inget kvar<br>Ölets märke spelar ingen roll<br>Magen håller ändå ingen koll<br>Jawhol :||",
                id: "song84"
            },
            {
                name: "Ett glas öl(A/N copyright)",
                melody: "Kennedy Russell",
                cred: "Hans Alfredson & Tage Danielsson",
                lyrics: "När man ser på hur barna, växer opp och står i,<br>kan man undra om barna nånsin får det som vi?<br>Om det finns jobb om det finns mat,<br>om det är drägligt där dom bor,<br>finns det får och kor och vatten och luft?<br>Kan dom sola sig gratis, finns det blommor och blad?<br>Har dom fläsk och potatis, kan dom ta sig ett bad?<br>Framtiden verkar dyster när man grubblar över ett glas öl,<br>men man hoppas att barna ändå får ett glas öl.<br>Ha det bra i värmen på Sara-krog,<br>rosenrött och himmelsblåttska det va.<br>Vårt liv är inte bara knog.<br>Öl är till exempel gott.<br>När man ser på hur barna växer opp och står i,<br>kan man undra om barna nånsin får det som vi?<br>Om det finns jobb om det finns mat,<br>om det är drägligt där dom bor,<br>finns det får och kor och vatten och luft?<br>Får dom döttrar och söner, har dom dragspel och vals?<br>Har dom kvar bruna bönor, har dom någonting alls?<br>Framtiden verkar dyster när man grubblar över ett glas öl<br>men man hoppas att barna ändå får ett glas öl.",
                id: "song85"
            },
            {
                name: "Ölkanon",
                melody: "Row your boat",
                cred: "M-sektionen Lund",
                lyrics: "Drick, drick, drick din öl<br>Låt den rinna ner<br>kan du sen kraxa<br>“en laxask med slasktratt”<br>så får du dricka fler",
                id: "song86"
            },
            {
                name: "Var nöjd med ölen",
                melody: "Var nöjd med allt vad livet ger",
                cred: "M-sektionen Lund",
                lyrics: "Var nöjd med allt som ölen ger<br>och även om du dubbelt ser<br>glöm bort bekymmer, sorger och besvär.<br>Var glad och nöjd för vet du vad<br>en folköl gör ju ingen glad<br>var nöjd med ölen som vi dricker här.",
                id: "song87"
            },
            {
                name: "Om en söt dryck",
                melody: "Jag fångade en räv",
                cred: "M-sektionen Lund",
                lyrics: "Jag dricker gärna öl och vin<br>till sillen tar jag nubben<br>och kanske till och med en shot<br>när jag går till klubben<br>Men drycken som jag helst vill ha<br>den har så friska lukter<br>den är dessutom ren och klar<br>och smakar utav frukter<br>Hå, hum, man är ej dum<br>för att man dricker cider<br>Även om det finnes dom<br>som utav smaken lider<br>Det skummar upp i glaset när<br>man har hällt upp en cider<br>det smakar både sött och gott<br>när den i halsen glider<br>Den kan va både söt och torr<br>av tranbär eller fläder<br>av plommon finns det någon sort<br>som smakar gamla kläder<br>Hå hum, man är ej dum...",
                id: "song88"
            },
            {
                name: "Röd vitamin",
                melody: "My Bonnie",
                lyrics: "Hur badar man bäst på en kurort ?<br>Jo, om man har fyllt en bassäng,<br>med vätskan som snart skall besjungas,<br>när vi kommit fram till refräng:<br>Rödvin, rödvin<br>Rödvin är fin hälsokost, kost, kost<br>Rödvin, rödvin<br>Rödvin är vår bästa flaskpost.<br>Man får vitaminer av rödvin.<br>Man piggnar ju till med en gång.<br>När glasen har tömts uti botten,<br>så stämmer vi upp i en sång.<br>Rödvin, rödvin.....",
                id: "song89"
            },
            {
                name: "Sudda sudda",
                melody: "Sudda, sudda",
                lyrics: "Sudda sudda sudda bort din sura min<br>Med fyra jättestora bamseklunkar ädelt vin.<br>Munnen den skall sjunga och va gla.<br>För att den skall bli som den ska va,<br>Vad häller du då bak det dolda flinet?<br>Vinet, som suddar suddar bort din sura min.",
                id: "song90"
            },
            {
                name: "Melodi: De sju dvärgarnas gruvmarsch",
                melody: "Fredrik Brounéus",
                lyrics: "Hej hå, hej hå,<br>från druva till Bordeaux.<br>För att släcka törst,<br>bör den trampas först<br>till saft<br>som smakar gamla tår<br>och står<br>och drar i flera år,<br>i ett fat av ek<br>hos en gammal grek,<br>med får,<br>men strunt i det gutår!",
                id: "song91"
            },
            {
                name: "Vinets lov",
                melody: "Fjäriln vingad",
                lyrics: "När det strålar uti salen,<br>utav glädje glans och färg.<br>När det gnistrar uti pokalen,<br>utav ädla druvors märg.<br>Kära vänner varför dröja,<br>med att dricka glädjen till.<br>Låt oss bortom framtids slöja,<br>se allt skönt vi skåda vill.<br>Drick för allt vad livet skänker,<br>glädjestunder, ljus och sol.<br>Drick för stjärnorna som blänker,<br>över oss från pol till pol.<br>Drick för våren, väl du kan det,<br>drick för värmen våren ger.<br>Drick för starka vänskapsbanden,<br>drick för allt vad skönt du ser.",
                id: "song92"
            },
            {
                name: "Botten upp",
                melody: "Å jänta och jag",
                lyrics: "Det klingade till, i glaset intill<br>och Bacchus vår vän har ordet.<br>Han åter nu vill att vi tar en drill,<br>ty vinet det står på bordet.<br>Med tanken vi glädjen gör till beslut,<br>ty supa det kan vi alla förlut,<br>och därför skall botten upp absolut,<br>sa Bacchus och tack för ordet!",
                id: "song93"
            },
            {
                name: "Plancksaft",
                melody: "Rövarvisan från Ronja Rövardotter",
                cred: "Johannes Zeltner Wolff",
                lyrics: "Först var det ljus<br>och en kvark och en lepton.<br>Miljarders celsius.<br>Här måhända det blev inflation.<br>Näst kom atomerna,<br>gasmoln, galaxer och stjärnor.<br>Sen kom liv,<br>djuren och så vi,<br>druvor och vin.<br>Tager oss ett glas, gutår!<br>I Bacchi hus<br>det smäller högt och stort.<br>Genom druvans rus<br>kan eonerna passera fort.<br>Gör du vin från grunden<br>ska du först uppfinna universum.<br>Fat av ek<br>får och gammal grek.<br>Drick, var inte vek.<br>Tag dig nu ett glas, gutår!",
                id: "song94"
            },
            {
                name: "Bordeaux, Bordeaux",
                melody: " I sommarens soliga dagar",
                lyrics: "Jag minns än idag hur min fader<br>kom hem ifrån staden så glader<br>och rada upp flaskor i rader,<br>och sade nöjd som så:<br>Bordeaux, Bordeaux!<br>Han drack ett glas, kom i extas<br>och sedan blev det stort kalas.<br>Och vi små glin, ja vi drack vin<br>som första klassens fyllesvin.<br>Vi dansade runt där på bordet och skrek så vi blev blå:<br>Bordeaux, Bordeaux!",
                id: "song95"
            },
            {
                name: "Denna thaft",
                melody: "Helan går",
                lyrics: "Denna thaft är den bästa thaft thythemet haft.<br>Denna thaft är den bästa thaft dom haft.<br>Och den thom inte har nån kraft,<br>den dricka thkall av denna thaft.<br>Denna thaft,<br>till landth, till sjöth till hafth!",
                footnote: "För den rätta schvungen på uttalet bör du placera tungan i munnen likt en blöt strumpa.",
                id: "song96"
            },
            {
                name: "Fransk vinvisa",
                melody: "Marsche Militaire av Franz Schubert",
                cred: "Helène Derand",
                lyrics: "Feta fransyskor som svettas om fötterna<br>de trampar druvor som sedan ska jäsas till vin.<br>Transpirationen viktig é<br>ty den ge fin bouquet.<br>Vårtor och svampar följer mé<br>men vad gör väl de´?<br>För, vi vill ha vin, vill ha vin,<br>vill ha mera vin<br>även om följderna<br>blir att vi må lida pin.<br>Flaskan och glaset gått i sin.<br>Hit med vin! Mera vin!<br>Tror ni att vi är fyllesvin?<br>JA! (Fast större.)",
                footnote: "K-sektionen LTH, Sångarstriden 1985.",
                id: "song97"
            },
            {
                name: "Månen",
                melody: "Mors lilla Olle",
                lyrics: "En gång i månan är månen full,<br>men aldrig jag sett honom trilla omkull.<br>Full av beundran för allt vad han tål,<br>höjer jag bägarn och bringar Gutår!",
                footnote: "Hur månen bildades är fortfarande osäkert, men den ledande<br>teorin är att den bildades som restprodukt vid en enorm kollision mellan jorden och en planet av ungefär Mars storlek (Theia) under solsystemets tidigaste historia.",
                id: "song98"
            },
            {
                name: "Groggen",
                melody: "Claes Eriksson",
                lyrics: "Person 1: Om jag hade varit ett glas av kristall<br>Person 2: och jag hade varit en isbit så kall.<br>Person 3: Om jag hade varit en flaska med grape<br>Person 4: och jag lite gin, ganska fin, inget skräp.<br>Tillsammans: Då hade vi tillsammans varit en grogg. ",
                footnote: "Grape utalas ”gräp”.",
                id: "song99"
            },
            {
                name: "Groggens mening",
                melody: "Blinka lilla stjärna",
                lyrics: "Ända sen antikens dar,<br>filosofer tvistat har,<br>om vad groggens väsen är,<br>man har enats om det här:<br>Tonic är, på något vis,<br>Grogg, fast utan gin och is.",
                id: "song100"
            },
            {
                name: "Système International d’Unités (A/N: Jag pallade inte lista ut hur man skriver upphöjt till. Måste fixas dock)",
                melody: "Studentsången",
                lyrics: "W kg m Wb s<br>Ωm T A rad<br>Cd S N s<br>ΩA m lx dB<br>°C W/m²<br>J/kg H V C<br>kg/m³ mol<br>m/s²<br>m/s²<br>F!",
                id: "song101"
            },
            {
                name: "Mobiltelefonen",
                melody: "Min hatt den har tre kanter",
                lyrics: "Min Nokia har en kamera,<br>en dator och kompass.<br>Men den har ingen korkskruv.<br>Det tycker jag är kass’!",
                id: "song102"
            },
            {
                name: "Man cyklar för lite (A/N: copyright)",
                melody: "Trad.",
                cred: "Povel Ramel",
                lyrics: "Man cyklar för lite.<br>Man röker för mycket.<br>Och man är fasen så liberal,<br>när det det gäller maten och spriten.<br>Jag borde slutat för länge sedan,<br>men denna sup är för liten.<br>Vad tjänar att hyckla.<br>Tids nog får man cykla.",
                id: "song103"
            },
            {
                name: "I ett hus",
                lyrics: "I ett hus vid skogens slut,<br>liten tomte tittar ut.<br>Haren skuttar fram så fort,<br>klappar på dess port.<br>Hjälp ack, hjälp ack, hjälp du mig,<br>annars skjuter jägarn mig.<br>Kom, ja kom i stugan in,<br>räck mig handen din!",
                footnote: "Melodin kan bytas ut mot ”Flickan i Havanna”",
                id: "song104"
            },
            {
                name: "Sjung om fru Svenssons lyckliga karl (A/N copyright)",
                melody: "Studentsången",
                cred: "Povel Ramel",
                lyrics: "Sjung om fru Svenssons lyckliga karl,<br>låt honom plöja i ungdomens fåror!<br>Fem gamla hjärtan i sprit har jag,<br>å’ en ljus elefant i ett snår.<br>Inga stoppar den, i vårat linneskåp.<br>Loppor tär vår vän, som idisslar en sko,<br>när vi snyta en rund liten hund.<br>Där den här lilla bagaren bor!<br>Där den här lilla bagaren bor!<br>Hursa?",
                id: "song105"
            },
            {
                name: "Vi skålar för våra vänner",
                melody: "Flickan går i ringen",
                lyrics: "Vi skålar för våra vänner,<br>och dom som vi känner,<br>och dom som vi inte känner,<br>dom skiter vi i!<br>||: Hå-Hå, ja-ja, dom skiter vi i! :||",
                id: "song106"
            },
            {
                name: "Punkatröst",
                melody: "Bjällerklang",
                lyrics: "Bjällerklang, bjällerklang cykla bak och fram<br>ett, två, tre så sa det pang!<br>Jäkla cykelslang!<br>Skål!",
                id: "song107"
            },
            {
                name: "Tacksamma visan",
                melody: "Halta lottas krog",
                lyrics: "Skål för den som lyssnar fast du inte pratar rent.<br>Skål för den som stöttar när det blivit väldigt sent.<br>Skål för den som gör att det blir mera kvar till oss<br>och då menar jag förstås:<br>Skål för alla nykterister,<br>som överser med våra brister.<br>Särskilt de som är bilister<br>och kör oss hem igen,<br>i gryningen.",
                id: "song108"
            },
            {
                name: "Nykterhetsprovet",
                melody: "Hej tomtegubbar",
                lyrics: "Toj hemtegubbar gla i såsen<br>och kvasivastiga lura.<br>Toj hemtegubbar gla i såsen<br>och kvasivastiga lura.<br>En hiden lit vi heva lär<br>med möcket myda och svärt bestor.<br>Toj hemtegubbar gla i såsen<br>och lott så vastiga lura.",
                id: "song109"
            },
            {
                name: "Vit vecka",
                melody: "White Christmas",
                lyrics: "Jag drömmer om en vit vecka<br>Sju dagar utan alkohol.<br>Tänk att bara skåla<br>i juice och cola<br>och sedan minnas allt man gjort.<br>Jag drömmer om en vit vecka,<br>det finns en gräns för vad jag tål.<br>Jag vill inte dricka<br>mera sprit<br>så låt nästa vecka vara vit.",
                id: "song110"
            },
            {
                name: "Ritsch ratsch, filibom bom bom",
                lyrics: "Ritsch, ratsch, filibom-bom-bom,<br>filibom-bom-bom, filibom-bom-bom<br>Ritsch, ratsch, filibom-bom-bom,<br>filibom-bom-bom, filibom!<br>Fru Söderström, fru Söderström,<br>fru Söderström, fru Söderström,<br>och lilla mamsell Ros!<br>Ge mig lite sodavatten,<br>sodavatten, sodavatten.<br>Ge mig lite sodavatten,<br>sodavatten, punsch!",
                id: "song111"
            },
            {
                name: "Siffervisan",
                melody: "Ritsch, ratsch",
                lyrics: "1, 2, 75, 6, 7, 75, 6, 7, 75, 6, 7<br>1, 2, 75, 6, 7, 75, 6, 7, 73<br>107, 103, 102<br>107, 6, 19, 27<br>17, 18, 16, 15<br>13, 19, 14, 17<br>19, 16, 15, 11<br>8, 47!",
                footnote: "Σ 1235<br>For eng. see p149",
                id: "song112"
            },
            {
                name: "Mattevisan",
                melody: "Ritsch, ratsch",
                lyrics: "sin(34π) gånger x2 - 15y<br>Ellen, Pythagoras, McLaurin och Cauchy<br>Herr Riemann, fröken Rungekutta,<br>Einstein, Einar<br>Fibolattjo, Euler dom är kul!<br>Adekvat Fermat ▁(spenat^2 ) såklart!<br>Pollacksbacken, Sturegatan, natt-sonat på fat",
                id: "song113"
            },
            {
                name: "Olja på kedjan",
                melody: "Edvin Andersson & Oskar Hellman",
                lyrics: "Olja på kedja<br>Kedjan i växel<br>Cykling på schemat<br>Så vare menat<br>Tramp, tramp, muskelkramp<br>Polacksbacken, fan va brant",
                footnote: "Det påstås att Polacksbacken har en lutning på enbart 10°",
                id: "song114"
            },
            {
                name: "Ode till Treo comp",
                cred: "Längtan till landet",
                lyrics: "Morgonstund med smak av döda bävrar.<br>Frukostmorgonen är över oss.<br>Hur vi stretar, hur vi alla vägrar,<br>så går solen likt förbannat opp.<br>Snart är dagen här med hemska plågor,<br>huvudvärk och ångest, elände men<br>det finns faktiskt ett glas som dig kan hjälpa<br>Treo Comp vår frälsare och vän.",
                id: "song115"
            },
            {
                name: "Diskmaskin",
                melody: "Yesterday",
                cred: "Joakim Nyberg",
                lyrics: "Diskmaskin,<br>om jag hade haft en diskmaskin,<br>hade disken vart så ren och fin,<br>men jag har ej en diskmaskin",
                id: "song116"
            },
            {
                name: "Rövarsången",
                melody: "Ronja Rövardotter",
                lyrics: "Whööh Whöööhh ö Whöööööööh<br>Woohööö hööö whöööhöööhöhöööö<br>Wööh Wöööhh ö Wöööööööh<br>Woohööö hööö whöööhöööhöhöhööhöhöåhööööö…",
                footnote: "Sjunges med inlevelse",
                id: "song117"
            },
            {
                name: "Ofvandahls",
                melody: "Ovan där",
                cred: "Henrik Arnberg",
                lyrics: "Hundra år sen ungefär<br>Ofvandahl han sa så här:<br>Skriva dikter ger mig ingen peng i pung,<br>nej blott misär.<br>Det nåt annat måste bli,<br>varför ej ett bageri,<br>runda bullar små mig gör till miljonär.<br>Ofvandahls, kaffe med avec.<br>Ofvandahls, Landings stora skräck.<br>Ofvandahls, Napoleoncanapé<br>ger oss krafter nog att vandra vidare.<br>Under åren som har gått,<br>många styrketåren fått<br>och en del av dem på Ofvandahls,<br>när det känts trist och grått.<br>Efter nattens hårda slit<br>när det ej finns mera sprit,<br>då man tar en kaffetår och lever opp.<br>Ofvandahls …<br>Ja, sen slumpa det sig så,<br>att V-Dala råka få<br>Ofvandahls en dag när övriga<br>inkomster var rätt små.<br>Som en högre slags försyn,<br>som en kringla ifrån skyn,<br>vi har sålt det nu men det var kul ändå.<br>Ofvandahls …",
                footnote: "1878 öppnades Ofvandahls i sin första version, då under namnet Café Dahlia",
                id: "song118"
            },
            {
                name: "Smedsvisa",
                lyrics: "En gång i min ungdom älskade jag<br>en flicka med rena och ljuva behag.<br>Hon lova mig tro i lust och i nöd,<br>allt in till den blekaste död.<br>Hej hopp faderideladeralladerej,<br>hej hopp faderideladeralladerej.<br>Hon lova mig tro i lust och i nöd,<br>allt in till den blekaste död.<br>Hon var som en lilja, vit uti hyn,<br>den fagraste flicka som skådats i byn,<br>ett smittande skratt, en lustiger sång,<br>vi älskade sommaren lång.<br>Hej hopp faderideladeralladerej,<br>hej hopp faderideladeralladerej.<br>Ett smittande skratt, en lustiger sång,<br>vi älskade sommaren lång!<br>Men kärleken vissna, kärleken dog,<br>vid Mikaelsmäss hade flickan fått nog.<br>Hon fann sig en riker, högfärdig man,<br>sa tack och adjö och försvann.<br>Hej hopp faderideladeralladerej,<br>hej hopp faderideladeralladerej,<br>Hon fann sig en riker, högfärdig man,<br>sa tack och adjö och försvann.<br>Nu står jag vid städet, sliten och grå,<br>och hammaren bultar och hjärtat likså.<br>Men aldrig den flickan kommer igen,<br>hon är hos sin nyvunne vän.<br>Hej hopp faderideladeralladerej,<br>hej hopp faderideladeralladerej.<br>Nej, aldrig den flickan kommer igen,<br>men sången den trallar jag än:<br>Traraj…",
                footnote: "En kortare version av sången får du genom att sjunga första raden från första versen, andra raden från andra osv.",
                id: "song119"
            },
            {
                name: "O hemska lab",
                melody: "O helga natt",
                cred: "Okänd (vers 1), Robert Gavelin (vers 2), Irmeli Barkefors (vers 3)",
                lyrics: "O hemska lab, o grymma kval i morgon.<br>Här sitter jag och förstår ingenting.<br>Hela mitt inre är fyllt utav ett motstånd<br>emot eländig elektrisk mätteknik.<br>Jag skulle nog behöva lite ledning,<br>här räcker inte min kapacitans.<br>Kondensatorer och felvända dioder.<br>hemska lab, nu vill jag koppla av.<br>hemska lab, ty detta blir min grav.<br>hemska lab, o grymma kval imorgon.<br>Här sitter jag och förstår ingenting.<br>Hela programmet är fyllt utav funktioner<br>som innehåller en himla massa fel.<br>Pekare som inte har nån riktning,<br>oändliga loopar, oj vad jag blir sträng!<br>Å kompilera, hur ska det här fungera?<br>hemska lab, nu vill jag logga ut.<br>hemska lab, ty detta blir mitt slut.<br>hemska lab, o grymma kval imorgon.<br>Här sitter jag och förstår ingenting.<br>Hela min hjärna känn centrifugerad<br>och något ljushuvud slängde fel fraktion.<br>Hur ska jag nu kunna extrahera<br>när etanolen jag har supit upp?<br>Kristallisera, fälla ut och separera.<br>hemska lab, jag fick baksug nu igen.<br>hemska lab, nu vill jag åka hem.",
                id: "song120"
            },
            {
                name: "En matematiker (A/N: copyright)",
                melody: "En sockerbagare",
                cred: " Mathias Lundgren",
                lyrics: "En matematiker här bor i staden,<br>hen räknar matte mest hela dagen.<br>Hen räknar primtal, stora och små,<br>hen tycker om x upphöjt i två<br>Och i hens fönster hänger skumma saker,<br>där finns det sfärer, ibland kvadrater,<br>och små ellipser och kägelsnitt.<br>Låter det roligt så ta en titt.<br>Vår matematiker som bor i staden,<br>hen deriverar i högsta graden,<br>hen äter co(u)s-co(u)s och basmat(i)ris,<br>Det verkar vettigt på något vis.<br>Hen skriver räkneböcker för studenter,<br>och hen gör uppgifter till massa tentor.<br>Och är hen snäller blir svaret 2,<br>men är hen stygger så blir det.",
                id: "song121"
            },
            {
                name: "Dansen går på Svinnsta skär (A/N: copyright)",
                melody: " Gideon Wahlberg",
                lyrics: "Dansen den går uppå Svinnsta skär,<br>hör klackarna mot hällen.<br>Gossen han svänger med flickan kär<br>i stilla sommarnatt.<br>Blommorna dofta från hagen där<br>och många andra ställen,<br>och mitt i talltrastens kvällskonsert<br>hörs många glada skratt.<br>Ljuvlig är sommarnatten,<br>blånande vikens vatten.<br>Och mellan bergen och tallarna<br>höres musiken och trallarna.<br>Flickan har blommor i håren,<br>månen strör silver i snåren.<br>Aldrig förglömmer jag stunderna där<br>uppå Svinnsta skär.<br>Gossen tar flickan uti sin hand<br>och vandrar nedåt stranden,<br>lossar sin jolle och ror från land<br>bland klippor och bland skär.<br>Drömmande ser han mot vågens rand,<br>som rullar in mot sanden,<br>kysser sin flicka så ömt ibland<br>och viskar: Hjärtans kär.<br>Ljuvlig är sommarnatten…<br>Solen går upp bakom Konungssund<br>och stänker guld på vågen.<br>Fåglarna kvittra i varje lund<br>sin stilla morgonbön.<br>Gäddorna slå invid skär och grund<br>så lekfulla i hågen.<br>Men sista valsen i morgonstund,<br>man hör från Svinnerön:<br>Ljuvlig är sommarnatten...",
                footnote: "Svinnsta skär finns inte på riktigt. När Gideon Wahlberg framförde sången för första gången så drog han till med det för att ge sången lokalfärg.",
                id: "song122"
            },
            {
                name: "Busslåt",
                melody: "Båtlåt",
                lyrics: "Det var en buss som sa till en annan:<br>Va du var stilig. Din lack é alld’less för grann.<br>Vi prejas lite grann och repar ned varann.<br>Som bara bussar kan.<br>Badda bam bam bam bam<br>Badda bam bam bam<br>Andra bussen sa: Klart att jag vill va’<br>med och krocka. Krossa din stiliga för.<br>Vi varann förstör. Busschauffören dör.<br>Av vägen sen vi kör.<br>Badda bam bam bam bam<br>Badda bam bam bam<br>Sedan kan vi slå en kanske två<br>våldsamma volter. Landa nånstans vid en bäck.<br>Rulla lite däck. Bensintanken är läck.<br>Och elden är ej släckt.<br>Badda bam bam bam bam<br>Badda bam bam BOOM!",
                id: "song123"
            },
            {
                name: "Cykellåt",
                melody: "Båtlåt",
                lyrics: "Det var en cykel som sa till en annan<br>“Va diina däck e runda, o lacken är skinande röd.<br>Med din lampas glöd, jag känner mig förförd.<br>Som bara cyklar gör”<br>Badda ring ring ring pling<br>Badda ring ring ring<br>O andra cykeln sa<br>“Klart att jag vill va<br>med o rulla.<br>Till ett garage som vi fann,<br>vi utforskar varann,<br>och växla lite grann.<br>Som bara cyklar kan”<br>Badda ring ring…<br>Sen när vi är två,<br>ja, då tar vi på<br>sadelskydden.<br>Ger våra klockor en ring<br>Plingeling,<br>Spänna våra ekrar, smörja våra kedjor,<br>på med stänkskärm,<br>bli lite oljiga, ha lite skoj<br>Oj, oj, oj!<br>O när vi nu blir fler,<br>kan vi växla ner,<br>ta det varligt.<br>Rullar med stödhjulen på,<br>lättare att stå,<br>när man är fler än två<br>Så många cyklar små<br>Badda ring ring…",
                id: "song124"
            },
            {
                name: "Måsen",
                melody: "Månvisa",
                lyrics: "Det satt en mås på en klyvarbom<br>och tom i krävan var kräket.<br>Och tungan lådde vid skepparns gom<br>där skutan låg uti bleket.<br>”Jag vill ha sill”, hördes måsen rope<br>och skepparn svarte: ”Jag vill ha OP.”<br>Om blott jag får, om blott jag får.<br>Nu lyfter måsen från klyvarbom,<br>och vinden spelar i tågen.<br>Och OP:n svalkat har skepparns gom,<br>jag önskar blott att jag såg’en.<br>Så nöjd och lycklig den arme saten,<br>han sätter storseglet den krabaten.<br>Till sjöss han far, och Halvan tar.<br>Den mås som satt på en klyvarbom,<br>den är nu död och begraven,<br>och skepparn som drack en flaska rom,<br>han har nu drunknat i haven.<br>Så kan det gå om man fått för mycket,<br>om man för brännvin har fattat tycke.<br>Vi som har kvar, vi resten tar.",
                footnote: "For eng see sida 149",
                id: "song125"
            },
            {
                name: "Mesen",
                melody: "Månvisa",
                lyrics: "Det satt en mes i en klyvarmast,<br>där sågs han ragla och svaja.<br>För trots att frön var hans enda last<br>var han nu full som en kaja.<br>”Vad har du gjort”, hördes skepparn stöna<br>och mesen svarte: ”Jag rökte fröna<br>i egen holk, i egen holk.”",
                id: "song126"
            },
            {
                name: "Musen",
                melody: "Månvisa",
                lyrics: "Det satt en mus i en hushållsost<br>och åt och åt utan måtta<br>tills osten blev till en mushåls-ost<br>och han en klotformad råtta.<br>”Så bra” sa musen ”att va’ en fettboll<br>nu kan jag rulla med hast åt rätt håll:<br>Ostindien, Ostindien.”",
                id: "song127"
            },
            {
                name: "Moosen",
                melody: "Månvisa",
                lyrics: "Det satt en älg i en klyvartopp,<br>förklädd i älgjaktens månad.<br>Han var befjädrad till horn och kropp<br>ja, skepparn blev rätt förvånad<br>”Jag är en mås, goa skepparn” ljög den<br>förklädda älgen. Därefter flög den.<br>Mjukt föll den sen, på skepparen.",
                id: "song128"
            },
            {
                name: "Svärfar",
                melody: "Jänta och jag",
                lyrics: "'En kall ruskig höst,<br>kom vinden från öst<br>och medförde storm och dimma.<br>Å då tyckte jag,<br>att lämpligt det var<br>att lära min svärfar simma.<br>I havet jag la’ honom galant,<br>och höll’na i hakan ganska bastant.<br>När bränningen kom ur handen han slant,<br>sen dess har jag inte sett’na!",
                id: "song129"
            },
            {
                name: "Dance macabre",
                melody: "Vårvindar friska",
                lyrics: "Runt kring vår stuga smådjävlar sluga,<br>tassa så tyst med bockfot och svans.<br>Varulvar yla, isande kyla<br>sveper i dimma fanstygens dans.<br>Bäva, o syskon lyssna och hör<br>vrålen från gast som osalig dör.<br>Satan han skrattar, flaskan han fattar<br>super tills dagen gryr.<br>Gastar och spöken skymtar i kröken,<br>döingar släpar ruttnande lik.<br>Benrangel skramla, spökhänder famla,<br>kväva din strupes rosslande skrik.<br>Helvetets alla fasor släppts loss,<br>Fan riden här med hela sin tross.<br>Göm dig i stugan, du har fått flugan,<br>dille det blir din lott!",
                id: "song130"
            },
            {
                name: "Jag skall festa",
                melody: " Bamse",
                lyrics: "Jag skall festa, ta det lugnt med spriten,<br>ha det roligt utan att va’ full.<br>Inte krypa runt med festeliten,<br>ta det varligt för min egen skull.<br>Först en öl i torra strupen,<br>efter det så kommer supen,<br>in med vinet, ner med punschen<br>sist en groggbuffé.<br>Jag är skitfull, däckar först av alla,<br>missar festen, men vad gör väl det?<br>Blandar hejdlöst öl och gammal filmjölk,<br>kastar upp på bordsgrannen brevé!",
                footnote: "For eng see p 59",
                id: "song131"
            },
            {
                name: "Jag har aldrig vart på snusen",
                melody: "Frälsarpsalm",
                lyrics: "Jag har aldrig vart på snusen,<br>aldrig rökat en cigarr, halleluja!<br>Mina dygder äro tusen,<br>inga syndiga laster jag har.<br>Jag har aldrigt sett nåt naket,<br>inte ens ett litet nyfött barn.<br>Mina blickar går mot taket,<br>Därmed undgår jag frestarens garn.<br>Halleluja…<br>Bacchus spelar på gitarren,<br>Satan spelar på sitt handklaver.<br>Alla drävlar dansar tango,<br>säg, vad kan man väl önska sig mer?<br>Jo, att alla bäckar vore brännvin,<br>Fyrisforsen full av bayerskt öl,<br>konjak i varenda rännsten<br>och punsch i varendaste pöl.<br>Och mer öl…",
                id: "song132"
            },
            {
                name: "Jag var full en gång",
                melody: "Flottarkärlek",
                lyrics: "Jag var full en gång för länge sen,<br>på knäna kröp jag hem,<br>varje dike var för mig ett vilohem.<br>I varje hörn och varje vrå<br>hade jag en liten vän,<br>ifrån renat upp till nittiosex procent.<br>Jag var full en gång för länge sen,<br>på knäna kröp jag hem,<br>och i sällskap hade jag en elefant.<br>Elefanten spruta vatten<br>och jag trodde det var öl,<br>sedan dess har alla kallat mig för knöl.<br>mera öl!",
                id: "song133"
            },
            {
                name: "När jag är fuller",
                melody: "Månvisa",
                cred: "Tore Norén",
                lyrics: "När jag är fuller då är jag glad,<br>fan vet om jag ej är vacker.<br>Jag vandrar kring i vår lilla stad,<br>ibland lyxhus och baracker.<br>Jag sjunger ljuvligt en serenad,<br>det gör jag bara när jag är glad<br>och full och vacker, och full och vacker.<br> När jag är fuller då är jag stark,<br>fan vet om jag ej är modig.<br>Då kan jag slå vem som helst i mark,<br>Så den blir trasig och blodig.<br>Jag välter träden i våran park,<br>det gör jag bara när jag är stark<br>och full och modig, och full och modig.<br>När jag är fuller då är jag rik,<br>fan vet om jag ej är snille.<br>Och dör jag blir jag ett vackert lik,<br>begravs med gravöl och gille.<br>I himlen möts jag av hornmusik,<br>det gör man bara när man är rik<br>och är ett snille, och är ett snille.<br>Men när jag vaknar upp nästa dag,<br>uppå ett enkelrum med galler.<br>Då känner jag mig så rysligt svag<br>och hatar bråk och kravaller.<br>Min mage krånglar och är ur lag,<br>nog fan så vet jag att jag idag<br>är bakom galler, är bakom galler.",
                id: "song134"
            },
            {
                name: "Portos visa",
                melody: "You can’t get a man with a gun, ur ”Annie get your gun",
                lyrics: "Jag vill ut och gasqua,<br>var fan är min flaska,<br>vem i helvete stal min butelj?<br>Skall törsten mig tvinga<br>en TT börja svinga?<br>Nej, för fan, bara blunda och svälj!<br>Vilken smörja<br>får jag spörja:<br>Vem fan tror att jag är en älg?<br>Till England vi rider<br>och sedan vad det lider<br>träffar vi välan på någon pub.<br>Och där ska vi festa<br>blott dricka av det bästa<br>utav whisky och portvin.<br>Vi tänker gå hårt in<br>för att pröva på rubb och stubb.<br>Rubb och stubb, rubb och stubb,<br>rubb och stubb, rubb och stubb,<br>rubb och …",
                id: "song135"
            },
            {
                name: "Spritbolaget1",
                melody: "Snickeboa",
                lyrics: "Till spritbolaget ränner jag<br>och bankar på dess port<br>Jag vill ha nåt som bränner bra<br>och gör mig skitfull fort<br>Expediten sade: Goddag,<br>hur gammal kan min herre va?<br>Har du nåt leg, ditt fula drägg?<br>Kom hit igen när du fått skägg<br>Nej, detta var ju inte bra,<br>jag ska bli full ikväll<br>Å plötsligt en idé jag fick,<br>de har ju sprit på shell<br>Många flaskor stod där på rad,<br>så nu kan jag bli full och glad<br>Den röda drycken åkte ner,<br>nu kan jag inte se nåt mer",
                footnote: "Under mitten av 1800-talet startades inte bara Sveriges, utan även världens, första alkoholmonopol i Falun. Systembolaget bildades 1955.<br>For eng see sida 148",
                id: "song136"
            },
            {
                name: "Spritromantik",
                melody: "Mössens visa, från Disneys ”Askungen”",
                cred: "Algot Ritmer",
                lyrics: "Låt oss alla öppna gapet<br>och ge hän åt dryckenskapet.<br>För nu ska hela laget<br>va med på fylleslaget.<br>Om grannen din kollapsar<br>se till att sno hans snapsar.<br>För om du än kan stå upp<br>är det bara till att slå upp,<br>bara ställ de rosa djuren i tamburen.<br>En sup ger åt tanken vingar,<br>skönt klingar helan går.<br>På detta vis betvingar<br>vår ångest som nyss var så svår.<br>Som sten ger på vattnet ringar<br>sprids glädjen kring, för det är visst:<br>Att supa solitä-ärt, är inte någe vä-ärt,<br>då är man ju blott en alkoholist!",
                id: "song137"
            },
            {
                name: "Törsten rasar",
                melody: "Längtan till landet",
                lyrics: "Törsten rasar uti våra strupar,<br>tungan hänger torr och styv och stel,<br>men snart vankas stora långa supar,<br>var och en får sin beskärda del.<br>Snapsen kommer den vi vilja tömma<br>denna nektar lik Olympens saft,<br>kommer oss att våra sorger glömma,<br>snapsen skänker hälsa, liv och kraft.<br>Helan tänder helig eld i själen,<br>Halvan rosar livets morgonsky.<br>Tersen känns från hjässan ner till hälen,<br>Kvarten gör en mänska splitterny.<br>Låt oss skåla med varann’ go’vänner,<br>skål för vår levnads glada hopp,<br>törstens kval på nytt i strupen bränner.<br>Leve livet! Skål och botten opp!",
                id: "song138"
            },
            {
                name: "Pärleporten",
                melody: "Alfred Dulin",
                cred: "Fredrik Arvid Bloom",
                lyrics: "Som en härlig gudomskälla,<br>rik och mäktig, djup och stor<br>är den kärlek, nåd och sanning<br>som i Jesus hjärta bor.<br>Han har öppnat pärleporten<br>så att jag kan komma in.<br>Genom blodet har han frälst mig<br>och bevarat mig som sin.<br>Under över alla under,<br>allt förlät han mig en gång.<br>Om hans underbara godhet<br>glad jag sjunger nu min sång.<br>Han har öppnat pärleporten…<br>När en gång i livets morgon<br>till den gyllene port jag når,<br>då för Jesus stora kärlek<br>ock för mig den öppen står.<br>Han har öppnat pärleporten…",
                footnote: "Texten är tänkt att uttrycka en omvänd syndares glädje och tacksamhet. Framförs gärna accompanjerad av dragspel.",
                id: "song139"
            },
            {
                name: "Strejk på Pripps",
                melody: "I natt jag drömde",
                lyrics: "I natt jag drömde något som<br>jag aldrig drömt förut<br>Jag drömde det var strejk på Pripps<br>och alla bärs var slut<br>Jag drömde om en jättesal<br>där bärsen stod på rad<br>så skrev de på ett konvolut<br>och reste sig och sa:<br>Det finns inga blå burkar mer,<br>Nej, inte en endaste bärs;<br>Och dom som hörde detta sa att:<br>’Detta blir en pers’.<br>På gatorna gick folk omkring<br>Och drog från krog till krog,<br>Och alla vrålade av törst<br>Och svimmade och dog",
                id: "song140"
            },
            {
                name: "Bort med tyngdkraft",
                melody: "Halleluja",
                lyrics: "Det finns en plats där månen bor<br>Det är den plats dit Armstrong for<br>Där allting är så lätt, inga bekymmer<br>Det är så tungt att vara fast,<br>På jordens mark, en riktig last!<br>Jag vill va’ fri och flyga, HALLELUJA!<br>Bort med tyngdkraft,<br>Bort med tyngdkraft,<br>Bort med tyngdkraft,<br>Jag vill fly-y-y-y-y-y-gaaaa<br>Att vandra runt på våran jord<br>Det känns som att begå självmord<br>En ryggsäck full av stenar i mitt hjärta!<br>När Newton under trädet satt<br>Då var det som om allt blev natt?!<br>Att äpplet föll blev slutet för oss alla!<br>Bort med tyngdkraft…",
                footnote: "Gravitation (av latin gravis = tung) även känd som tyngdkraft är en av universums fyra fundamentala krafter. Det är den attraherande kraft som massor utsättervarandra för, och ger upphov till det som vi kallar massans tyngd.",
                id: "song141"
            },
            {
                name: "Studentvisan",
                melody: "Luffarevisan",
                cred: "Leo Hoff von Sydow & Helena Lundvall",
                lyrics: "Se studenten som cyklar längs vägen,<br>Se studenten med alla bestyr.<br>Så snart som det blir vår<br>efter häng på kår<br>på nation letar äventyr.<br>Hen går så långt som fyrisån räcker,<br>hen har en strävan att klara var period.<br>Men när som sola skin<br>och nån bjuder vin,<br>glömmer hen sin studiemetod.<br>Hen vill ha tid till att njuta,<br>tid till att njuta<br>Dricka fulvinsbål<br>hinna ropa; SKÅL!,<br>innan studietiden är slut<br>Hen vill ha tid till att njuta,<br>tid till att njuta<br>Dricka fulvinsbål<br>hinna ropa; SKÅL!,<br>innan studie . . . . tiden är slut.",
                id: "song142"
            },
            {
                name: "Jesus lever",
                melody: " Sånt är livet",
                lyrics: "Jesus lever, han bor i Flogsta<br>Han kör en Volvo och han är gift<br>Han har en villa med rododendron<br>Han sparar pengar och jobbar skift<br>Redan på lekis var han märklig<br>Han ville inte leka krig<br>Men när hans kompis, Knut, blev skjuten<br>så lät han Jesus uppväcka sig<br>Jesus lever, han bor i Flogsta...<br>Han gick i skolan, som alla andra<br>Han var rätt duktig på gymnastik<br>å vilken kille han gick på vatten<br>en gång så gick han till Reykjavik<br>Jesus lever, han bor i Flogsta...<br>I sina tonår så var han poppis<br>Och han blev bjuden på varje fest<br>Å vilken kille, han fick ju vatten<br>att bli till rusdryck utan jäst<br>:|| Jesus lever, han bor i Flogsta... ||:",
                id: "song143"
            },
            {
                name: "Brännvinsmaskin",
                melody: "Bordeaux, Bordeaux (I sommarens soliga dagar)",
                cred: "Joakim Nyberg",
                lyrics: "En brännvinsmaskin den uppfann jag<br>med den in i dimman försvann jag<br>på snusen och sedan så fann jag<br>Mig bjuda in till fest mest som ett test<br>Först kom ett bål<br>sen kom ett vin<br>och sen kom hela dunken in<br>Sen kom student<br>Helt övertänt<br>Och sen kom Edward Bloms skribent<br>Sist kom fyra alkoholister<br>från Uppsalas a-lag och en var jag",
                footnote: "I Sverige började man bränna brännvin på 1400-talet och det<br>användes då till kruttillverkning. Först framåt århundradets slut började man<br>använda brännvinet till förtäring",
                id: "song144"
            },
            {
                name: "Finland är Finland och Finland är bra",
                melody: "Högt över havet",
                lyrics: "Finland är Finland och Finland är bra.<br>Dom har en pipeline med sprit från Moskva.<br>Bada Bastu, piska med ris,<br>hacka hål i is.<br>Danmark är Danmark och Danmark är bra.<br>Dom har en jungfru som sitter så bar.<br>Röde pölsor med Tuborg och lök,<br>vi köpte billig krök<br>Norge är Norge och Norge är bra.<br>Dom har den olja som vi vill ha.<br>Dyrt i baren ett jävla pris,<br>klubba säl med is.<br>Island är Island och Island är bra.<br>Kriser, vulkaner och hästar dom har.<br>Jag fiser i geisern vad var det jag sa,<br>valspeck varje dag.<br>Sverige är Sverige och Sverige är bäst.<br>Ingvar Kamprad han tjänar mest.<br>Ullared, Abba och Absolut,<br>Nu är visan slut.",
                footnote: "Finland var en del av Sverige i över 600 år. År 1809 förlorades<br>Finland till Ryssland och drygt hundra år senare, 1917, blev Finland självständigt. Idag är Finland det enda landet med svenska som officiellt språk förutom<br>Sverige",
                id: "song145"
            },
            {
                name: "Hallen Luta",
                melody: " Halleluja",
                lyrics: "Jag minns knappt hur jag tog mig hem<br>klockan var minst kvart i fem<br>när jag stod utanför min egen våning.<br>Jag lyfte upp min nyckelring,<br>och haja nästan ingenting:<br>när dörren öppnas står min hall å lutar.<br>Hallen luta, hallen luta,<br>hallen luta, hallen lu - - - - ta<br>Jag minns knappt julen nittitre,<br>min bror var där å syster me,<br>å snyggingen i rött satt alldles breve.<br>Vi drack vår glögg och pratade,<br>min dejt blev trött och schappade.<br>Så jag fick ännu mer tid för den röde:<br>han i luva, han i luva,<br>han i luva, han i lu - - - - va<br>Fredagsmys har mer att ge<br>än räkor, snask och en TV.<br>Man kan ju hyra film å DVD.<br>Å vill man ha nåt riktigt bra,<br>så kan man faktiskt bara ta,<br>en film som vunnit Oscar åt en Berry:<br>Halle Berry, Halle Berry,<br>Halle Berry, Halle Be - - - - rry",
                id: "song146"
            },
            {
                name: "Palermo",
                melody: "Nu grönskar det",
                cred: "Kristian Houtila",
                lyrics: "Nu krökar vi på palermo<br>Nu doftar öl och sprit<br>Kom med kom med på barrunda<br>Sista anhalten det är hit<br>En öl så kall från grängesberg<br>Är livets rikedom<br>Den ger oss värme ger oss färg<br>Och läskar i vår gom<br>Men toakön är ack så lång<br>Och barkön likaså<br>Lokalen den är allt för trång<br>Men vi kommer in ändå<br>När nationen stängt vi komma hit<br>De säljer på kredit<br>Såå drick min vän drick öl igen<br>Palerk är öppet än",
                footnote: "Palermo har haft serveringstillstånd sedan 2009, med korta<br>uppehåll under 2011 och 2018.",
                id: "song147"
            },
            {
                name: "Vägen till den trettonde",
                melody: "Rocky road to Dublin",
                cred: "K:s konässörer",
                lyrics: "Det var en kväll i maj, skulle ut och röja<br>Pubrunda, partaj, bar en fräsig tröja<br>i kvällens ledmotiv. Temat var som alltid<br>klä dig som nåt kul. Krogen lukta’ palt<br>Jag drack min första kall, VG blev mitt kall<br>Ölen i mig small, från Djäknen bort mot öster<br>Ölen smaka’ sand, i östra Götaland, som den gör ibland<br>Hela vägen till den trettonde. En och två och tre<br>Samma visa varje gång, hur ska det gå?f<br>Vägen till den trettonde, alla ska vi ta<br>I GH:s höga torn, tusen tack för drickat<br>Hungern i mig gror, ville ej ha mikrat<br>Styrde sedan min kos mot en knökad källare<br>Köa i trekvart, för en öl på Wermlands<br>Tiden den var slut, tog med ölen ut<br>till Gotlands som ett spjut. En skål för kung och Keno<br>Sedan över bron, kissade i ån, lite kom på skon<br>Hela vägen till den trettonde. Fyra, fem och sex<br>Samma visa varje gång, hur ska det gå?<br>Vägen till den trettonde, alla ska vi ta<br>Till Smålands blev det sen, jazzen var igång<br>Klev in med vårt gäng, brast ut i en sång<br>Alla blängde surt, utslängd på en gång<br>men ölen hann ta slut. Vidare till Göteborgs<br>Hälsade på Glenn, rökte gula Blend<br>Prippsen tog jag sen, och hasade mot Kalmars<br>Spydde i en gränd, magen den var vänd, fyllde på igen<br>Hela vägen till den trettonde. Sju och åtta, nio<br>Samma visa varje gång, hur ska det gå?<br>Vägen till den trettonde, alla ska vi ta<br>I V-dalas vita hus, inte bara bira<br>Nypon i mitt krus, tungan börja’ slira<br>Bartendern åt mig skrek. Mot Upplands börja’ krypa<br>Vaktens skor fick smek, sög i mig en IPA<br>Snerikes är härnäst, slaganfall av stress<br>Trava som en häst, måste hinna klart<br>På Fernet någon bjöd, önska’ jag var död, återfann min<br>glöd<br>Hela vägen till den trettonde. Tio, elva, tolv<br>Samma visa varje gång, hur ska det gå?<br>Vägen till den trettonde, alla ska vi ta<br>Nästan framme nu, står i kön till Stocken<br>Packad som en gnu, vilsen mitt i flocken<br>Lyckades slinka in. Rulla’ fram till baren<br>”Ge mig sista bärsen, jag ska ha den!”<br>Kortet det var tömt, läget var fördömt<br>Då frågade jag ömt, och fick den sista gratis<br>Så gick jag i mål, drog ett glädjevrål, kallade till en skål<br>Hela vägen till den trettonde. Klarade allihop!<br>Samma visa varje gång, hur ska det gå?<br>Vägen till den trettonde, alla ska vi ta<br>Samma visa varje gång, hur ska det gå?<br>Vägen till den trettonde, alla ska vi ta",
                footnote: "Visste du att det finns tretton aktiva studentnationer i Uppsala?",
                id: "song148"
            },
            {
                name: "Ute vid Ångström",
                melody: "Uti vår hage",
                cred: "K:s konnässörer",
                lyrics: "Ute vid Ångström där har vi ett mål<br>Bli ingenjör<br>Livet är hårt hör nu mitt flogstavrål<br>Kom MATLAB och overaller<br>Kom tentor och tungmetaller<br>Kom ljuva CSN, maten är slut.<br>Säg vem vill leva ett liv fullt av synd<br>En ingenjör<br>Supa och cykla och myrorna fynd<br>Kom fulvin och spritbuteljer<br>Kom fylla på mer än helger<br>Kom brist på rutiner, kom studietid<br>Tre hundra poäng krävs för att bli klar<br>Bli ingenjör<br>Köpa bil som är förnyelsebar<br>Kom snus och Resorb i kaffet<br>Kom klåda uti mitt arsle<br>Kom ljuva examen, jag längtar så<br>Sitter på jobbet nu, jag fick min dröm<br>Blev ingenjör<br>Men vad jag saknar mitt kära Ångström<br>Kom inlupp och labbrapporter<br>Kom valborgs champagnegalopper<br>Kom nudlar och ketchup, jag vill tillbaks<br>Kom inlupp och labbrapporter<br>Kom valborgs champagnegalopper<br>Kom nudlar och ketchup, jag vill tillbaks",
                id: "song149"
            },
            {
                name: "Den äkta vikingen",
                melody: "When Johnny comes marching home again",
                lyrics: "En viking viker tvätten själv, hurra hurra<br>Ordet ”viking” kommer sig därav, jaha<br>Föräldraledigheten delas exakt,<br>När vikingen sina barn har lagt,<br>Då är vikingens fru ute på jakt.<br>En viking vill ha livets vann, hurra hurra<br>Men på sig själv han lägger band, så bra, så bra<br>Mjödet prioriteras sist,<br>Tvätta och städa blir aldrig trist<br>För våran viking, han är feminist.",
                id: "song150"
            },
            {
                name: "Telefon till himmelen",
                lyrics: "Jag har en telefon,<br>som går till herrens hus,<br>och när nån ringer på,<br>så svarar jag som så:<br>Hallå, hallå, hallå,<br>vad är det som står på?<br>Jo, det är Frälsningsarmén som ringer på.<br>För vi har kastat våra sorger bakom vår rygg,<br>Och vi ser dem inte mer,<br>Nej, vi ser dem inte mer.<br>För vi har kastat alla sorgerna<br>bakom vår rygg,<br>Och vi ser dem inte mer.<br>Jag är så lycklig, jag är så lycklig,<br>måndag, tisdag, onsdag, torsdag,<br>fredag, lördag, söndag.<br>Jag är så lycklig, jag är så lycklig,<br>hela veckan lång.<br>För vi tar spårvagnen upp till himmelen,<br>och det är Gud som kör, och Jesus konduktör.<br>Det går så lätt, lätt, lätt,<br>när man har fribiljett,<br>upp till himmelen.<br>Jag är så lycklig…",
                id: "song151"
            },
            {
                name: "Vi som oss för att supa glatt",
                melody: "Vi gå över daggstänkta berg",
                lyrics: "Vi som oss för att glupa satt, supa glatt,<br>ity den som försmå sin första tår, törsta får.<br>Av längtan att tryckas,<br>av trängtan att lyckas,<br>vi nu med bravur häller ur, eller hur?<br>Vi ge titt som tätt strupen sitt, supen stritt<br>skall forsa och snart får tarmen vår, varm en tår.<br>Er öven i seder,<br>och söven ned Eder.<br>På denna protestbullerfest, full är bäst!",
                id: "song152"
            },
            {
                name: "Härja-visan (oxå copyright)",
                melody: "Hjort-Anders Olsson",
                cred: "Hans Alfredson",
                lyrics: "Liksom våra fäder vikingarna i Norden,<br>drar vi riket runt och super oss under borden.<br>Brännvinet har blitt ett elixir<br>för kropp såväl som själ.<br>Känner du dig liten och ynklig på jorden,<br>växer du med supen och blir stor uti orden,<br>slår dig för ditt ludna bröst<br>och blir en man från hår till häl.<br>Ja, nu ska vi ut och härja,<br>supa slåss och svärja,<br>bränna röda stugor, slå små barn och säga fula ord.<br>Med blod ska vi stäppen färga;<br>nu äntligen lär jag<br>kunna dra nån riktigt nytta av<br>min Hermodskurs i mord.<br>Hurra, nu ska man äntligen få röra på benen,<br>hela stammen jublar och det spritter i grenen.<br>Tänk att än en gång få spränga fram<br>på Brunte i galopp!<br>Din doft, o kära Brunte, är trots brist i hygienen<br>för en vild mongol minst lika ljuv som syrenen.<br>Tänk att på din rygg få rida<br>runt i stan och spela topp!<br>Ja, nu ska vi…<br>Ja, mordbränder är klämmiga: Ta fram fotogenen!<br>Eftersläckningen tillhör just de fenomenen<br>inom brandmansyrket som jag tycker<br>är nån nytta med.<br>Jag målar för mitt inre upp den härliga scenen:<br>Blodrött mitt i brandgult. Ej ens prins Eugen en<br>lika mustig vy kan måla,<br>ens om han målade med sked.<br>Ja, nu ska vi...",
                id: "song153"
            },
            {
                name: "merry, heart-whole childhood days ",
                lyrics: "merry, heart-whole childhood days,<br>I mourn thy joys departed<br>I tread no more the golden ways,<br>so free and lightsome hearted<br>The fire that filled my veins of yore,<br>shall stir this saddened heart no more,<br>ierum, ierum, ierum,<br>quae mutatio rerum!<br>The student cap and dusty gown,<br>they fill my soul with longing<br>Like shadows o’er the dear old town,<br>strange memories are thronging,<br>And echoes from the past I hear,<br>a burst of song, a ringing cheer<br>ierum, ierum, ierum,<br>quae mutatio rerum!<br>The knowledge a-a-and ways of life, one to the students<br>teaches,<br>Another from the paragraphs, great conclusions reaches,<br>One mends the soul of those in need,<br>One tends to every bruise and bleed.<br>ierum, ierum, ierum,<br>quae mutatio rerum!<br>Now close the circle of our feast<br>For happiness’ protection<br>The troubles of the World decreased<br>We swear each other affection<br>So lift your glass, let it be heard<br>Still gods are walking in this world<br>Among our cups and goblets,<br>Among our cups and goblets",
                id: "song154"
            },
            {
                name: "Punsch is Coming",
                lyrics: "Punsch is coming, punsch is coming,<br>Cool and sweet.<br>Tinkling noises, mingling voices,<br>When we meet.<br>Here’s to mem’ries past, dear!<br>Here’s to every spring!<br>All our sorrows disappear<br>When punsch we bring.",
                id: "song155"
            },
            {
                name: "The Coffee Bean",
                melody: "If You’re Happy and You Know It",
                cred: "Rasmus ””chepskedjan, Den där snubben”” Göransson (F-lund)",
                lyrics: "Coffee, coffee, coffee, brandy and liqueur<br>It will put us in the mood that we prefer<br>As the morning starts approaching<br>We should all begin the toasting<br>Drinking coffee, coffee, brandy and liqueu",
                id: "song156"
            },
            {
                name: "Fredman’s 21st song",
                cred: "Mattias Sjö, (F-Lund)",
                lyrics: "And so we walk eventually.<br>From Bacchi turmoil, for you hear.<br>That Death calls: neighbour, come to me.<br>Your final hour’s near.<br>Old man, step up, despite your ache.<br>And you, young man, hear what I say:<br>The fairest Nymph of all, now take Her hand,<br>And be on your way.<br>If the grave is far too deep, you think.<br>Very well, then have yourself a drink.<br>If you take ditto one, ditto two, ditto three,<br>You’ll die so happily!<br>Say, neighbour, are you satisfied.<br>Then praise your life now, finally.<br>If our paths are unified.<br>Drink up and follow me.<br>But first with wine, both red and white.<br>We thank our hosts for what they gave.<br>Then freely in the starlit night.<br>We slip into our graves.<br>If the grave...",
                id: "song157"
            },
            {
                name: "The Liquor Store",
                melody: "Du käre lille snickerbo’",
                cred: "David Gustavsson, TLTH, Rasmus ””chepskedjan, Den där snubben”” Göransson (F)",
                lyrics: "In to the liquor store I go<br>And knock upon its door.<br>I want something to make me drunk<br>And that won’t make me poor.<br>The cashier said “You’d best not stay,<br>I need your age before you pay.<br>Some ID now, you ugly bore,<br>Come back when you look 34!”<br>My aim was to get drunk tonight<br>I had to change my plans<br>Wood alcohol is cheap, alright<br>I’ll buy a couple cans (at Statoil!)<br>Cleared the shelves of methanol<br>This is in line with my end goal<br>Now this dilemma faces me:<br>The more I drink, the less I see!",
                id: "song158"
            },
            {
                name: "The Number Song",
                cred: ": Rasmus ””chepskedjan, Den där snubben”” Göransson (F)",
                lyrics: "1, 2, 35, 6, 9, 35, 6, 9, 35, 6, 9,<br>1, 2, 35, 6, 9, 35, 6, 9, 33,<br>109, 103, 102, 109, 6, 19, 25,<br>19, 18, 16, 15, 13, 18, 14, 19,<br>19, 16, 18, 15, 7, 42.",
                id: "song159"
            },
            {
                name: "The Gull",
                lyrics: "There was a gull sitting on a boom,<br>And she was hungry and tired.<br>The skipper looked at the scene with gloom,<br>A drink was all he desired.<br>The gull said: “please give some herring to me!”<br>The skipper answered: “I want some O.P.,<br>If it’s around.” And it was found.",
                id: "song160"
            },
            {
                name: "Always Look on the Bright Side of Life",
                melody: "Eric Idle",
                lyrics: "Some things in life are bad<br>They can really make you mad<br>Other things just make you swear and curse.<br>When you’re chewing on life’s gristle<br>Don’t grumble, give a whistle<br>And this’ll help things turn out for the best<br>And always look on the bright side of life…<br>Always look on the light side of life…<br>If life seems jolly rotten<br>There’s something you’ve forgotten<br>And that’s to laugh and smile and dance and sing.<br>When you’re feeling in the dumps<br>Don’t be silly chumps<br>Just purse your lips and whistle - that’s the thing.<br>And always look on the bright side of life…<br>Always look on the light side of life…<br>For life is quite absurd<br>And death’s the final word<br>You must always face the curtain with a bow.<br>Forget about your sin - give the audience a grin.<br>Enjoy it - it’s your last chance anyhow.<br>So always look on the bright side of death...<br>Just before you draw your terminal breath…<br>Life’s a piece of shit<br>When you look at it.<br>Life’s a laugh and death’s a joke, it’s true.<br>You’ll see it’s all a show<br>Keep ’em laughing as you go.<br>Just remember that the last laugh is on you.<br>And always look on the bright side of life…<br>Always look on the right side of life...<br>Always look on the bright side of life…<br>Always look on the bright side of life…<br>Always look on the bright side of life…<br>Always look on the right side of life...",
                footnote: "en sån copyright igen: © Python Monty Pictures Ltd. För Norden & Baltikum: Universal Music Publishing AB. Tryckt med tillstånd av Gehrmans Musikförlag AB.",
                id: "song161"
            },
            {
                name: "I Got Skills",
                melody: "You’re the One that I Want",
                cred: "Gabriella Hammarin",
                lyrics: "I got skills, they’re multiplying, in automatic control<br>Electric power, fuel supplying, bike electrifying!<br>You better shape up, become an engineer.<br>Just a choice I won’t UNDO<br>You better shape up, I see it crystal CLEAR<br>to my heart I must be == TRUE<br>No resistance, a lot of things left for me to do.<br>The life that I want!<br>That’s the life that I want, ooh ooh ooh, money<br>The life that I want!<br>That’s the life that I want, ooh ooh ooh, money<br>The life that I want!<br>That’s the life that I want, ooh ooh ooh, money<br>The one I need, the one I need,<br>oh yes indeed, yes indeed!<br>If you’ve got physical affection<br>You’re too shy to convey.<br>Derivate my direction, to the Milky way.<br>I better shape up,<br>Become an engineer.<br>I need a job<br>Which can keep me well applied.<br>I better shape up,<br>if I’m gonna prove.<br>You better prove, that my fate is justified<br>Are you sure?<br>Yes I’m sure down deep inside.<br>The life that I want!",
                id: "song162"
            },
            {
                name: "Wasted",
                melody: "Shall We Gather at the River",
                cred: "Rasmus ””chepskedjan, Den där snubben”” Göransson (F)",
                lyrics: "I have never gotten wasted<br>Never smoked any cigars - hallelujah!<br>My virtues never will be tainted<br>I bear no sins at all.<br>I have never seen a nude man<br>Haven’t even seen a new-born child.<br>I will gaze upon the ceiling<br>Resisting all urge to be wild<br>Hallelujah...<br>Bacchus’ playing on the cello<br>Satan’s playing the accordion<br>All the devils do the tango<br>Say, what more could you ever wish for?<br>Well, that every spring would splutter spirits<br>All the ponds be filled with German beer<br>Brandy flowing in the gutter<br>And a lake of punsch to revere<br>And bring more beer...",
                id: "song163"
            },
            {
                name: "What’ll We Do with the Drunken Sailor",
                lyrics: "What’ll we do with the drunken sailor,<br>What’ll we do with the drunken sailor,<br>What’ll we do with the drunken sailor,<br>earl-aye in the morning?<br>Way-hay, an’ up she rises,<br>Way-hay, an’ up she rises,<br>Way-hay, an’ up she rises,<br>earl-aye in the morning!<br>1 Sling him in the long boat till he’s sober<br>2 Keep him there and make ‘im bale ‘er<br>3 Pull out the plug and wet him all over<br>4 Take ‘im and shake ‘im, try an’ wake ‘im<br>5 Trice him up in a runnin’ bowline<br>6 Give ‘im a taste of the bosun’s rope-end<br>7 Give ‘im a dose of salt and water<br>8 Stick on ‘is back a mustard plaster<br>9 Shave his belly with a rusty razor<br>10 Send him up the crow’s nest till he falls down<br>11 Tie him to the taffrail when she’s yardarm under<br>12 Put him in the scuppers with a hose-pipe on him<br>13 Soak ‘im in oil till he sprouts flippers<br>14 Put him in the guard room till he’s sober<br>15 Put him in bed with the captain’s daughter* ...international 75<br>16 Take the Baby and call it Bo’sun<br>17 Turn him over and drive him windward<br>18 Put him in the scuffs until the horse bites on him<br>19 Heave him by the leg and with a rung console him<br>20 That’s what we’ll do with the drunken sailor",
                footnote: "Captain’s daughter: A relative of the cat-o-nine-tails<br>This is a captain’s shanty, a song used when raising the anchor. It has nothing<br>to do with actual punishment of intoxicated sailors. There are many variants<br>of this song",
                id: "song164"
            },
            {
                name: "Write in C",
                melody: "Let it Be",
                lyrics: "When I find my code in tons of trouble,<br>friends and colleagues come to me,<br>speaking words of wisdom:<br>”Write in C.”<br>As the deadline fast approaches,<br>and bugs are all that I can see,<br>somewhere, someone whispers:<br>”Write in C.”<br>Write in C, write in C,<br>write in C, oh, write in C.<br>LOGO’s dead and buried,<br>write in C.<br>I used to write a lot of FORTRAN,<br>for science it worked flawlessly.<br>Try using it for graphics!<br>Write in C.<br>If you’ve just spent nearly 30 hours<br>debugging some assembly,<br>soon you will be glad to<br>write in C.<br>Write in C, write in C,<br>write in C, yeah, write in C.<br>Only wimps use BASIC,<br>write in C.<br>Write in C, write in C,<br>write in C, oh, write in C.<br>Pascal won’t quite cut it,<br>write in C.<br>Write in C, write in C,<br>write in C, yeah, write in C.<br>Don’t even mention COBOL,<br>write in C.",
                id: "song165"
            }
        ],
    }),
    actions: {
        fixDummyEvent(event) {
            // Only used during development
            return { ...event, startDate: new Date().setDate(new Date().getDate() + 3 - event.id), endDate: new Date().setDate(new Date().getDate() + 3 - event.id)}
        },
        async fetchEvents(onlyVisible = true) {
            // Fetches all events. Only visible is only ever set to false in the admin pages
            const res = await axios.get(`/events${onlyVisible ? '' : '/all'}`)

            // Used during development
            const events = Object.fromEntries(res.data.map((event) => ([event.id, this.fixDummyEvent(event)])))

            this.eventsFetched = true
            this.events = events
        },
        async fetchEvent(id) {
            // Fetches a specific event and updates the stores state of that event
            const res = await axios.get(`/event/${id}`)

            this.events[id] = this.fixDummyEvent(res.data)

            return this.events[id]
        },
        async fetchEventTemplate() {
            // Gets the JSON template for an event
            const res = await axios.get('/event/template')

            return res.data
        },
        async updateEvent(event) {
            // Updates the event with the new data
            const res = await axios.put(`/event/${event.id}`, event, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!res.data.result) {
                // Failed update
                return false
            }

            const updatedEvent = res.data.event

            // Updates the event in the state with the new event
            this.events[updatedEvent.id] = this.fixDummyEvent(updatedEvent)

            return true
        },
        async createEvent(event) {
            // Saves a new event with the data given
            const res = await axios.post(`/event`, event, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!res.data.result) {
                // Failed save
                console.error(res.data.error);
                return { success: false, id: null }
            }

            const updatedEvent = res.data.event

            // Adds the new event to the state
            this.events[updatedEvent.id] = this.fixDummyEvent(updatedEvent)

            return { success: true, id: updatedEvent.id }
        },
        async getEvent(id, markFuture = true) {
            // Gets a specific event from the state

            // If the events havn't been fetch it fetches them
            if (!this.eventsFetched) {
                await this.fetchEvents()
            }

            // Checks if the event exist
            if (Object.keys(this.events).includes(id)) {
                const event = this.events[id]

                if (!markFuture) {
                    return event;
                }

                // Returns the event and also if its a future event
                return {
                    ...event,
                    futureEvent: new Date().valueOf() < event.startDate
                };
            }
            throw new Error('The event does not exist')
        },
        searchSongs(term) {
            if (term === '') {
                return [];
            }

            const searchTerm = term.toLowerCase()

            // Searches all the songs in the state to see if there are any matches
            let matchedSongs = this.originalSongs.filter((song) => Object.entries(song).some(([key, val]) => key !== 'cred' && val.toLowerCase().includes(searchTerm)))

            const regex = new RegExp(`(${searchTerm})`, 'i');

            // Marks the matched part of the name, lyrics and melody if there is one
            matchedSongs = matchedSongs.map((song) => {
                let matchedParts = {
                    matchedName: song.name.replace(regex, '{match}$1{match}'),
                    matchedLyrics: song.lyrics.replace(regex, '{match}$1{match}').replace(/\<br\>/g, ' '),
                    matchedMelody: song.melody?.replace(regex, '{match}$1{match}')
                }

                const lyricsParts = matchedParts.matchedLyrics.split("{match}")

                // Starts the lyrics preview near the match
                if (lyricsParts.length > 1) {
                    matchedParts.matchedLyrics = lyricsParts[0].slice(-20) + `{match}${lyricsParts[1]}{match}` + (lyricsParts[2] || '')
                }

                return { ...matchedParts, ...song }
            })

            return matchedSongs
        },
        async uploadFile(file) {
            // Uploads a file to the server

            // Creates a form data instance that will contain the file
            const formData = new FormData()

            formData.append('file', file)

            // Uploads the form data
            const res = await axios.post('/upload', formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "x-rapidapi-host": "file-upload8.p.rapidapi.com",
                  "x-rapidapi-key": "your-rapidapi-key-here",
                },
            })

            // Returns the path to the image in the server
            return 'http://localhost:3000/' + res.data
        }
    }
});

// Used for hot module replacement (HMR) during development
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}