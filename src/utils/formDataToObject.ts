function formDataToObject(formData: FormData): any {
    const object: any = {};
    formData.forEach((value, key) => {
      if (object.hasOwnProperty(key)) {
        if (!Array.isArray(object[key])) {
          object[key] = [object[key]];
        }
        object[key].push(value);
      } else {
        object[key] = value;
      }
    });
    return object;
  }

export default formDataToObject;