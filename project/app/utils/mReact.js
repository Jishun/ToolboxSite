export const LOADING = 'LOADING'
export const LOADED = 'LOADED'

export function linkValue(instance, propertyKey, callback){
    return {
        value: instance[propertyKey],
        requestChange: handleChange.bind(this, instance, propertyKey, callback)
    }
}

export class ActionHelper{

  constructor(locateWithIndex){
    this.locateWithIndex = locateWithIndex;
  }

  setProperty(target, key, value){
    let v = {};
    v[key] = value;
    return Object.assign({}, target, v);
  }

  setPropertyInArray(array, target, targetIndex, key, value, locator){
    return array.map((item,i) => this.locate(item, i, target, targetIndex, locator) ? this.select(item, key, value) : item);
  }

  edit(target){
    return Object.assign({}, target, {_editing: true, _original: target});
  }

  editInArray(array, target, targetIndex, locator){
    return array.map((item,i) => this.locate(item, i, target, targetIndex, locator) ? this.edit(item) : item);
  }

  save(target){
    return Object.assign({}, target, {_editing: false, _original: null});
  }

  saveInArray(array, target, targetIndex, locator){
    return array.map((item, i) => this.locate(item, i, target, targetIndex, locator) ? this.save(item) : item);
  }

  cancelEdit(target){
    return Object.assign({}, target._original, {_editing: false});
  }

  cancelEditInArray(array, target, targetIndex, locator){
    return array.map((item, i) => this.locate(item, i, target, targetIndex, locator) ? this.cancelEdit(item) : item)
  }

  cancelAddInArray(array, target, targetIndex, locator){
    return array.filter((item,i) => !this.locate(item, i, target, targetIndex, locator))
  }

  cancelSaveInArray(array, target, targetIndex, locator){
    return target._original ? this.cancelEditInArray(array, target, targetIndex, locator) :  this.cancelAddInArray(array, target, targetIndex, locator) ;
  }

  addToArray(array, item){
    return [...array, {_editing: true}];
  }

  insertToArray(array, item){
    return [{_editing: true}, ...array];
  }

  deleteFromArray(array, target, targetIndex, locator){
    return array.filter((item, i) => !this.locate(item, i, target, targetIndex, locator))
  }

  toggleExpand(item){
    return Object.assign({}, item, {_expanded: !item._expanded});
  }

  toggleExpandInArray(array, target, targetIndex, locator){
    return array.map((item, i) => this.locate(item, i, target, targetIndex, locator) ? this.toggleExpand(item) : item)
  }

  locate(item, index, target, targetIndex, locator){
    if (locator) {
      return locator(item, index, target, targetIndex);
    }
    return this.locateWithIndex ?  index === targetIndex : item === target;
  }
}

function handleChange(instance, propertyKey, callback, value) {
    instance[propertyKey] = value;
    if (callback) {
        callback();
    }
}

function handleResponse(promise, dispatch, action){
  dispatch({type: LOADING});
  return promise.then(response => response.json())
  .then(json => {
    dispatch({type: LOADED, payload:json.base });
    return json.data;
  })
  .then(data => dispatch({type: action, payload:data }))
  .catch(function (error) {
    console.log('Request failed', error);
  })
}
