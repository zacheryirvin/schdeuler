import {PropTypes} from 'prop-types'

const withPropTypes = (name, propTypesSchema) => reducer => {
  if(process.env.NODE_ENV === "development") {
    return (state, action) => {
      const result = reducer(state, action)
      PropTypes.checkPropTypes(
        {state: propTypesSchema},
        {state: result},
        'property',
        name,
      )
      return result;
    }
  }
  return reducer;
}

export default withPropTypes;
