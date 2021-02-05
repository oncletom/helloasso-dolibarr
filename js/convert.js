const NATURE = {
  MORALE: 'mor',
  PHYSIQUE: 'phy'
}

const COUNTRY = {
  FRANCE: 1
}

const STATUT = {
  ACTIVE: 1,
  INACTIVE: 0
}

export function dateTimeToYYYYMMDD (dateOrString) {
  let date = ''

  if (dateOrString instanceof Date) {
    date = dateOrString.toISOString().split('T')[0]
  }
  else {
    const [day, month, year] = dateOrString.split(/[\/ :]/)

    date = `${year}-${month}-${day}`
  }

  // when people do not fill in a date, it is set to Jan 1st 1970
  return date === '1970-01-01' ? '' : date
}

export function untilEndOfYear (date) {
  const d = new Date(date)

  d.setMonth(11)
  d.setDate(31)
  d.setUTCHours(23)
  d.setUTCMinutes(59)
  d.setUTCSeconds(59)

  return d
}

/**
 * 1. "firstname lastname"
 * 2. "FirstnameLastname"
 */
export function createLogin ({ firstname, lastname }) {
  return `${firstname} ${lastname}`
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(chunk => chunk[0].toLocaleUpperCase() + chunk.slice(1))
    .join('')
}

export function helloassoSubscriptionToDolibarrSubscription (row) {
  return {
  }
}

export function helloassoSubscriptionToDolibarrMember (row) {
  const datec = dateTimeToYYYYMMDD(row.Date)
  const datefin = untilEndOfYear(datec)
  const login = createLogin({ lastname: row.Nom, firstname: row.Prénom })

  return {
    'a.civility' /* Titre civilité */: '',
    'a.lastname' /* Nom* */: row.Nom,
    'a.firstname' /* Prénom */: row.Prénom,
    'a.gender' /* Genre */: '',
    'a.login' /* Identifiant*  */: login,
    'a.pass' /* Mot de passe */: '',
    'a.fk_adherent_type' /* Type d'adhérent*  */: 1,
    'a.morphy' /* Nature*  */: row.Société ? NATURE.MORALE : NATURE.PHYSIQUE,
    'a.societe' /* Société */: row.Société,
    'a.address' /* Adresse */: row['Adresse acheteur'],
    'a.zip' /* Code postal */: row['Code Postal acheteur'],
    'a.town' /* Ville */: row['Ville acheteur'],
    'a.state_id' /* StateId */: '',
    'a.country' /* Identifiant pays  */: COUNTRY.FRANCE,
    'a.phone' /* Téléphone  */: '',
    'a.phone_perso' /* Téléphone perso  */: '',
    'a.phone_mobile' /* Téléphone mobile  */: '',
    'a.email' /* Email  */: row['Email'],
    'a.birth' /* Birthday  */: dateTimeToYYYYMMDD(row['Date de naissance']),
    'a.statut' /* État*  */: STATUT.ACTIVE,
    'a.photo' /* Photo*  */: '',
    'a.note_public' /* Note publique *  */: '',
    'a.note_private' /* Note privée *  */: '',
    'a.datec' /* Date création  */: datec,
    'a.datefin' /* Date fin adhésion  */: dateTimeToYYYYMMDD(datefin),
  }
}
