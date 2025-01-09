export const circularJSON = {
  stringify: function (obj) {
    const cache = new Set();
    const stringified = JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          return; // Remove circular references
        }
        cache.add(value);
      }
      return value;
    });
    cache.clear();
    return stringified;
  },

  convertJsonStringToObject(jsonString: string): any {
    try {
      // Convert the JSON string to an object
      const parsedObject = JSON.parse(jsonString);
      return parsedObject;
    } catch (error) {
      // Handle invalid JSON format
      throw new Error('Invalid JSON string');
    }
  },
};
