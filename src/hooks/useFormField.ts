import { useReducer } from 'react'

import type { Validator } from '../utils/validator'

type ReducerState = {
  value: string
  isDirty: boolean
  error: string | null
}

type ReducerAction = { type: 'update'; payload: string } | { type: 'reset' }

type ReducerType = React.Reducer<ReducerState, ReducerAction>

const initialState: ReducerState = { value: '', isDirty: false, error: null }

const reducer =
  (validator?: Validator): ReducerType =>
  (state, action) => {
    switch (action.type) {
      case 'update':
        return {
          value: action.payload,
          isDirty: true,
          error: validator ? validator.validate(action.payload) : null,
        }
      case 'reset':
        return initialState
      default:
        return state
    }
  }

type Props = {
  validator?: Validator
}

function useFormField({ validator }: Props) {
  const [state, dispatch] = useReducer<ReducerType>(
    reducer(validator),
    initialState
  )

  return {
    ...state,
    onChange: (param: string | React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'update',
        payload: typeof param === 'string' ? param : param.target.value,
      })
    },
    reset: () => {
      dispatch({ type: 'reset' })
    },
  }
}

export { useFormField }
