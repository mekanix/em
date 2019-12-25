import React from 'react'
import test from 'ava'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../src/App.js'

Enzyme.configure({ adapter: new Adapter() })

test('bar', async t => {
  const bar = Promise.resolve('bar')
  t.is(await bar, 'bar')
  const wrapper = Enzyme.mount(<App />)
})
