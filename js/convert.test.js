import {expect, jest} from '@jest/globals'
import { dateTimeToYYYYMMDD, untilEndOfYear, createLogin } from './convert.js'


test('dateTimeToYYYYMMDD()', () => {
  expect(dateTimeToYYYYMMDD('01/02/2021 22:18:00')).toEqual('2021-02-01')
  expect(dateTimeToYYYYMMDD('01/01/1970 22:18:00')).toEqual('')
  expect(dateTimeToYYYYMMDD(new Date('2021-02-01'))).toEqual('2021-02-01')
})

test('untilEndOfYear()', () => {
  expect(untilEndOfYear('2021-02-01')).toEqual(new Date('2021-12-31T23:59:59Z'))
  expect(untilEndOfYear(new Date('2021-02-01'))).toEqual(new Date('2021-12-31T23:59:59Z'))
})

test('createLogin()', () => {
  expect(createLogin({ firstname: 'thomas', lastname: 'parisot' })).toEqual('ThomasParisot')
  expect(createLogin({ firstname: 'gérard', lastname: 'le bel' })).toEqual('GérardLeBel')
  expect(createLogin({ firstname: 'DIMITRY', lastname: 'CAMILLE' })).toEqual('DimitryCamille')
})
