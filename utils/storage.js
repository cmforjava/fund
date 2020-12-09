let m
if(uni){
	m = uni
}else{
	m = {
		getStorageSync: (key)=>{
			return JSON.parse(localStorage.getItem(key))
		},
		setStorageSync: (key, data)=>{
			localStorage.setItem(key, JSON.stringify(data))
		},
		removeStorageSync: (key)=>{
			localStorage.removeItem(key);
		},
		clearStorageSync: ()=>{
			localStorage.clear();
		}
		
	}
}

const storage = {
  get: (key, nil = "") => {
	  key += ''
    let value;
    try {
      let data = m.getStorageSync(key);
	  if(data===""){
		  return nil
	  }
      if (data.outtime < Date.now()) {
        value = nil;
      } else {
        value = data.value;
      }
    } catch (e) {
      value = nil;
    }
    return value;
  },
  set: (key, value, outtime) => {
	  key += ''
    const time = new Date().getTime();
    // let despiretime = time + outtime
    const data = {
      time,
      value
    };
    if (outtime) {
      data.outtime = outtime;
    }
    m.setStorageSync(key,data);
  },
  multiset: (params, outtime) => {
    for (const item in params) {
      storage.set(item, params[item], outtime);
    }
  },
  multiget: (...params) => {
    return params.map(item => {
      return storage.get(item);
    });
  },
  remove: key => {
    m.removeStorageSync(key)
  },
  clear: () => {
    m.clearStorageSync()
  },
  multiremove: (...params) => {
    params.forEach(item => {
      storage.remove(item);
    });
  }
};
export default storage;
