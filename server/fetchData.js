import { Promise } from 'bluebird';

export function fetchComponentData(store, components, params) {
  const needs = components.reduce((prev, { WrappedComponent, need }) => {
    const wrapped = WrappedComponent;

    return (need || [])
      .concat((wrapped && (wrapped.need !== need) ? wrapped.need : []) || [])
      .concat(prev);
  }, []);
  
  return Promise.mapSeries(needs, need => store.dispatch(need(params, store.getState())));
}
