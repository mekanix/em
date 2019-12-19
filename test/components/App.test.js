import test from 'ava'
import React from 'react'
import { mount } from 'enzyme'
import App from '../../src/App'

test('cvrc', t => {
  t.pass()
})

test('prc', async t => {
  const bar = Promise.resolve('prc')
  t.is(await bar, 'prc')
  mount(<App />)
  t.is(1, 2)
})
