import sampleData from "./sampleData";
const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
export const fetchSampleData = () => {
  return delay(5000).then(() => {
    return Promise.resolve(sampleData);
  });
};
