import globals from '../globals.js'
import {
  RANKED_ROOT,
  ROOT_TOKEN,
  SCHEMA_LATEST,
  TUTORIAL_STEP_NONE,
  TUTORIAL_STEP_START,
} from '../constants.js'

// util
import { hashContext } from './hashContext.js'
import { canShowModal } from './canShowModal.js'
import { hashThought } from './hashThought.js'

export const initialState = () => {

  const state = {

    authenticated: false,
    isLoading: true,
    /* status:
      'disconnected'   Yet to connect to firebase, but not in explicit offline mode.
      'connecting'     Connecting to firebase.
      'loading'        Connected, authenticated, and waiting for user thoughtIndex.
      'loaded'         User thoughtIndex received.
      'offline'        Disconnected and working in offline mode.
    */
    status: 'disconnected',
    focus: RANKED_ROOT,
    contextViews: {},
    thoughtIndex: {
      [hashThought(ROOT_TOKEN)]: {
        value: ROOT_TOKEN,
        contexts: [],
        // set to beginning of epoch to ensure that server thoughtIndex is always considered newer from init thoughtIndex
        created: (new Date(0)).toISOString(),
        lastUpdated: (new Date(0)).toISOString(),
      }
    },
    contextBindings: {},
    // store children indexed by the encoded context for O(1) lookup of children
    contextIndex: {
      [hashContext([ROOT_TOKEN])]: []
    },
    expanded: {},
    settings: {
      dark: true,
      autologin: false,
      tutorialChoice: +(localStorage['settings-tutorialChoice'] || 0),
      tutorialStep: globals.disableTutorial ? TUTORIAL_STEP_NONE : JSON.parse(localStorage['settings-tutorialStep'] || TUTORIAL_STEP_START),
    },
    // cheap trick to re-render when thoughtIndex has been updated
    dataNonce: 0,
    modals: {},
    cursorHistory: [],
    schemaVersion: SCHEMA_LATEST
  }

  // initial modal states
  const modals = ['welcome', 'help', 'home']
  modals.forEach(value => {
    state.modals[value] = {
      complete: globals.disableTutorial || JSON.parse(localStorage['modal-complete-' + value] || 'false'),
      hideuntil: JSON.parse(localStorage['modal-hideuntil-' + value] || '0')
    }
  })

  // welcome modal
  if (canShowModal('welcome', state)) {
    state.showModal = 'welcome'
  }

  return state
}
