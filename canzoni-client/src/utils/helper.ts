export const getRandomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export const splitCollectionByCount = <T>(collection: T [], step: number) => {
  const arrCount = Math.ceil(collection.length / step);

  const store: Array<Array<T>> = [];

  for (let i = 0; i < arrCount; i++) {
    if (!store[i]) {
      store.push([]);
    }

    const startStep = i * step;
    const endStep = startStep + step;
    for (let j = startStep; j < endStep && j < collection.length; j++) {
      store[i].push(collection[j]);
    }
  }

  return store;
};

type dateTimeType = 'sec' | 'min' | 'hours' | 'days'
const msInSecond = 1000;
const secInMinute = 60;
const secInHour = 3600;
const secInDay = 86400;
export const getDateTimeDifference = (dateStart: Date, dateEnd: Date, valueType: dateTimeType) => {
  // @ts-ignore
  const secDiff = (dateEnd - dateStart) / msInSecond;
  switch (valueType) {
    case 'sec':
      return secDiff;
    case 'hours':
      return secDiff / secInHour;
    case 'min':
      return secDiff / secInMinute;
    case 'days':
      return secDiff / secInDay;
  }
};

export const getRandomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
