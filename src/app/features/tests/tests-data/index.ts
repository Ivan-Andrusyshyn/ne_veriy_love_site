import { TestsData } from '../models/questions.model';
import {
  testAsociaciiDescription,
  testAsociaciiQuestions,
  testAsociaciiResult,
} from './test-asociacii';
import {
  testSamoocinkyQuestions,
  testSamoocinkyResult,
  testSamoocinkyDescription,
} from './test-samoocinky';
import {
  testVnutrishniyDrugDescription,
  testVnutrishniyDrugQuestions,
  testVnutrishniyDrugResult,
} from './test-vnutrishniy-drug';

export const testsData: TestsData[] = [
  {
    testName: 'test-samoocinky',
    questions: testSamoocinkyQuestions,
    results: testSamoocinkyResult,
    description: { ...testSamoocinkyDescription },
  },
  {
    testName: 'test-vnutrishniy-drug',
    questions: testVnutrishniyDrugQuestions,
    results: testVnutrishniyDrugResult,
    description: { ...testVnutrishniyDrugDescription },
  },
  {
    testName: 'test-asociacii',
    description: testAsociaciiDescription,
    questions: testAsociaciiQuestions,
    results: testAsociaciiResult,
  },
] as const;
