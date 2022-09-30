import '@testing-library/jest-dom';
import { mockLocalStorage } from './test/mock/mock';

Storage.prototype.getItem = (key) => JSON.stringify(mockLocalStorage);

  

