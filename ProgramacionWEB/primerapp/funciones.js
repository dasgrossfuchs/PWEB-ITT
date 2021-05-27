module.exports = {
    "procesar" : procesar
}
function procesar(temp){
    var RFC = PrimerL(temp.pname);
    RFC += PrimerV(temp.pname);
    RFC += PrimerL(temp.mname);
    RFC += PrimerL(temp.fname);
    RFC += temp.fecha.substring(2,4);
    RFC += temp.fecha.substring(5,7);
    RFC += temp.fecha.substring(8);
    RFC = AltisonanteLooker(RFC);
    return RFC.toUpperCase();
}
function PrimerL(temp){
    if (temp == '') {return 'X';}
    temp = temp.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (temp.includes(' ')) {
        const impName = NombreComp(temp);
        temp = impName;
    }
    var excep = "/^[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]*$/";
    if(excep.indexOf(temp.charAt(0))!= -1){return 'X';}
    if(temp.charAt(0) == 'Ñ'){return 'X';}
    return temp.charAt(0);
}

function PrimerV(temp){
    if (temp == '') {return 'X';}
    temp = temp.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const vocales = 'AEIOU';
    for (let i = 1; i < temp.length; i++) {
        if (vocales.includes(temp[i])) {
            return temp[i]
        }
        return 'X';
    }
}
function NombreComp(temp){
    const names = [temp.split(' ')];
    const names2 = [temp.split(' ')];
    const excep1 = ['DA', 'DAS', 'DE', 'DEL', 'DER', 'DI', 'DIE', 'DD',
    'EL', 'LA', 'LOS', 'LAS', 'LE', 'LES', 'MAC', 'MC', 'VAN', 'VON', 'Y'];
    const excep2 = ['MARIA', 'MA.', 'MA', 'M', 'M.', 'JOSE', 'J', 'J.'];
    for (let i = 0; i < temp.split(' ').length -1; i++) {
        if (excep1.includes(names[i])) {
            const x = names2.indexOf(names[i]);
            if(x==0){names2.splice(0,1);}
            names2.splice(x-1,2);
        }
    }
    for (let i = 0; i < temp.split(' ').length -1; i++) {
        if (excep2.includes(names[i])) {
            const x = names2.indexOf(names[i]);
            names2.splice(x,1);
        }
    }
    return names[0];
}

function AltisonanteLooker(temp){
    const altisonantes = ['BACA','LOCO','BAKA','LOKA',
    'BUEI','LOKO','BUEY','MAME','CACA','MAMO','CACO',
    'MEAR','CAGA','MEAS','CAGO','MEON','CAKA','MIAR',
    'CAKO','MION','COGE','MOCO','COGI','MOKO','COJA',
    'MULA','COJE','MULO','COJI','NACA','COJO','NACO',
    'COLA','PEDA','CULO','PEDO','FALO','PENE','FETO',
    'PIPI','GETA','PITO','GUEI','POPO','GUEY','PUTA',
    'JETA','PUTO','JOTO','QULO','KACA','RATA','KACO',
    'ROBA','KAGA','ROBE','KAGO','ROBO','KAKA','RUIN',
    'KAKO','SENO','KOGE','TETA','KOGI','VACA','KOJA',
    'VAGA','KOJE','VAGO','KOJI','VAKA','KOJO','VUEI',
    'KOLA','VUEY','KULO','WUEI','LILO','WUEY','LOCA'];
    if (altisonantes.includes(temp.substring(0,4))) {
        return temp.substring(0,1)+'X'+temp.substring(2)
    }
    return temp;
}