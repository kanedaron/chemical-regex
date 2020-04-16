



const chemicalDecomposer = (molecule) => {

let formule = molecule

// PREPARATION : ADD ALL INDICES

//add an index for ALL elements, even single ones
const regexindex = /([A-Z]{1}[a-z]*)(?!\d|[a-z])/g
formule=formule.replace(regexindex,"$11")

// 1 : REDUCE ALL PARENTHESIS,BRACKETS AND SO ON

// repeat the parenthesis extractions until none remains
const regex2 = /\(|\[|\{/
while (regex2.test(formule)) {

// STUPID ADDITION : simple remove of non-indexed parenthesis
let STUPIDADDITION = /\((\w*)\)(?!\d)/g
formule=formule.replace(STUPIDADDITION,"$1")
// and now for brackets and {}
STUPIDADDITION = /\[(\w*)\](?!\d)/g
formule=formule.replace(STUPIDADDITION,"$1")
STUPIDADDITION = /\{(\w*)\}(?!\d)/g
formule=formule.replace(STUPIDADDITION,"$1")


// extract enclosed expressions in parenthesis(with their index)
// previous version const regexenclosed =  /\((\w*)\)(\d+)/g
const regexenclosed =  /(?:\(|\[|\{)(\w*)(?:\)|\]|\})(\d+)/g
//and pass it to remplaceur function to sub-computing
let nouvelleChaine = formule.replace(regexenclosed, remplaceur);
formule = nouvelleChaine


// FIRST remove the parenthesis AND their index
// THEN sub-computing : inside the enclosed expression extract each element(with appended parenthesis index) to sub-sub computing,
function remplaceur(correspondance, p1, p2, p3, decalage, chaine) {
  const regexsub = /([A-Z]{1}[a-z]*)(\d+)x(\d+)/g
  let nouvellecorres = correspondance.replace(/(?:\(|\[|\{)(\w*)(?:\)|\]|\})(\d+)/g,"$1")
  nouvellecorres = nouvellecorres.replace(/(\w\d+)/g,`$1x${p2}`)
  return nouvellecorres.replace(regexsub,miniremplaceur);
}

// sub-sub-computing : multiply the index of each element by the index of enclosed parenthesis
function miniremplaceur(correspondance, p1, p2, p3, decalage, chaine) {
return p1.concat(p3*p2)
}

// close WHILE loop
}


// 2 : FORMAT THE RESULT

// extract all elements in an array
const regexsplit = /(?<=\d)(?=\D)/
const amap = formule.split(regexsplit)

// parse the array into an object containing quantities of all elements
let objet = {}
const regexsplit2 = /(?<=\D)(?=\d)/
amap.map(x => {
  if (!objet[x.split(regexsplit2)[0]]) {objet[x.split(regexsplit2)[0]]=0}
  objet[x.split(regexsplit2)[0]] += parseInt(x.split(regexsplit2)[1])
         })

return objet
}


const text = "H2O[(O3H)4FeU]3"
console.log(chemicalDecomposer(text))